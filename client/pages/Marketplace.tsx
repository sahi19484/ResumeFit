import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { starterPacks } from "@/lib/starter-packs";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Marketplace() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartPack = (packId: string, industry: string) => {
    navigate("/editor", {
      state: { selectedTemplate: industry, starterPackId: packId },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Industry Starter Packs
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Curated Resume
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Starter Kits
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Get industry-specific bullet points, keywords, and metrics curated
              by hiring experts. Jump-start your resume with proven content
              patterns for your role.
            </p>
          </div>

          {/* Starter Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {starterPacks.map((pack, index) => (
              <div
                key={pack.id}
                className={`group rounded-2xl border border-border/50 bg-white overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms",
                }}
              >
                {/* Header with Gradient */}
                <div
                  className={`h-40 bg-gradient-to-br ${pack.color_theme} p-6 relative overflow-hidden flex items-end`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                    <div
                      className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white">
                      {pack.industry}
                    </h3>
                    <p className="text-sm text-white/80">{pack.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Bullets Preview */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">
                      Sample Bullets ({pack.bullets.length})
                    </h4>
                    <ul className="space-y-1">
                      {pack.bullets.slice(0, 2).map((bullet, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground leading-relaxed"
                        >
                          <span className="text-primary font-bold">•</span>{" "}
                          {bullet.text.substring(0, 60)}
                          ...
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">
                      Key Terms
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {pack.keywords.slice(0, 4).map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="text-xs bg-primary/5 border-primary/20 text-primary"
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {pack.keywords.length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-xs text-muted-foreground"
                        >
                          +{pack.keywords.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Sample Metrics */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">
                      Sample Metrics
                    </h4>
                    <ul className="space-y-1">
                      {pack.sample_metrics.slice(0, 2).map((metric, i) => (
                        <li key={i} className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {metric.value}
                          </span>{" "}
                          {metric.metric} {metric.context}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="space-y-1 py-2 border-t border-border/50">
                    {[
                      `${pack.bullets.length} bullet templates`,
                      `${pack.keywords.length} industry keywords`,
                      `${pack.recommended_sections.length} recommended sections`,
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleStartPack(pack.id, pack.industry)}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold flex items-center gap-2 group"
                  >
                    Use This Pack
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              What You Get in Each Pack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Curated Bullet Points
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    5+ industry-specific achievement templates you can customize
                    with your metrics
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Keyword Library
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    12+ high-impact keywords vetted for ATS systems and
                    recruiter filters
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Metric Examples
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Real numbers and percentages you can adapt to show
                    quantifiable impact
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Section Guidance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Recommended resume sections and structure for maximum ATS
                    compatibility
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto text-center mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Build Your ATS-Optimized Resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choose a starter pack above to get personalized suggestions and
              instantly boost your resume's ATS compatibility.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
