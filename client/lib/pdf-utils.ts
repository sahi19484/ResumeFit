import html2pdf from "html2pdf.js";
import { ResumeData } from "./resume-utils";

export const generatePDFFromResume = (resumeData: ResumeData, filename = "resume.pdf") => {
  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        .resume-container {
          max-width: 8.5in;
          height: 11in;
          margin: 0 auto;
          background: white;
          padding: 0.5in;
        }
        h1 {
          margin: 0 0 5px 0;
          font-size: 24px;
          text-align: center;
        }
        .header-info {
          text-align: center;
          font-size: 12px;
          margin-bottom: 15px;
          color: #666;
        }
        .header-info span {
          margin: 0 8px;
        }
        h2 {
          font-size: 14px;
          font-weight: bold;
          margin: 12px 0 6px 0;
          padding-bottom: 4px;
          border-bottom: 2px solid #333;
        }
        .section-content {
          margin-bottom: 10px;
          font-size: 11px;
        }
        .experience-item {
          margin-bottom: 8px;
        }
        .job-title {
          font-weight: bold;
          display: inline;
        }
        .company {
          font-weight: bold;
          display: inline;
          margin-left: 5px;
        }
        .date {
          float: right;
          font-size: 11px;
          color: #666;
        }
        .location {
          font-size: 11px;
          color: #666;
        }
        .description {
          font-size: 11px;
          margin-top: 4px;
          line-height: 1.4;
        }
        .education-item {
          margin-bottom: 8px;
        }
        .school {
          font-weight: bold;
        }
        .degree {
          font-size: 11px;
          color: #666;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 11px;
        }
        .skill-tag {
          background: #f0f0f0;
          padding: 3px 8px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        <h1>${resumeData.personal.full_name || "Your Name"}</h1>
        <div class="header-info">
          ${resumeData.personal.email ? `<span>${resumeData.personal.email}</span>` : ""}
          ${resumeData.personal.phone ? `<span>•</span><span>${resumeData.personal.phone}</span>` : ""}
          ${resumeData.personal.location ? `<span>•</span><span>${resumeData.personal.location}</span>` : ""}
          ${resumeData.personal.linkedin_url ? `<span>•</span><span>LinkedIn: ${resumeData.personal.linkedin_url}</span>` : ""}
        </div>

        ${
          resumeData.professional_summary
            ? `
          <h2>Professional Summary</h2>
          <div class="section-content">
            ${resumeData.professional_summary}
          </div>
        `
            : ""
        }

        ${
          resumeData.experience && resumeData.experience.length > 0
            ? `
          <h2>Experience</h2>
          <div class="section-content">
            ${resumeData.experience
              .map(
                (exp) => `
              <div class="experience-item">
                <span class="job-title">${exp.job_title || ""}</span>
                ${exp.company ? `<span class="company">${exp.company}</span>` : ""}
                <div class="date">${exp.start_date || ""} ${exp.end_date ? `- ${exp.end_date}` : exp.current ? "- Present" : ""}</div>
                ${exp.location ? `<div class="location">${exp.location}</div>` : ""}
                ${exp.description ? `<div class="description">${exp.description}</div>` : ""}
                ${
                  exp.achievements && exp.achievements.length > 0
                    ? `<div class="description">• ${exp.achievements.filter((a) => a).join("<br>• ")}</div>`
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          resumeData.education && resumeData.education.length > 0
            ? `
          <h2>Education</h2>
          <div class="section-content">
            ${resumeData.education
              .map(
                (edu) => `
              <div class="education-item">
                <div class="school">${edu.school || ""}</div>
                ${edu.degree ? `<div class="degree">${edu.degree}</div>` : ""}
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          resumeData.skills && resumeData.skills.length > 0
            ? `
          <h2>Skills</h2>
          <div class="skills-list">
            ${resumeData.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
          </div>
        `
            : ""
        }
      </div>
    </body>
    </html>
  `;

  // PDF options
  const options = {
    margin: 0,
    filename: filename,
    image: { type: "png" as const, quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in" as const, format: "letter", orientation: "portrait" as const },
  };

  // Generate PDF
  html2pdf().set(options).from(htmlContent).save();
};

export const generateDOCXFromResume = (resumeData: ResumeData, filename = "resume.docx") => {
  // Create DOCX XML content
  const docxContent = createDocxContent(resumeData);
  
  // Create blob and download
  const blob = new Blob([docxContent], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const createDocxContent = (resumeData: ResumeData): string => {
  // Basic DOCX structure (simplified)
  const content = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:jc w:val="center"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="48"/></w:rPr>
        <w:t>${escapeXml(resumeData.personal.full_name || "Your Name")}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:t>${escapeXml([resumeData.personal.email, resumeData.personal.phone, resumeData.personal.location].filter(Boolean).join(" • "))}</w:t>
      </w:r>
    </w:p>
    ${
      resumeData.professional_summary
        ? `
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>Professional Summary</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>${escapeXml(resumeData.professional_summary)}</w:t></w:r>
    </w:p>
    `
        : ""
    }
  </w:body>
</w:document>`;

  return content;
};

const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};
