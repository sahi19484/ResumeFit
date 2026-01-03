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
      description: "Sleek and professional. Perfect for tech roles.",
      gradient: "from-blue-500 to-cyan-600",
      delay: 100,
    },
    {
      name: "Classic Professional",
      description: "Timeless design trusted by HR teams.",
      gradient: "from-purple-500 to-pink-600",
      delay: 200,
    },
    {
      name: "Bold Impact",
      description: "Stand out with modern typography and spacing.",
      gradient: "from-orange-500 to-red-600",
      delay: 300,
    },
    {
      name: "Minimal Focus",
      description: "Clean whitespace highlights your achievements.",
      gradient: "from-green-500 to-emerald-600",
      delay: 400,
    },
    {
      name: "Executive Summary",
      description: "Perfect for leadership and senior roles.",
      gradient: "from-indigo-500 to-blue-600",
      delay: 500,
    },
    {
      name: "Creative Brief",
      description: "Modern layout for creative and tech positions.",
      gradient: "from-pink-500 to-rose-600",
      delay: 600,
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
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 relative overflow-hidden flex flex-col justify-between min-h-[60vh]">
              {/* Close Button */}
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Name & Title */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Sarah Anderson</h2>
                <p className="text-lg text-gray-300">Product Manager | Tech & Innovation</p>
                <p className="text-sm text-gray-400 mt-2">
                  sarah.anderson@email.com | (555) 123-4567 | linkedin.com/in/sarahanderson
                </p>
              </div>

              {/* Professional Summary */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Professional Summary</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Results-driven Product Manager with 8+ years of experience leading innovative tech
                  solutions. Proven track record of delivering high-impact products that drive user
                  engagement and business growth. Skilled in product strategy, data analytics, and
                  cross-functional team leadership.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Experience</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-white">Senior Product Manager</h4>
                    <p className="text-sm text-gray-400">TechCorp Inc. | San Francisco, CA | 2021 - Present</p>
                    <ul className="text-sm text-gray-200 mt-1 space-y-1">
                      <li>• Led product strategy and roadmap for 3 major platforms serving 2M+ users</li>
                      <li>• Increased monthly active users by 45% through data-driven feature releases</li>
                      <li>• Managed cross-functional teams of engineers, designers, and marketers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Education</h3>
                <div>
                  <h4 className="font-semibold text-white">MBA in Business Administration</h4>
                  <p className="text-sm text-gray-400">Stanford University | 2019</p>
                </div>
              </div>
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
