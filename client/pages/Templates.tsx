import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, X } from "lucide-react";

export default function Templates() {
  const [isVisible, setIsVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const templates = [
    {
      name: "Modern Clean",
      description: "Tech Product Managers & Designers: Two-column layout with skills proficiency, projects, and metrics.",
      industry: "Tech & Product",
      gradient: "from-blue-500 to-cyan-600",
      delay: 100,
      previewStyle: "modern",
      bgColor: "from-blue-900 to-cyan-900",
    },
    {
      name: "Classic Professional",
      description: "Finance, Consulting & Accounting: High-contrast, formal layout with certifications and ATS optimization.",
      industry: "Finance & Consulting",
      gradient: "from-slate-600 to-gray-800",
      delay: 200,
      previewStyle: "classic",
      bgColor: "from-slate-900 to-gray-900",
    },
    {
      name: "Clinical Resume",
      description: "Nurses, Clinicians & Healthcare: Accessible, clear layout with licensure, certifications, and timeline.",
      industry: "Healthcare",
      gradient: "from-teal-500 to-cyan-600",
      delay: 300,
      previewStyle: "clinical",
      bgColor: "from-teal-900 to-cyan-900",
    },
    {
      name: "Creative Brief",
      description: "Designers, UX/UI & Creatives: Expressive layout with portfolio strip and design-forward typography.",
      industry: "Design & Creative",
      gradient: "from-pink-500 to-rose-600",
      delay: 400,
      previewStyle: "creative",
      bgColor: "from-pink-900 to-rose-900",
    },
    {
      name: "Results-First",
      description: "Sales & Business Development: KPI-focused with quota attainment, deals closed, and testimonials.",
      industry: "Sales & Business",
      gradient: "from-orange-500 to-amber-600",
      delay: 500,
      previewStyle: "results",
      bgColor: "from-orange-900 to-amber-900",
    },
    {
      name: "Academic CV",
      description: "Researchers & Educators: Multi-section layout with research, publications, grants, and awards.",
      industry: "Education & Academia",
      gradient: "from-purple-600 to-blue-700",
      delay: 600,
      previewStyle: "academic",
      bgColor: "from-purple-900 to-blue-900",
    },
    {
      name: "Technical Stack",
      description: "Software Engineers & DevOps: Tech-focused with GitHub links, project links, and tech matrix.",
      industry: "Engineering",
      gradient: "from-gray-700 to-slate-800",
      delay: 700,
      previewStyle: "technical",
      bgColor: "from-gray-900 to-slate-900",
    },
    {
      name: "Executive Premium",
      description: "C-Level & Leadership: Premium, authoritative single-column with leadership highlights and board roles.",
      industry: "Executive",
      gradient: "from-amber-700 to-yellow-800",
      delay: 800,
      previewStyle: "executive",
      bgColor: "from-amber-900 to-yellow-900",
    },
  ];

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

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, i) => (
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

                  <div className="relative w-full h-full flex flex-col justify-between text-white text-xs">
                    {/* Name & Title */}
                    <div>
                      <div className="font-bold text-sm mb-0.5">Sarah Anderson</div>
                      <div className="text-white/70 text-xs mb-2">
                        Product Manager | Tech & Innovation
                      </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                      <div className="font-semibold text-xs mb-1 opacity-90">Experience</div>
                      <div className="text-white/80 text-xs">
                        <div className="font-medium mb-0.5">Senior Product Manager</div>
                        <div className="text-white/60 text-xs mb-1">TechCorp Inc. • 2021 - Present</div>
                        <div className="space-y-0.5">
                          <div className="flex gap-1">
                            <span className="text-white/50">•</span>
                            <span className="text-white/80">Led product strategy for 3 platforms</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="text-white/50">•</span>
                            <span className="text-white/80">Increased user engagement by 45%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Education Section */}
                    <div>
                      <div className="font-semibold text-xs opacity-90">Education</div>
                      <div className="text-white/80 text-xs">
                        <div className="font-medium">MBA Business Administration</div>
                        <div className="text-white/60">Stanford University • 2019</div>
                      </div>
                    </div>
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
                      onClick={() => navigate("/generator", { state: { selectedTemplate: template.name } })}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-lg transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Template Preview Content */}
            <div className={`bg-gradient-to-br ${templates[previewTemplate].bgColor} p-12 relative overflow-hidden flex-1`}>
              {templates[previewTemplate].previewStyle === "modern" && (
                <div className="text-white space-y-6">
                  <div className="border-b border-white/30 pb-6">
                    <h2 className="text-4xl font-bold mb-1">SARAH ANDERSON</h2>
                    <p className="text-lg text-blue-100 mb-3">Product Manager</p>
                    <p className="text-sm text-blue-200">
                      sarah.anderson@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/sarahanderson | San Francisco, CA
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-2 uppercase tracking-wider">Professional Summary</h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      Results-driven Product Manager with 8+ years driving innovative solutions and building high-performing teams.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 uppercase tracking-wider">Experience</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">Senior Product Manager</p>
                        <p className="text-sm text-blue-200">TechCorp Inc. • 2021 - Present</p>
                        <ul className="text-sm mt-1 space-y-1 text-blue-100">
                          <li>• Led product strategy across 3 platforms</li>
                          <li>• Increased user engagement by 45%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {templates[previewTemplate].previewStyle === "classic" && (
                <div className="text-white space-y-4 font-serif">
                  <div className="text-center mb-6 border-b-2 border-white/40 pb-4">
                    <h2 className="text-3xl font-bold">SARAH ANDERSON</h2>
                    <p className="text-lg">Product Manager | Tech & Innovation</p>
                    <p className="text-xs mt-2">
                      Email: sarah.anderson@email.com | Phone: (555) 123-4567 | LinkedIn.com/in/sarahanderson
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold mb-2">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm leading-relaxed">
                      Experienced Product Manager with a proven track record of launching successful products and leading cross-functional teams in the technology industry.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold mb-2">PROFESSIONAL EXPERIENCE</h3>
                    <div className="ml-4 space-y-2 text-sm">
                      <div>
                        <p className="font-semibold">Senior Product Manager — TechCorp Inc. (2021-Present)</p>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>◦ Led product roadmap for 3 platforms serving 2M+ users</li>
                          <li>◦ Increased monthly active users by 45%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {templates[previewTemplate].previewStyle === "bold" && (
                <div className="text-white space-y-5">
                  <div className="border-l-4 border-white pl-4">
                    <h2 className="text-5xl font-black mb-1">SARAH<br/>ANDERSON</h2>
                    <p className="text-2xl font-bold text-orange-200">PRODUCT MANAGER</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs py-4">
                    <div>
                      <p className="font-bold uppercase">Email</p>
                      <p>sarah.anderson@email.com</p>
                    </div>
                    <div>
                      <p className="font-bold uppercase">Phone</p>
                      <p>(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="border-t border-white/50 pt-4">
                    <h3 className="text-xl font-black mb-2">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-bold text-lg">Senior Product Manager</p>
                        <p className="text-sm text-orange-200">TechCorp Inc. | 2021 - Present</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>▸ Led product strategy for 3 platforms</li>
                          <li>▸ 45% increase in user engagement</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {templates[previewTemplate].previewStyle === "minimal" && (
                <div className="text-white space-y-8">
                  <div>
                    <h2 className="text-5xl font-bold mb-2">Sarah Anderson</h2>
                    <div className="flex gap-6 text-sm">
                      <span>Product Manager</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/30"></div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Professional Summary</h3>
                    <p className="text-sm leading-relaxed max-w-xl">
                      Product Manager with 8+ years building innovative solutions. Passionate about user-centered design and data-driven decisions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-base">Senior Product Manager</p>
                        <p className="text-xs text-green-200">TechCorp Inc. | 2021 - Present</p>
                        <div className="mt-3 space-y-2 text-xs">
                          <p>Led product strategy and roadmap for 3 major platforms</p>
                          <p>Increased monthly active users by 45% through feature launches</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {templates[previewTemplate].previewStyle === "executive" && (
                <div className="text-white space-y-6">
                  <div className="bg-white/10 p-4 rounded">
                    <h2 className="text-3xl font-bold mb-1">Sarah Anderson</h2>
                    <p className="text-base font-semibold text-indigo-200">Senior Product Manager — Strategic Leader</p>
                    <div className="flex gap-3 text-xs mt-3">
                      <span>sarah.anderson@email.com</span>
                      <span>|</span>
                      <span>(555) 123-4567</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold mb-2">EXECUTIVE PROFILE</h3>
                    <p className="text-sm leading-relaxed">
                      Strategic Product Leader with 8+ years driving digital transformation and delivering measurable business results. Proven expertise in building high-performing teams and launching market-leading products.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold mb-3">KEY ACHIEVEMENTS</h3>
                    <ul className="space-y-2 text-sm">
                      <li>→ Led 3 platform launches generating $50M+ in revenue</li>
                      <li>→ Grew user base by 45% while reducing churn by 30%</li>
                      <li>→ Built and mentored teams of 15+ cross-functional leaders</li>
                    </ul>
                  </div>
                </div>
              )}

              {templates[previewTemplate].previewStyle === "creative" && (
                <div className="text-white space-y-6">
                  <div className="flex items-end gap-4 border-b-4 border-white pb-4">
                    <div>
                      <h2 className="text-5xl font-black">SA</h2>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">SARAH ANDERSON</h2>
                      <p className="text-sm font-light">Product Manager | Innovator</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-xs py-4">
                    <div>
                      <p className="font-bold uppercase text-pink-200">Location</p>
                      <p>San Francisco</p>
                    </div>
                    <div>
                      <p className="font-bold uppercase text-pink-200">Email</p>
                      <p>sarah.anderson@</p>
                      <p>email.com</p>
                    </div>
                    <div>
                      <p className="font-bold uppercase text-pink-200">LinkedIn</p>
                      <p>in/sarahanderson</p>
                    </div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">ABOUT</h3>
                    <p className="text-xs leading-relaxed">
                      Creative-minded Product Manager specializing in innovative solutions and user experience design. 8+ years in tech.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">WORK EXPERIENCE</h3>
                    <div>
                      <p className="font-bold">Senior Product Manager @ TechCorp</p>
                      <p className="text-xs text-pink-200">2021 - Present</p>
                      <p className="text-xs mt-2">→ Launched 3 successful products | → 45% growth</p>
                    </div>
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
                    state: { selectedTemplate: templates[previewTemplate].name },
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
