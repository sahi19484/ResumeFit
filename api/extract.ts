import fetch from "node-fetch";
import { load } from "cheerio";

export default async function handler(req: any, res: any) {
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

    // Enhanced fetch with better headers and retry logic
    let response;
    let retries = 3;
    
    while (retries > 0) {
      try {
        response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Referer": "https://www.linkedin.com/",
          },
        });

        if (response.ok) {
          break;
        }
        
        retries--;
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (err) {
        retries--;
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          throw err;
        }
      }
    }

    if (!response || !response.ok) {
      return res.status(502).json({ error: "Failed to fetch LinkedIn profile. Please ensure the profile is public." });
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

    if (experiences.length === 0) {
      $("li").each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 50 && /\d{4}/.test(text)) {
          experiences.push({ title: text.slice(0, 80), company: "", date: "", description: text });
        }
      });
    }

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

    return res.status(200).json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("extract error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
