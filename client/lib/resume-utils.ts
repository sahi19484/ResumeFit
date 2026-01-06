// Resume data structures and AI suggestions

export interface ResumeData {
  personal: PersonalInfo;
  professional_summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications?: string[];
}

export interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url?: string;
  website?: string;
}

export interface Experience {
  id: string;
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field_of_study: string;
  graduation_date: string;
  gpa?: string;
  details?: string;
}

// AI-powered suggestions based on job titles
export const JOB_TITLE_SUGGESTIONS: Record<
  string,
  {
    professional_summary: string;
    skills: string[];
    experience_bullets: string[];
  }
> = {
  "Software Engineer": {
    professional_summary:
      "Results-driven Software Engineer with X+ years of experience building scalable applications and solving complex technical challenges. Proficient in modern web technologies and cloud infrastructure with a track record of delivering high-impact projects.",
    skills: [
      "Full-Stack Development",
      "JavaScript/TypeScript",
      "React",
      "Node.js",
      "Python",
      "AWS/Cloud Computing",
      "REST APIs",
      "Database Design",
      "Git Version Control",
      "Agile Development",
      "Problem-Solving",
      "Code Review",
    ],
    experience_bullets: [
      "Designed and implemented microservices architecture reducing latency by 40%",
      "Led development of customer-facing features serving 100K+ daily active users",
      "Mentored junior developers and conducted code reviews to maintain code quality",
      "Optimized database queries resulting in 50% performance improvement",
      "Collaborated with product and design teams to deliver features on schedule",
    ],
  },
  "Product Manager": {
    professional_summary:
      "Strategic Product Manager with X+ years of experience driving product vision and delivering data-driven solutions. Expert in roadmap planning, stakeholder management, and leading cross-functional teams to ship products that users love.",
    skills: [
      "Product Strategy",
      "Roadmap Planning",
      "Data Analysis",
      "User Research",
      "A/B Testing",
      "Cross-functional Leadership",
      "Competitive Analysis",
      "Market Analysis",
      "Metrics & Analytics",
      "OKR Planning",
      "Communication",
      "Presentation Skills",
    ],
    experience_bullets: [
      "Led product strategy for 3 platforms resulting in 45% revenue growth",
      "Conducted extensive user research with 100+ interviews to validate product hypotheses",
      "Managed cross-functional teams (engineering, design, marketing) to deliver quarterly roadmaps",
      "Implemented data-driven decision making increasing user retention by 28%",
      "Negotiated with key stakeholders and partners to drive strategic initiatives",
    ],
  },
  "Data Scientist": {
    professional_summary:
      "Data-driven Data Scientist with X+ years of experience building predictive models and deriving actionable insights from complex datasets. Expert in machine learning, statistical analysis, and communicating findings to stakeholders.",
    skills: [
      "Machine Learning",
      "Python",
      "SQL",
      "Data Analysis",
      "Statistical Modeling",
      "TensorFlow/PyTorch",
      "Data Visualization",
      "A/B Testing",
      "Big Data Technologies",
      "R",
      "Tableau/PowerBI",
      "Communication",
    ],
    experience_bullets: [
      "Developed predictive models improving recommendation accuracy by 35%",
      "Analyzed 10M+ data points to identify user behavior patterns and optimization opportunities",
      "Built automated data pipeline processing 500K+ events daily",
      "Conducted statistical analysis and A/B testing resulting in 15% conversion improvement",
      "Presented data insights to C-level executives driving strategic business decisions",
    ],
  },
  "UX Designer": {
    professional_summary:
      "User-Centric UX Designer with X+ years of experience creating intuitive digital experiences. Skilled in user research, interaction design, and translating complex requirements into elegant, accessible interfaces.",
    skills: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Interaction Design",
      "Information Architecture",
      "Usability Testing",
      "Figma",
      "Design Systems",
      "Accessibility (WCAG)",
      "User Testing",
      "Prototyping Tools",
      "Communication",
    ],
    experience_bullets: [
      "Redesigned core user flows improving conversion rate by 42%",
      "Conducted user research sessions with 50+ users to validate design decisions",
      "Built comprehensive design system used across 15+ products",
      "Collaborated with engineers to implement pixel-perfect designs",
      "Led design sprints with cross-functional teams to solve critical product challenges",
    ],
  },
  "Marketing Manager": {
    professional_summary:
      "Results-Oriented Marketing Manager with X+ years of experience developing and executing integrated marketing strategies. Proven track record of driving brand awareness, customer acquisition, and revenue growth.",
    skills: [
      "Marketing Strategy",
      "Campaign Management",
      "Digital Marketing",
      "SEO/SEM",
      "Content Marketing",
      "Social Media Marketing",
      "Analytics & Metrics",
      "Email Marketing",
      "Brand Management",
      "Marketing Automation",
      "Budget Management",
      "Leadership",
    ],
    experience_bullets: [
      "Launched integrated marketing campaigns generating $5M+ in revenue",
      "Increased organic traffic by 200% through SEO and content strategy",
      "Managed $2M+ annual marketing budget driving ROI of 3.5x",
      "Built and mentored marketing team of 8 people",
      "Developed customer acquisition strategy reducing CAC by 35%",
    ],
  },
};

// Generate placeholder suggestions based on job title
export function generateAISuggestions(jobTitle: string) {
  // Normalize job title for matching
  const normalized = jobTitle.toLowerCase();

  // Find best matching job title from suggestions
  let bestMatch = "Software Engineer";
  let highestScore = 0;

  Object.keys(JOB_TITLE_SUGGESTIONS).forEach((key) => {
    const keyWords = key.toLowerCase().split(" ");
    const score = keyWords.filter((word) => normalized.includes(word)).length;
    if (score > highestScore) {
      highestScore = score;
      bestMatch = key;
    }
  });

  return JOB_TITLE_SUGGESTIONS[bestMatch];
}

// Create a default resume data structure
export function createDefaultResumeData(
  name: string = "Your Name",
  jobTitle: string = "Professional",
): ResumeData {
  const suggestions = generateAISuggestions(jobTitle);

  return {
    personal: {
      full_name: name,
      email: "your.email@example.com",
      phone: "(555) 123-4567",
      location: "City, State",
      linkedin_url: "linkedin.com/in/yourprofile",
    },
    professional_summary: suggestions.professional_summary,
    experience: [
      {
        id: "1",
        job_title: `Senior ${jobTitle}`,
        company: "Company Name",
        location: "City, State",
        start_date: "2021-01",
        end_date: "Present",
        current: true,
        description: "Brief description of your role",
        achievements: suggestions.experience_bullets.slice(0, 3),
      },
      {
        id: "2",
        job_title: jobTitle,
        company: "Previous Company",
        location: "City, State",
        start_date: "2018-06",
        end_date: "2020-12",
        current: false,
        description: "Brief description of your role",
        achievements: suggestions.experience_bullets.slice(3, 5),
      },
    ],
    education: [
      {
        id: "1",
        school: "University Name",
        degree: "Bachelor's Degree",
        field_of_study: "Computer Science",
        graduation_date: "2018",
      },
    ],
    skills: suggestions.skills,
  };
}

// Convert ResumeData to plain text for ATS
export function resumeDataToText(resume: ResumeData): string {
  const lines: string[] = [];

  // Header
  lines.push(resume.personal.full_name);
  lines.push(resume.personal.email);
  if (resume.personal.phone) lines.push(resume.personal.phone);
  if (resume.personal.location) lines.push(resume.personal.location);
  if (resume.personal.linkedin_url) lines.push(resume.personal.linkedin_url);
  lines.push("");

  // Professional Summary
  if (resume.professional_summary) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push(resume.professional_summary);
    lines.push("");
  }

  // Experience
  if (resume.experience.length > 0) {
    lines.push("EXPERIENCE");
    resume.experience.forEach((exp) => {
      lines.push(`${exp.job_title} | ${exp.company}`);
      const endDate = exp.current ? "Present" : exp.end_date;
      lines.push(`${exp.start_date} - ${endDate}`);
      exp.achievements.forEach((achievement) => {
        lines.push(`• ${achievement}`);
      });
      lines.push("");
    });
  }

  // Education
  if (resume.education.length > 0) {
    lines.push("EDUCATION");
    resume.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field_of_study}`);
      lines.push(`${edu.school} | ${edu.graduation_date}`);
    });
    lines.push("");
  }

  // Skills
  if (resume.skills.length > 0) {
    lines.push("SKILLS");
    lines.push(resume.skills.join(" • "));
  }

  return lines.join("\n");
}
