import { RequestHandler } from "express";
import fetch from "node-fetch";
import { load } from "cheerio";

// Client-side extraction script that users can run in their browser console
const CLIENT_EXTRACTION_SCRIPT = `
(function() {
  console.log('📥 LinkedIn Profile Extractor');
  console.log('Extracting your profile data...');
  
  try {
    // Extract name
    const name = document.querySelector('h1')?.textContent?.trim() || '';
    
    // Extract headline
    const headline = document.querySelector('.text-body-medium, h2, [data-test-id="top-card-headline"]')?.textContent?.trim() || '';
    
    // Extract location
    const location = document.querySelector('[data-test-id="top-card-link"], .pv-top-card--list-bullet, [class*="location"]')?.textContent?.trim() || '';
    
    // Extract experiences
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
    
    // Extract education
    const education = [];
    document.querySelectorAll('[id*="education"] li, [class*="education"] li').forEach((el, i) => {
      if (i >= 5) return;
      const school = el.querySelector('h3, span[class*="school"]')?.textContent?.trim() || '';
      const degree = el.querySelector('p')?.textContent?.trim() || '';
      if (school) {
        education.push({ school, degree });
      }
    });
    
    // Extract skills
    const skills = [];
    document.querySelectorAll('[class*="skill"], [data-test-id*="skill"], .pv-skill').forEach((el, i) => {
      if (i >= 20) return;
      const skill = el.textContent?.trim() || '';
      if (skill && skill.length > 1 && skill.length < 100) {
        skills.push(skill);
      }
    });
    
    // Extract page text
    const textContent = document.body.textContent?.replace(/\\s+/g, ' ').trim() || '';
    
    // Create result object
    const result = {
      name: name || 'Professional',
      headline: headline || 'Professional Profile',
      location,
      experiences,
      education,
      skills: [...new Set(skills)],
      textSnippet: textContent.slice(0, 2500)
    };
    
    // Copy to clipboard as JSON
    const json = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      console.log('✅ Profile data copied to clipboard!');
      console.log('📋 Raw data:', result);
      console.log('Now paste the JSON into the form at: ResumeFit Generator');
    }).catch(err => {
      console.log('❌ Copy failed, here is your data:');
      console.log(json);
    });
    
  } catch (err) {
    console.error('❌ Error extracting profile:', err);
  }
})();
`;

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

    // Try fetch + cheerio (works ~5% of the time on public profiles)
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
        timeout: 10000,
      } as any);

      if (response.ok) {
        const html = await response.text();
        const $ = load(html);

        // Check if we actually got profile data (not auth wall)
        const name = $("h1").first().text().trim() || $("title").text().split("|")[0]?.trim() || "";
        
        // If we got a name and it's not "LinkedIn" or similar, return the data
        if (name && name.length > 2 && !name.toLowerCase().includes("linkedin")) {
          const headline = $("p.profile-headline, .text-body-medium").first().text().trim() || "";
          const location = $(".pv-top-card--list-bullet, .text-body-small").first().text().trim() || "";

          const experiences: Array<any> = [];
          $("section[id*='experience'] li, #experience-section li").each((i, el) => {
            if (i >= 5) return;
            const title = $(el).find("h3").first().text().trim() || $(el).find("h4").first().text().trim();
            const company = $(el).find("p.pv-entity__secondary-title").first().text().trim() || $(el).find("span.pv-entity__secondary-title").first().text().trim();
            const date = $(el).find("h4.pv-entity__date-range span:nth-child(2)").text().trim() || $(el).find("span.date-range").text().trim();
            if (title || company) {
              experiences.push({ title, company, date, description: "" });
            }
          });

          const education: Array<any> = [];
          $("section[id*='education'] li, #education-section li").each((i, el) => {
            if (i >= 3) return;
            const school = $(el).find("h3").first().text().trim() || $(el).find("span").first().text().trim();
            const degree = $(el).find("p").first().text().trim();
            if (school) education.push({ school, degree });
          });

          const skills: string[] = [];
          $(".pv-skill-category-entity__name-text, .skill-pill").each((i, el) => {
            if (i >= 20) return;
            const s = $(el).text().trim();
            if (s) skills.push(s);
          });

          const textContent = $("body").text().replace(/\s+/g, " ").trim();

          return res.json({
            name,
            headline,
            location,
            experiences,
            education,
            skills: [...new Set(skills)],
            textSnippet: textContent.slice(0, 2500),
          });
        }
      }
    } catch (fetchErr) {
      console.warn("Fetch extraction attempt failed:", fetchErr?.message || fetchErr);
    }

    // If we get here, LinkedIn blocked automated access
    // Return helpful response with extraction script
    return res.status(403).json({
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
  } catch (err) {
    console.error("extract error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
