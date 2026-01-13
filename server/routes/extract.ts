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
    console.log("🌐 Extract request received for URL:", url);
    
    if (!url || typeof url !== "string") {
      console.log("❌ Invalid URL parameter");
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Only allow linkedin domain for safety
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

    // LinkedIn blocks automated access, always return auth_required response
    console.log("📋 Returning auth_required response");
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
  } catch (err) {
    console.error("❌ Extract error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
