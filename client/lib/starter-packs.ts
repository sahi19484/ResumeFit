import { StarterPack } from "./types";

export const starterPacks: StarterPack[] = [
  {
    id: "tech-product",
    industry: "Tech & Product",
    description: "Product Managers & Designers",
    color_theme: "from-blue-500 to-cyan-600",
    bullets: [
      {
        id: "tb1",
        category: "Product Leadership",
        text: "Led product strategy and roadmap for {platform_count} platforms serving {user_count}M+ users",
        metric: "user_growth",
        impact: "high",
      },
      {
        id: "tb2",
        category: "Growth",
        text: "Increased {metric_name} by {percentage}% through {initiative}",
        metric: "activation_rate",
        impact: "high",
      },
      {
        id: "tb3",
        category: "Cross-functional",
        text: "Collaborated with {team_count} cross-functional teams (engineering, design, marketing) to deliver {outcome}",
        metric: "team_velocity",
        impact: "medium",
      },
      {
        id: "tb4",
        category: "Analytics",
        text: "Analyzed {data_type} data to identify {insight} and drove {result}",
        metric: "data_points",
        impact: "medium",
      },
      {
        id: "tb5",
        category: "User Research",
        text: "Conducted {interview_count} user interviews and testing sessions to validate {hypothesis}",
        metric: "interview_count",
        impact: "medium",
      },
    ],
    keywords: [
      "product strategy",
      "roadmap planning",
      "user engagement",
      "A/B testing",
      "data-driven",
      "cross-functional leadership",
      "product-market fit",
      "user retention",
      "feature prioritization",
      "analytics",
      "OKRs",
      "agile",
    ],
    sample_metrics: [
      { metric: "Activation Rate Increase", value: "32%", context: "in 6 months" },
      { metric: "User Retention Improvement", value: "8%", context: "YoY" },
      { metric: "Revenue Impact", value: "$2M+", context: "attributed to features shipped" },
      { metric: "Team Size", value: "3 platforms", context: "under management" },
    ],
    recommended_sections: ["Professional Summary", "Experience", "Skills", "Education", "Projects"],
  },
  {
    id: "finance-consulting",
    industry: "Finance & Consulting",
    description: "Finance, Consulting & Accounting Professionals",
    color_theme: "from-slate-600 to-gray-800",
    bullets: [
      {
        id: "fb1",
        category: "Portfolio Management",
        text: "Managed ${portfolio_size}M portfolio with ${aum} AUM, delivering {return_rate}% returns",
        metric: "portfolio_value",
        impact: "high",
      },
      {
        id: "fb2",
        category: "Cost Reduction",
        text: "Reduced operating costs by {percentage}% through {initiative}, saving ${amount}M annually",
        metric: "cost_savings",
        impact: "high",
      },
      {
        id: "fb3",
        category: "Financial Analysis",
        text: "Conducted {analysis_type} financial analysis for {client_count} clients resulting in {outcome}",
        metric: "client_count",
        impact: "medium",
      },
      {
        id: "fb4",
        category: "Compliance",
        text: "Ensured {percentage}% compliance with {regulation} across {department_size} person team",
        metric: "compliance_rate",
        impact: "medium",
      },
      {
        id: "fb5",
        category: "Risk Management",
        text: "Identified and mitigated {risk_count} financial risks, preventing ${loss_prevention}M in potential losses",
        metric: "risk_mitigation",
        impact: "high",
      },
    ],
    keywords: [
      "financial analysis",
      "portfolio management",
      "risk management",
      "regulatory compliance",
      "financial modeling",
      "accounting",
      "audit",
      "valuation",
      "investment analysis",
      "SAP",
      "Excel",
      "GAAP",
      "CPA",
      "CFA",
    ],
    sample_metrics: [
      { metric: "Portfolio Under Management", value: "$250M+", context: "" },
      { metric: "Cost Reduction", value: "28%", context: "within 2 years" },
      { metric: "Client Retention", value: "98%", context: "YoY" },
      { metric: "Process Efficiency", value: "40%", context: "faster close time" },
    ],
    recommended_sections: [
      "Professional Summary",
      "Experience",
      "Certifications",
      "Skills",
      "Education",
    ],
  },
  {
    id: "healthcare",
    industry: "Healthcare",
    description: "Nurses, Clinicians & Healthcare Professionals",
    color_theme: "from-teal-500 to-cyan-600",
    bullets: [
      {
        id: "hb1",
        category: "Patient Care",
        text: "Provided direct patient care for {patient_count}+ patients in {unit_type} setting, maintaining {satisfaction_rate}% satisfaction",
        metric: "patient_count",
        impact: "high",
      },
      {
        id: "hb2",
        category: "Clinical Leadership",
        text: "Led {initiative} improving {outcome_metric} by {percentage}% across {department_size} person team",
        metric: "team_size",
        impact: "high",
      },
      {
        id: "hb3",
        category: "Compliance & Safety",
        text: "Maintained {percentage}% compliance with {standards} and achieved zero patient safety incidents in {period}",
        metric: "safety_incidents",
        impact: "high",
      },
      {
        id: "hb4",
        category: "Training & Development",
        text: "Trained and mentored {staff_count} clinical staff members on {skill/protocol}",
        metric: "staff_trained",
        impact: "medium",
      },
      {
        id: "hb5",
        category: "Documentation",
        text: "Maintained comprehensive electronic health records with {accuracy_rate}% accuracy",
        metric: "accuracy_rate",
        impact: "medium",
      },
    ],
    keywords: [
      "patient care",
      "clinical assessment",
      "nursing",
      "HIPAA",
      "EHR",
      "patient safety",
      "infection control",
      "medication management",
      "patient education",
      "clinical collaboration",
      "critical thinking",
      "compassion",
    ],
    sample_metrics: [
      { metric: "Patient Satisfaction", value: "95%+", context: "" },
      { metric: "Patient Load", value: "6-8 patients", context: "per shift" },
      { metric: "Safety Incidents", value: "Zero", context: "in 2 years" },
      { metric: "Staff Trained", value: "12+", context: "nurses & technicians" },
    ],
    recommended_sections: [
      "Professional Summary",
      "Licenses & Certifications",
      "Clinical Experience",
      "Education",
      "Skills",
    ],
  },
  {
    id: "sales-business",
    industry: "Sales & Business Development",
    description: "Sales Professionals & Business Development",
    color_theme: "from-orange-500 to-amber-600",
    bullets: [
      {
        id: "sb1",
        category: "Revenue Generation",
        text: "Generated ${revenue}M in annual recurring revenue (ARR) with {quota_percentage}% quota attainment",
        metric: "revenue",
        impact: "high",
      },
      {
        id: "sb2",
        category: "Deal Closure",
        text: "Closed {deal_count} enterprise deals with average contract value of ${acv} in {period}",
        metric: "deal_count",
        impact: "high",
      },
      {
        id: "sb3",
        category: "Customer Growth",
        text: "Grew customer base by {percentage}% YoY while maintaining {retention_rate}% retention rate",
        metric: "customer_growth",
        impact: "high",
      },
      {
        id: "sb4",
        category: "Territory Management",
        text: "Built and managed sales territory generating ${territory_revenue}M in {period}",
        metric: "territory_revenue",
        impact: "medium",
      },
      {
        id: "sb5",
        category: "Team Leadership",
        text: "Recruited, trained, and coached {team_size} sales representatives, achieving {achievement}",
        metric: "team_size",
        impact: "medium",
      },
    ],
    keywords: [
      "sales revenue",
      "quota attainment",
      "deal closure",
      "customer acquisition",
      "customer retention",
      "lead generation",
      "relationship building",
      "negotiation",
      "pipeline management",
      "CRM",
      "Salesforce",
      "ARR",
      "contract value",
    ],
    sample_metrics: [
      { metric: "ARR Generated", value: "$2.5M+", context: "in 12 months" },
      { metric: "Quota Attainment", value: "145%", context: "exceeded by 45%" },
      { metric: "Deals Closed", value: "42", context: "in 2024" },
      { metric: "Customer Retention", value: "92%", context: "YoY" },
    ],
    recommended_sections: [
      "Professional Summary",
      "Experience",
      "Skills",
      "Achievements",
      "Education",
    ],
  },
  {
    id: "creative-design",
    industry: "Creative & Design",
    description: "Designers, UX/UI & Creative Professionals",
    color_theme: "from-pink-500 to-rose-600",
    bullets: [
      {
        id: "cb1",
        category: "Product Design",
        text: "Designed {product_type} serving {user_count}M+ users, resulting in {improvement}% increase in {metric}",
        metric: "user_impact",
        impact: "high",
      },
      {
        id: "cb2",
        category: "Visual Identity",
        text: "Created comprehensive visual identity system for {project_name}, increasing brand recognition by {percentage}%",
        metric: "brand_impact",
        impact: "high",
      },
      {
        id: "cb3",
        category: "User Research",
        text: "Conducted {research_type} with {participant_count} users to validate {hypothesis}",
        metric: "research_insights",
        impact: "medium",
      },
      {
        id: "cb4",
        category: "Collaboration",
        text: "Partnered with {team_type} teams across {org_scope} to deliver {deliverable}",
        metric: "collaboration_impact",
        impact: "medium",
      },
      {
        id: "cb5",
        category: "Impact Measurement",
        text: "Measured design impact through {metrics}, achieving {result}",
        metric: "design_metrics",
        impact: "medium",
      },
    ],
    keywords: [
      "UI/UX design",
      "user research",
      "wireframing",
      "prototyping",
      "visual design",
      "design systems",
      "Figma",
      "accessibility",
      "user testing",
      "information architecture",
      "interaction design",
      "design thinking",
    ],
    sample_metrics: [
      { metric: "Design Impact", value: "32% increase", context: "in user engagement" },
      { metric: "Time Savings", value: "40%", context: "through design system" },
      { metric: "User Satisfaction", value: "4.8/5", context: "average rating" },
      { metric: "Projects Delivered", value: "15+", context: "on time" },
    ],
    recommended_sections: [
      "Professional Summary",
      "Experience",
      "Portfolio",
      "Skills",
      "Education",
    ],
  },
  {
    id: "tech-engineering",
    industry: "Engineering",
    description: "Software Engineers & DevOps Professionals",
    color_theme: "from-gray-700 to-slate-800",
    bullets: [
      {
        id: "eb1",
        category: "Architecture & Infrastructure",
        text: "Architected {system_type} handling {scale} requests/sec with {uptime}% uptime",
        metric: "system_scale",
        impact: "high",
      },
      {
        id: "eb2",
        category: "Performance Optimization",
        text: "Optimized {component} reducing latency by {percentage}% and improving {metric}",
        metric: "performance_gain",
        impact: "high",
      },
      {
        id: "eb3",
        category: "Development Productivity",
        text: "Implemented {tool/practice} reducing deployment time by {percentage}% and developer toil by {metric}",
        metric: "productivity_gain",
        impact: "medium",
      },
      {
        id: "eb4",
        category: "Code Quality",
        text: "Improved code quality through {initiative}, reducing {issue_type} by {percentage}%",
        metric: "quality_improvement",
        impact: "medium",
      },
      {
        id: "eb5",
        category: "Team Leadership",
        text: "Led {project_type} project with {team_size} engineers, delivering {outcome}",
        metric: "team_scope",
        impact: "medium",
      },
    ],
    keywords: [
      "full-stack development",
      "microservices",
      "cloud infrastructure",
      "DevOps",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "performance optimization",
      "system design",
      "API design",
      "database optimization",
      "AWS",
      "GCP",
      "Python",
      "JavaScript",
      "React",
    ],
    sample_metrics: [
      { metric: "System Throughput", value: "50K+ req/sec", context: "" },
      { metric: "Latency Reduction", value: "60%", context: "through optimization" },
      { metric: "Deployment Frequency", value: "10x", context: "faster with CI/CD" },
      { metric: "Incident Response", value: "99.99%", context: "uptime achieved" },
    ],
    recommended_sections: [
      "Professional Summary",
      "Experience",
      "Tech Stack",
      "Projects/GitHub",
      "Education",
    ],
  },
];

// Mock ATS Parser for testing
export function mockParseResume(htmlContent: string): any {
  const textContent = htmlContent.replace(/<[^>]*>/g, " ").toLowerCase();

  const nameMatch = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const emailMatch = textContent.match(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/);
  const phoneMatch = textContent.match(/\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/);

  const keywords = extractKeywords(textContent);
  const score = calculateATSScore(textContent, keywords);

  return {
    fields: {
      name: nameMatch ? nameMatch[1].trim() : "Not found",
      email: emailMatch ? emailMatch[0] : "Not found",
      phone: phoneMatch ? `(${phoneMatch[1]}) ${phoneMatch[2]}-${phoneMatch[3]}` : "Not found",
    },
    sections: extractSections(htmlContent),
    keywords,
    score,
    gaps: identifyGaps(textContent, keywords),
    warnings: identifyWarnings(htmlContent),
  };
}

function extractKeywords(text: string): string[] {
  const keywords = new Set<string>();
  const commonKeywords = [
    "led",
    "managed",
    "developed",
    "designed",
    "increased",
    "improved",
    "reduced",
    "optimized",
    "architected",
    "collaborated",
  ];

  commonKeywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      keywords.add(keyword);
    }
  });

  return Array.from(keywords);
}

function extractSections(html: string): any[] {
  const sections = [];
  const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
  let match;

  while ((match = h2Regex.exec(html))) {
    sections.push({
      name: match[1],
      content: "Section content",
      keywords: [],
    });
  }

  return sections;
}

function calculateATSScore(text: string, keywords: string[]): number {
  let score = 50;

  if (keywords.length > 5) score += 15;
  if (text.includes("@")) score += 10;
  if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)) score += 10;
  if (text.includes("http")) score += 10;

  return Math.min(score, 100);
}

function identifyGaps(text: string, keywords: string[]): string[] {
  const gaps = [];

  if (!text.includes("@")) gaps.push("Email address not found");
  if (!/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)) gaps.push("Phone number not found");
  if (keywords.length < 5) gaps.push("Missing action verbs - add more quantifiable achievements");

  return gaps;
}

function identifyWarnings(html: string): string[] {
  const warnings = [];

  if (html.includes("<img")) warnings.push("Resume contains images - ensure text is not embedded in images");
  if (html.match(/<table/gi) && html.match(/<table/gi)!.length > 2)
    warnings.push("Multiple tables detected - simplify for better ATS parsing");

  return warnings;
}
