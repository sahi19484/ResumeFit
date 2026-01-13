import { RequestHandler } from "express";
import fetch from "node-fetch";
import { load } from "cheerio";

// Lazily import puppeteer only when needed to avoid slowing server startup
let sharedBrowser: any = null;

export const handleExtract: RequestHandler = async (req, res) => {
  try {
    const { url } = req.method === "GET" ? req.query : req.body;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Only allow linkedin domain for safety
    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes("linkedin.com")) {
        return res.status(400).json({ error: "Only linkedin.com URLs are supported" });
      }
    } catch (e) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // First attempt: fast fetch + cheerio (handles static pages quickly)
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Referer": "https://www.linkedin.com/",
        },
        timeout: 15000,
      } as any);

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const html = await response.text();
      const $ = load(html);

      let name = $("h1").first().text().trim() || $("title").text().split("|")[0]?.trim() || "";
      let headline = $("p.profile-headline, .text-body-medium").first().text().trim() || "";
      if (!headline) {
        const metaDesc = $('meta[name="description"]').attr("content");
        if (metaDesc) headline = metaDesc.split("—")[0].trim();
      }

      const location = $(".pv-top-card--list-bullet, .text-body-small").first().text().trim() || "";

      const experiences: Array<any> = [];
      $("section[id*='experience'] li, #experience-section li").each((i, el) => {
        const title = $(el).find("h3").first().text().trim() || $(el).find("h4").first().text().trim();
        const company = $(el).find("p.pv-entity__secondary-title").first().text().trim() || $(el).find("span.pv-entity__secondary-title").first().text().trim();
        const date = $(el).find("h4.pv-entity__date-range span:nth-child(2)").text().trim() || $(el).find("span.date-range").text().trim();
        const desc = $(el).find("p").text().trim();
        if (title || company) {
          experiences.push({ title, company, date, description: desc });
        }
      });

      const education: Array<any> = [];
      $("section[id*='education'] li, #education-section li").each((i, el) => {
        const school = $(el).find("h3").first().text().trim() || $(el).find("span").first().text().trim();
        const degree = $(el).find("p").first().text().trim();
        if (school) education.push({ school, degree });
      });

      const skills: string[] = [];
      $(".pv-skill-category-entity__name-text, .skill-pill").each((i, el) => {
        const s = $(el).text().trim();
        if (s) skills.push(s);
      });

      const textContent = $("body").text().replace(/\s+/g, " ").trim();

      const result = {
        name: name || "Professional",
        headline: headline || "Professional Profile",
        location,
        experiences,
        education,
        skills,
        textSnippet: textContent.slice(0, 2500),
      };

      // If the fetch-based extraction produced decent content, return it quickly
      if (result.name !== "Professional" || result.experiences.length || result.skills.length) {
        return res.json(result);
      }

      // Otherwise, fall through to a headless browser extraction for JS-rendered profiles
    } catch (fetchErr) {
      console.warn("Fast fetch extraction failed or returned minimal content:", fetchErr?.message || fetchErr);
      // continue to puppeteer option
    }

    // If we reach here, attempt Puppeteer-based extraction (slower but handles JS)
    try {
      const puppeteerModule = await import("puppeteer");
      const puppeteer = (puppeteerModule && (puppeteerModule.default || puppeteerModule)) as any;

      // Reuse a shared browser instance to avoid repeated cold starts
      if (!sharedBrowser) {
        sharedBrowser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        });
      }

      const page = await sharedBrowser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );
      await page.setViewport({ width: 1280, height: 800 });

      // Use a slightly shorter timeout to fail fast
      await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 }).catch(() => {});
      await page.waitForSelector("h1", { timeout: 4000 }).catch(() => {});

      const profileData = await page.evaluate(() => {
        const getTextContent = (selector: string) => {
          const el = document.querySelector(selector);
          return el?.textContent?.trim() || "";
        };

        // Extract name
        const name = getTextContent("h1") || getTextContent('[data-test-id="top-card-profile-name"]') || "";
        const headline = getTextContent('[data-test-id="top-card-headline"], .text-body-medium, h3') || getTextContent('meta[name="description"]')?.split("—")[0] || "";
        const location = getTextContent('[data-test-id="top-card-link"], .pv-top-card--list-bullet, [class*="location"]') || "";

        const experiences = Array.from(document.querySelectorAll('[id*="experience"] li, [class*="experience"] li, .pvs-list li'))
          .slice(0, 10)
          .map((el) => {
            const titleEl = el.querySelector("h3, h4, span[class*='title']");
            const companyEl = el.querySelector('[class*="subtitle"], p');
            const dateEl = el.querySelector('[class*="date"]');

            return {
              title: titleEl?.textContent?.trim() || "",
              company: companyEl?.textContent?.trim() || "",
              date: dateEl?.textContent?.trim() || "",
              description: Array.from(el.querySelectorAll("p")).map((p) => p.textContent?.trim()).filter(Boolean).join(" ") || "",
            };
          })
          .filter((exp) => exp.title || exp.company);

        const education = Array.from(document.querySelectorAll('[id*="education"] li, [class*="education"] li'))
          .slice(0, 5)
          .map((el) => {
            const schoolEl = el.querySelector("h3, span[class*='school']");
            const degreeEl = el.querySelector("p");
            return { school: schoolEl?.textContent?.trim() || "", degree: degreeEl?.textContent?.trim() || "" };
          })
          .filter((edu) => edu.school);

        const skills = Array.from(document.querySelectorAll('[class*="skill"], [data-test-id*="skill"], .pv-skill'))
          .slice(0, 20)
          .map((el) => el.textContent?.trim() || "")
          .filter((s) => s && s.length > 1 && s.length < 100);

        const textContent = document.body.textContent?.replace(/\s+/g, " ").trim() || "";

        return { name, headline, location, experiences, education, skills: [...new Set(skills)], textSnippet: textContent.slice(0, 2500) };
      });

      // Close the page but keep browser running for reuse
      try {
        await page.close();
      } catch {}

      return res.json(profileData);
    } catch (puppeteerErr) {
      console.error("Puppeteer extraction failed:", puppeteerErr);
      return res.status(500).json({ error: "Unable to extract profile. Please try again or fill in your information manually." });
    }
  } catch (err) {
    console.error("extract error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
