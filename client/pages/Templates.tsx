import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, X } from "lucide-react";

export default function Templates() {
  const [isVisible, setIsVisible] = useState(false);

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
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
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

      <Footer />
    </div>
  );
}
