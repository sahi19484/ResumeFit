import { RequestHandler } from "express";
import fetch from "node-fetch";
import { load } from "cheerio";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const DEFAULT_HEADERS = {
  "User-Agent": USER_AGENT,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Referer: "https://www.linkedin.com/",
};

// Client-side extraction script that users can run in their browser console
const CLIENT_EXTRACTION_SCRIPT = `
(function() {
  console.log('📥 LinkedIn Profile Extractor');
  console.log('Extracting your profile data...');

  try {
    const name = document.querySelector('h1')?.textContent?.trim() || '';
    const headline = document.querySelector('.text-body-medium, h2, [data-test-id="top-card-headline"]')?.textContent?.trim() || '';
    const location = document.querySelector('[data-test-id="top-card-link"], .pv-top-card--list-bullet, [class*="location"]')?.textContent?.trim() || '';

    const experiences = [];
    document.querySelectorAll('[id*="experience"] li, [class*="experience"] li, .pvs-list li').forEach((el, i) => {
      if (i >= 10) return;
      const title = el.querySelector('h3, h4, span[class*="title"]')?.textContent?.trim() || '';
      const company = el.querySelector('[class*="subtitle"], p, [class*="company"]')?.textContent?.trim() || '';
      const date = el.querySelector('[class*="date"]')?.textContent?.trim() || '';
      if (title || company) {
        experiences.push({ title, company, date, description: '' });
      }
    });

    const education = [];
    document.querySelectorAll('[id*="education"] li, [class*="education"] li').forEach((el, i) => {
      if (i >= 5) return;
      const school = el.querySelector('h3, span[class*="school"]')?.textContent?.trim() || '';
      const degree = el.querySelector('p')?.textContent?.trim() || '';
      if (school) {
        education.push({ school, degree });
      }
    });

    const skills = [];
    document.querySelectorAll('[class*="skill"], [data-test-id*="skill"], .pv-skill').forEach((el, i) => {
      if (i >= 20) return;
      const skill = el.textContent?.trim() || '';
      if (skill && skill.length > 1 && skill.length < 100) {
        skills.push(skill);
      }
    });

    const textContent = document.body.textContent?.replace(/\\s+/g, ' ').trim() || '';

    const result = {
      name: name || 'Professional',
      headline: headline || 'Professional Profile',
      location,
      experiences,
      education,
      skills: [...new Set(skills)],
      textSnippet: textContent.slice(0, 2500),
    };

    const json = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      console.log('✅ Profile data copied to clipboard!');
      console.log('📋 Raw data:', result);
      console.log('Now paste the JSON into the form at: ResumeFit Generator');
    }).catch(() => {
      console.log('❌ Copy failed, here is your data:');
      console.log(json);
    });
  } catch (err) {
    console.error('❌ Error extracting profile:', err);
  }
})();
`;

function normalizeLinkedInUrl(url: string) {
  return url.replace(/^https?:\/\//i, "");
}

function isLikelyProfileHtml(html: string) {
  return /linkedin\.com|LinkedIn|profile/i.test(html);
}

function parseProfileFromHtml(html: string) {
  const $ = load(html);

  const name =
    $("h1").first().text().trim() ||
    $("title").text().split("|")[0]?.trim() ||
    "";
  const headline =
    $("p.profile-headline, .text-body-medium, [data-test-id=\"top-card-headline\"]")
      .first()
      .text()
      .trim() ||
    $('meta[name="description"]').attr("content")?.split("—")[0]?.trim() ||
    "";
  const location =
    $(".pv-top-card--list-bullet, .text-body-small, [data-test-id=\"top-card-link\"]")
      .first()
      .text()
      .trim() ||
    "";

  const experiences: Array<any> = [];
  $("section[id*='experience'] li, #experience-section li, [class*='experience'] li").each(
    (_i, el) => {
      const title =
        $(el).find("h3").first().text().trim() ||
        $(el).find("h4").first().text().trim();
      const company =
        $(el)
          .find("p.pv-entity__secondary-title, span.pv-entity__secondary-title")
          .first()
          .text()
          .trim() ||
        $(el).find("[class*='company']").first().text().trim();
      const date =
        $(el)
          .find("h4.pv-entity__date-range span:nth-child(2), span.date-range")
          .first()
          .text()
          .trim() ||
        "";
      const desc = $(el).find("p").text().trim();
      if (title || company) {
        experiences.push({ title, company, date, description: desc });
      }
    },
  );

  const education: Array<any> = [];
  $("section[id*='education'] li, #education-section li").each((_i, el) => {
    const school =
      $(el).find("h3").first().text().trim() ||
      $(el).find("span").first().text().trim();
    const degree = $(el).find("p").first().text().trim();
    if (school) education.push({ school, degree });
  });

  const skills: string[] = [];
  $(".pv-skill-category-entity__name-text, .skill-pill, [class*='skill']").each(
    (_i, el) => {
      const s = $(el).text().trim();
      if (s) skills.push(s);
    },
  );

  const textContent = $("body").text().replace(/\s+/g, " ").trim();

  return {
    name: name || "Professional",
    headline: headline || "Professional Profile",
    location,
    experiences,
    education,
    skills: [...new Set(skills)],
    textSnippet: textContent.slice(0, 2500),
  };
}

async function fetchHtmlWithFallback(url: string) {
  try {
    const directResponse = await fetch(url, {
      headers: DEFAULT_HEADERS,
    });

    if (directResponse.ok) {
      const html = await directResponse.text();
      if (isLikelyProfileHtml(html)) {
        return { kind: "html" as const, body: html };
      }
    }
  } catch (err) {
    console.log("Direct LinkedIn fetch failed, trying proxy fallback:", err);
  }

  const proxyUrl = `https://r.jina.ai/http://${normalizeLinkedInUrl(url)}`;
  const proxyResponse = await fetch(proxyUrl, {
    headers: DEFAULT_HEADERS,
  });

  if (!proxyResponse.ok) {
    return null;
  }

  const proxyText = await proxyResponse.text();
  return { kind: "markdown" as const, body: proxyText };
}

export const handleExtract: RequestHandler = async (req, res) => {
  try {
    const { url } = req.method === "GET" ? req.query : req.body;
    console.log("🌐 Extract request received for URL:", url);

    if (!url || typeof url !== "string") {
      console.log("❌ Invalid URL parameter");
      return res.status(400).json({ error: "Missing url parameter" });
    }

    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes("linkedin.com")) {
        console.log("❌ Not a LinkedIn URL");
        return res.status(400).json({ error: "Only linkedin.com URLs are supported" });
      }
    } catch (e) {
      console.log("❌ Invalid URL format");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const fetched = await fetchHtmlWithFallback(url);

    if (!fetched) {
      return res.status(200).json({
        auth_required: true,
        message: "LinkedIn requires manual extraction. Use one of the methods below:",
        extraction_script: CLIENT_EXTRACTION_SCRIPT,
        instructions: {
          method_1: {
            title: "Browser Console (Fastest - 2 minutes)",
            steps: [
              "1. Open your LinkedIn profile in your browser",
              "2. Press F12 (or Cmd+Option+I on Mac) to open Developer Console",
              "3. Go to the Console tab",
              "4. Copy and paste the provided script",
              "5. Press Enter to run",
              "6. Your profile data will copy to clipboard automatically",
              "7. Paste the JSON data into the form",
            ],
          },
          method_2: {
            title: "Manual Form Entry (Safest - 5 minutes)",
            steps: [
              "1. Copy the following from your LinkedIn profile:",
              "   - Name (your profile heading)",
              "   - Headline (professional summary under your name)",
              "   - Skills (from skills section)",
              "   - Experience (job titles, companies, dates)",
              "   - Education (school names, degrees)",
              "2. Paste into the form below",
            ],
          },
        },
      });
    }

    let profile;

    if (fetched.kind === "html") {
      profile = parseProfileFromHtml(fetched.body);
    } else {
      const markdown = fetched.body;
      const titleMatch =
        markdown.match(/^#\s+(.+?)\s+\|\s*LinkedIn\s*$/m) ||
        markdown.match(/^Title:\s*(.+?)\s*$/m);
      const title = titleMatch?.[1]?.trim() || "Professional";
      const cleanedTitle = title.replace(/\s+-\s+.*$/, "").trim();
      const textSnippet = markdown.replace(/\s+/g, " ").slice(0, 2500);

      profile = {
        name: cleanedTitle || "Professional",
        headline: cleanedTitle || "Professional Profile",
        location: "",
        experiences: [],
        education: [],
        skills: [],
        textSnippet,
      };
    }

    if (!profile?.name && !profile?.headline && !profile?.textSnippet) {
      return res.status(200).json({
        auth_required: true,
        message: "LinkedIn requires manual extraction. Use one of the methods below:",
        extraction_script: CLIENT_EXTRACTION_SCRIPT,
        instructions: {
          method_1: {
            title: "Browser Console (Fastest - 2 minutes)",
            steps: [
              "1. Open your LinkedIn profile in your browser",
              "2. Press F12 (or Cmd+Option+I on Mac) to open Developer Console",
              "3. Go to the Console tab",
              "4. Copy and paste the provided script",
              "5. Press Enter to run",
              "6. Your profile data will copy to clipboard automatically",
              "7. Paste the JSON data into the form",
            ],
          },
          method_2: {
            title: "Manual Form Entry (Safest - 5 minutes)",
            steps: [
              "1. Copy the following from your LinkedIn profile:",
              "   - Name (your profile heading)",
              "   - Headline (professional summary under your name)",
              "   - Skills (from skills section)",
              "   - Experience (job titles, companies, dates)",
              "   - Education (school names, degrees)",
              "2. Paste into the form below",
            ],
          },
        },
      });
    }

    return res.status(200).json(profile);
  } catch (err) {
    console.error("❌ Extract error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
