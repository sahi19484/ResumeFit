import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, X } from "lucide-react";

export default function Templates() {
  const [isVisible, setIsVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const templates = [
    {
      name: "Modern Clean",
      description:
        "Tech Product Managers & Designers: Two-column layout with skills proficiency, projects, and metrics.",
      industry: "Tech & Product",
      gradient: "from-blue-500 to-cyan-600",
      delay: 100,
      previewStyle: "modern",
      bgColor: "from-blue-900 to-cyan-900",
    },
    {
      name: "Classic Professional",
      description:
        "Finance, Consulting & Accounting: High-contrast, formal layout with certifications and ATS optimization.",
      industry: "Finance & Consulting",
      gradient: "from-slate-600 to-gray-800",
      delay: 200,
      previewStyle: "classic",
      bgColor: "from-slate-900 to-gray-900",
    },
    {
      name: "Clinical Resume",
      description:
        "Nurses, Clinicians & Healthcare: Accessible, clear layout with licensure, certifications, and timeline.",
      industry: "Healthcare",
      gradient: "from-teal-500 to-cyan-600",
      delay: 300,
      previewStyle: "clinical",
      bgColor: "from-teal-900 to-cyan-900",
    },
    {
      name: "Creative Brief",
      description:
        "Designers, UX/UI & Creatives: Expressive layout with portfolio strip and design-forward typography.",
      industry: "Design & Creative",
      gradient: "from-pink-500 to-rose-600",
      delay: 400,
      previewStyle: "creative",
      bgColor: "from-pink-900 to-rose-900",
    },
    {
      name: "Results-First",
      description:
        "Sales & Business Development: KPI-focused with quota attainment, deals closed, and testimonials.",
      industry: "Sales & Business",
      gradient: "from-orange-500 to-amber-600",
      delay: 500,
      previewStyle: "results",
      bgColor: "from-orange-900 to-amber-900",
    },
    {
      name: "Academic CV",
      description:
        "Researchers & Educators: Multi-section layout with research, publications, grants, and awards.",
      industry: "Education & Academia",
      gradient: "from-purple-600 to-blue-700",
      delay: 600,
      previewStyle: "academic",
      bgColor: "from-purple-900 to-blue-900",
    },
    {
      name: "Technical Stack",
      description:
        "Software Engineers & DevOps: Tech-focused with GitHub links, project links, and tech matrix.",
      industry: "Engineering",
      gradient: "from-gray-700 to-slate-800",
      delay: 700,
      previewStyle: "technical",
      bgColor: "from-gray-900 to-slate-900",
    },
    {
      name: "Executive Premium",
      description:
        "C-Level & Leadership: Premium, authoritative single-column with leadership highlights and board roles.",
      industry: "Executive",
      gradient: "from-amber-700 to-yellow-800",
      delay: 800,
      previewStyle: "executive",
      bgColor: "from-amber-900 to-yellow-900",
    },
  ];

  // Get unique industries and styles
  const industries = Array.from(new Set(templates.map((t) => t.industry)));
  const styles = Array.from(new Set(templates.map((t) => t.previewStyle)));

  // Filter templates
  const filteredTemplates = templates.filter((t) => {
    const industryMatch =
      selectedIndustry === "all" || t.industry === selectedIndustry;
    const styleMatch =
      selectedStyle === "all" || t.previewStyle === selectedStyle;
    return industryMatch && styleMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              ATS-Validated
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Resume Templates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Every template is tested and validated to pass ATS parsing. Choose
              the style that works best for your industry.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Industry Filter */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Filter by Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="all">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Filter */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Filter by Style
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="all">All Styles</option>
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredTemplates.length} of {templates.length} templates
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-border/50 bg-white overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${template.delay}ms` : "0ms",
                }}
              >
                {/* Template Preview */}
                <div
                  className={`h-64 bg-gradient-to-br ${template.gradient} p-6 relative overflow-hidden`}
                >
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                    <div
                      className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>

                  <div className="relative w-full h-full flex flex-col justify-between text-white text-xs overflow-hidden">
                    {template.previewStyle === "modern" && (
                      <>
                        <div>
                          <div className="font-bold text-sm mb-0.5">
                            Sarah Anderson
                          </div>
                          <div className="text-white/70 text-xs mb-1">
                            Product Manager
                          </div>
                          <div className="text-white/60 text-xs space-y-0.5">
                            <p>Data Analytics: 85%</p>
                            <p>Product Strategy: 90%</p>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs mb-0.5">
                            Senior PM @ TechCorp
                          </div>
                          <p className="text-white/70 text-xs">
                            +32% activation • 3 launches
                          </p>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "classic" && (
                      <>
                        <div className="text-center">
                          <div className="font-bold text-sm">
                            SARAH ANDERSON
                          </div>
                          <div className="text-white/70 text-xs">
                            Finance Manager
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-xs mb-1">
                            Morgan Stanley
                          </div>
                          <p className="text-white/70 text-xs">
                            $250M Portfolio • +28% Efficiency
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            CFA Level III
                          </p>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "clinical" && (
                      <>
                        <div>
                          <div className="font-bold text-sm">
                            SARAH ANDERSON, RN
                          </div>
                          <div className="text-white/70 text-xs">
                            Critical Care Nurse
                          </div>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs font-semibold">
                            RN License CA #123456
                          </p>
                          <p className="text-white/70 text-xs mt-1">
                            UCSF Medical Center
                          </p>
                          <p className="text-white/70 text-xs">
                            CCRN • BLS/ACLS
                          </p>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "creative" && (
                      <>
                        <div className="text-lg font-black">SA</div>
                        <div>
                          <div className="font-bold text-sm">
                            SARAH ANDERSON
                          </div>
                          <div className="text-white/70 text-xs">
                            UX/UI Designer
                          </div>
                          <p className="text-white/60 text-xs mt-1">
                            dribbble.com/sarah
                          </p>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "results" && (
                      <>
                        <div>
                          <div className="font-bold text-sm">
                            SARAH ANDERSON
                          </div>
                          <div className="text-white/70 text-xs">
                            Sales Executive
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-center">
                          <div>
                            <p className="font-bold text-xs">$2.5M</p>
                            <p className="text-white/60 text-xs">ARR</p>
                          </div>
                          <div>
                            <p className="font-bold text-xs">145%</p>
                            <p className="text-white/60 text-xs">Quota</p>
                          </div>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "academic" && (
                      <>
                        <div>
                          <div className="font-bold text-sm">
                            Dr. Sarah Anderson
                          </div>
                          <div className="text-white/70 text-xs">
                            Computer Science
                          </div>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs font-semibold">
                            Research: ML & NLP
                          </p>
                          <p className="text-white/70 text-xs mt-1">
                            4 Recent Publications
                          </p>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "technical" && (
                      <>
                        <div>
                          <div className="font-bold text-sm">
                            SARAH ANDERSON
                          </div>
                          <div className="text-white/70 text-xs">
                            Full Stack Engineer
                          </div>
                        </div>
                        <div className="text-white/60 text-xs space-y-0.5">
                          <p>React • Node.js • Docker</p>
                          <p>Python • PostgreSQL • AWS</p>
                        </div>
                      </>
                    )}
                    {template.previewStyle === "executive" && (
                      <>
                        <div>
                          <div className="font-bold text-sm">
                            SARAH ANDERSON
                          </div>
                          <div className="text-white/70 text-xs">
                            VP of Product
                          </div>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs font-semibold">
                            $250M Growth
                          </p>
                          <p className="text-white/70 text-xs mt-1">
                            50+ Leadership Team
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white border-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      ATS Validated
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      onClick={() => setPreviewTemplate(i)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                      onClick={() =>
                        navigate("/generator", {
                          state: { selectedTemplate: template.name },
                        })
                      }
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl my-auto">
            {/* Close Button */}
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-lg transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Template Preview Content */}
            <div
              className={`bg-gradient-to-br ${templates[previewTemplate].bgColor} p-8 relative overflow-hidden`}
            >
              {/* MODERN CLEAN - Tech Product Managers */}
              {templates[previewTemplate].previewStyle === "modern" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                  {/* Left column: Contact & Skills */}
                  <div className="col-span-1 space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
                        Contact
                      </h4>
                      <p className="text-xs text-blue-100">
                        sarah.anderson@email.com
                      </p>
                      <p className="text-xs text-blue-100">(555) 123-4567</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
                        Tools & Skills
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span>Product Strategy</span>{" "}
                          <span className="float-right">90%</span>
                        </div>
                        <div className="bg-blue-900/50 h-1 rounded"></div>
                        <div>
                          <span>Data Analytics</span>{" "}
                          <span className="float-right">85%</span>
                        </div>
                        <div className="bg-blue-900/50 h-1 rounded"></div>
                      </div>
                    </div>
                  </div>
                  {/* Right column: Summary & Experience */}
                  <div className="col-span-2 space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">
                        SARAH ANDERSON
                      </h2>
                      <p className="text-lg text-blue-100">Product Manager</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-2">
                        Summary
                      </h3>
                      <p className="text-xs text-blue-100 leading-relaxed">
                        Results-driven PM with 8+ years building products that
                        scale. Expert in data-driven decisions and
                        cross-functional leadership.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-2">
                        Experience
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-sm">
                            Senior Product Manager
                          </p>
                          <p className="text-xs text-blue-200">
                            TechCorp Inc. | 2021 - Present
                          </p>
                          <ul className="text-xs mt-1 space-y-1">
                            <li>• Increased activation by 32%</li>
                            <li>• Led 3 platform launches</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CLASSIC PROFESSIONAL - Finance & Consulting */}
              {templates[previewTemplate].previewStyle === "classic" && (
                <div className="text-white font-serif space-y-3">
                  <div className="text-center border-b-2 border-white/40 pb-3 mb-4">
                    <h2 className="text-2xl font-bold">SARAH ANDERSON</h2>
                    <p className="text-sm">Finance Manager | Consulting</p>
                    <p className="text-xs mt-1">
                      sarah.anderson@email.com | (555) 123-4567
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      PROFESSIONAL EXPERIENCE
                    </h3>
                    <div className="ml-2 space-y-2 text-xs">
                      <div>
                        <p className="font-semibold">
                          Senior Finance Manager — Morgan Stanley (2020-Present)
                        </p>
                        <ul className="ml-4 space-y-1 mt-1">
                          <li>◦ Managed $250M portfolio</li>
                          <li>◦ Increased operational efficiency by 28%</li>
                          <li>◦ Led team of 8 analysts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      CERTIFICATIONS
                    </h3>
                    <p className="text-xs">CFA Level III | MBA Finance</p>
                  </div>
                </div>
              )}

              {/* CLINICAL - Healthcare */}
              {templates[previewTemplate].previewStyle === "clinical" && (
                <div className="text-white space-y-4">
                  <div className="border-b-2 border-teal-300 pb-3">
                    <h2 className="text-3xl font-bold">SARAH ANDERSON, RN</h2>
                    <p className="text-sm text-teal-100">
                      Registered Nurse | Critical Care
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      LICENSES & CERTIFICATIONS
                    </h3>
                    <p className="text-xs text-teal-100">
                      RN License CA #123456 | BLS/ACLS | CCRN
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      CLINICAL EXPERIENCE
                    </h3>
                    <div className="text-xs space-y-2">
                      <div>
                        <p className="font-semibold">
                          ICU Registered Nurse — UCSF Medical Center
                          (2019-Present)
                        </p>
                        <p className="text-teal-100">
                          Managed care for 6-8 patients with complex conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CREATIVE BRIEF - Designers */}
              {templates[previewTemplate].previewStyle === "creative" && (
                <div className="text-white space-y-6">
                  <div className="flex flex-col md:flex-row md:items-end gap-4 border-b-4 border-pink-300 pb-3">
                    <div className="text-5xl md:text-6xl font-black text-pink-200">
                      SA
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">SARAH ANDERSON</h2>
                      <p className="text-sm text-pink-100">UX/UI Designer</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="font-bold text-pink-200">Dribbble</p>
                      <p>dribbble.com/sarah</p>
                    </div>
                    <div>
                      <p className="font-bold text-pink-200">Portfolio</p>
                      <p>sarahdesign.com</p>
                    </div>
                    <div>
                      <p className="font-bold text-pink-200">LinkedIn</p>
                      <p>in/sarahanderson</p>
                    </div>
                  </div>
                  <div className="bg-pink-900/50 p-3 rounded">
                    <h3 className="text-sm font-bold mb-1">
                      FEATURED PROJECTS
                    </h3>
                    <p className="text-xs">
                      Mobile App Redesign (32% improvement) | E-commerce
                      Platform | Design System
                    </p>
                  </div>
                </div>
              )}

              {/* RESULTS-FIRST - Sales */}
              {templates[previewTemplate].previewStyle === "results" && (
                <div className="text-white space-y-5">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                      SARAH ANDERSON
                    </h2>
                    <p className="text-base md:text-lg text-orange-100">
                      Sales Executive | Business Development
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-orange-900/40 p-3 rounded">
                    <div className="text-center">
                      <p className="text-2xl font-bold">$2.5M</p>
                      <p className="text-xs">ARR Generated</p>
                    </div>
                    <div className="text-center border-l border-r border-white/30">
                      <p className="text-2xl font-bold">145%</p>
                      <p className="text-xs">Quota Attainment</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-xs">Deals Closed</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      PROFESSIONAL EXPERIENCE
                    </h3>
                    <div className="text-xs space-y-1 mt-2">
                      <p className="font-semibold">
                        Senior Sales Manager — SalesCorp (2019-Present)
                      </p>
                      <p className="text-orange-100">
                        Led team to 150% quota | $2.5M ARR | 42 closed deals
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ACADEMIC CV - Researchers */}
              {templates[previewTemplate].previewStyle === "academic" && (
                <div className="text-white font-serif space-y-4">
                  <div className="border-b border-purple-300 pb-3">
                    <h2 className="text-2xl font-bold">Dr. Sarah Anderson</h2>
                    <p className="text-sm text-purple-100">
                      Assistant Professor | Computer Science
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      RESEARCH INTERESTS
                    </h3>
                    <p className="text-xs text-purple-100">
                      Machine Learning, Natural Language Processing, AI Ethics
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      RECENT PUBLICATIONS
                    </h3>
                    <ul className="text-xs space-y-1">
                      <li>
                        Anderson, S. et al. (2023). "Novel ML approaches..."
                        IEEE Conference.
                      </li>
                      <li>
                        Anderson, S. (2022). "AI Ethics Review..." Journal of
                        AI.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase">TEACHING</h3>
                    <p className="text-xs text-purple-100">
                      Intro to ML, Advanced AI, Research Methods
                    </p>
                  </div>
                </div>
              )}

              {/* TECHNICAL - Software Engineers */}
              {templates[previewTemplate].previewStyle === "technical" && (
                <div className="text-white space-y-4 font-mono text-xs">
                  <div>
                    <h2 className="text-3xl font-bold font-sans mb-1">
                      SARAH ANDERSON
                    </h2>
                    <p className="text-sm text-gray-300">
                      Full Stack Engineer | DevOps
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase font-sans mb-2">
                      TECH STACK
                    </h3>
                    <div className="space-y-1">
                      <p>
                        Languages: JavaScript, Python, Go | Framework: React,
                        Node.js, FastAPI
                      </p>
                      <p>
                        Tools: Docker, Kubernetes, AWS, PostgreSQL | Git:
                        github.com/sarah
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase font-sans mb-2">
                      PROJECTS & IMPACT
                    </h3>
                    <div className="space-y-1">
                      <p>
                        → Built microservices (50% latency reduction) |
                        github.com/sarah/service
                      </p>
                      <p>→ Automated CI/CD pipeline (80% faster deployments)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* EXECUTIVE PREMIUM - Leadership */}
              {templates[previewTemplate].previewStyle === "executive" && (
                <div className="text-white space-y-6">
                  <div className="border-b-2 border-amber-400 pb-4">
                    <h2 className="text-4xl font-bold mb-1">SARAH ANDERSON</h2>
                    <p className="text-lg text-amber-100">
                      Vice President of Product | Strategic Leader
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                      EXECUTIVE PROFILE
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Strategic executive with 15+ years transforming
                      organizations through digital innovation. Proven track
                      record driving $500M+ in revenue and building world-class
                      teams.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                      KEY ACHIEVEMENTS
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        → Grew division revenue by $250M (30% CAGR) over 5 years
                      </li>
                      <li>→ Led successful IPO preparation and execution</li>
                      <li>→ Built leadership team of 50+ executives</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="bg-gray-50 px-8 py-4 flex gap-2 justify-end border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setPreviewTemplate(null)}
                className="border-gray-300 hover:bg-gray-100"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  navigate("/generator", {
                    state: {
                      selectedTemplate: templates[previewTemplate].name,
                    },
                  });
                }}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
              >
                Use This Template
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
