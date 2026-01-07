import { RequestHandler } from "express";
import fetch from "node-fetch";
import { load } from "cheerio";
import puppeteer from "puppeteer";

export const handleExtract: RequestHandler = async (req, res) => {
  let browser = null;
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

    let profileData = null;

    // Try method 1: Puppeteer (handles JavaScript-rendered content)
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      });

      const page = await browser.newPage();
      
      // Set realistic headers to avoid detection
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );
      
      // Set viewport
      await page.setViewport({ width: 1280, height: 720 });

      // Navigate with timeout
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

      // Wait for key profile elements to load
      try {
        await page.waitForSelector("h1", { timeout: 5000 }).catch(() => {});
      } catch (e) {
        // Continue anyway if selector doesn't appear
      }

      // Extract data using Puppeteer evaluate
      profileData = await page.evaluate(() => {
        const getTextContent = (selector: string) => {
          const el = document.querySelector(selector);
          return el?.textContent?.trim() || "";
        };

        const getTextContents = (selector: string) => {
          return Array.from(document.querySelectorAll(selector))
            .map((el) => el.textContent?.trim() || "")
            .filter((text) => text.length > 0);
        };

        // Extract name
        const name = getTextContent("h1") || 
                    getTextContent('[data-test-id="top-card-profile-name"]') ||
                    getTextContent('[class*="headline"]') ||
                    "";

        // Extract headline
        const headline = getTextContent(
          '[data-test-id="top-card-headline"], .text-body-medium, h3'
        ) || getTextContent('meta[name="description"]')?.split("—")[0] || "";

        // Extract location
        const location = getTextContent(
          '[data-test-id="top-card-link"], .pv-top-card--list-bullet, [class*="location"]'
        ) || "";

        // Extract experiences
        const experiences = Array.from(
          document.querySelectorAll('[id*="experience"] li, [class*="experience"] li, .pvs-list li')
        )
          .slice(0, 10)
          .map((el) => {
            const titleEl = el.querySelector("h3, h4, span[class*='title']");
            const companyEl = el.querySelector('[class*="subtitle"], p');
            const dateEl = el.querySelector('[class*="date"]');

            return {
              title: titleEl?.textContent?.trim() || "",
              company: companyEl?.textContent?.trim() || "",
              date: dateEl?.textContent?.trim() || "",
              description: Array.from(el.querySelectorAll("p"))
                .map((p) => p.textContent?.trim())
                .filter((t) => t && t.length > 20)
                .join(" ") || "",
            };
          })
          .filter((exp) => exp.title || exp.company);

        // Extract education
        const education = Array.from(
          document.querySelectorAll('[id*="education"] li, [class*="education"] li')
        )
          .slice(0, 5)
          .map((el) => {
            const schoolEl = el.querySelector("h3, span[class*='school']");
            const degreeEl = el.querySelector("p");

            return {
              school: schoolEl?.textContent?.trim() || "",
              degree: degreeEl?.textContent?.trim() || "",
            };
          })
          .filter((edu) => edu.school);

        // Extract skills
        const skills = Array.from(
          document.querySelectorAll(
            '[class*="skill"], [data-test-id*="skill"], .pv-skill'
          )
        )
          .slice(0, 20)
          .map((el) => el.textContent?.trim() || "")
          .filter((s) => s && s.length > 1 && s.length < 100);

        // Get page text for fallback
        const textContent = document.body.textContent?.replace(/\s+/g, " ").trim() || "";

        return {
          name,
          headline,
          location,
          experiences,
          education,
          skills: [...new Set(skills)], // Remove duplicates
          textSnippet: textContent.slice(0, 2500),
        };
      });

      await browser.close();
      browser = null;

      // Return the extracted data
      return res.json(profileData);
    } catch (puppeteerError) {
      console.error("Puppeteer extraction failed:", puppeteerError);
      // Fall through to method 2
    }

    // Method 2: Fallback to fetch + cheerio
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      });

      if (!response.ok) {
        return res.status(502).json({ error: "Failed to fetch LinkedIn profile" });
      }

      const html = await response.text();
      const $ = load(html);

      let name =
        $("h1").first().text().trim() || $("title").text().split("|")[0]?.trim() || "";
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

      return res.json(result);
    } catch (fallbackError) {
      console.error("Fallback extraction failed:", fallbackError);
      return res.status(500).json({
        error: "Unable to extract profile. Please try again or fill in your information manually.",
      });
    }
  } catch (err) {
    console.error("extract error", err);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // Ensure browser is closed
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error("Error closing browser:", e);
      }
    }
  }
};
