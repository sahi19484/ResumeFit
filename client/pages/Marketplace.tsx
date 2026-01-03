import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { starterPacks } from "@/lib/starter-packs";
import { ChevronRight, Sparkles, TrendingUp } from "lucide-react";

export default function Marketplace() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div
            className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Industry
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Starter Packs
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get curated keywords, achievement bullets, and metrics specifically tailored to your
              industry. Accelerate your resume with proven language that passes ATS screening.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-primary mb-1">6+</p>
                <p className="text-xs text-muted-foreground">Industries</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-accent mb-1">50+</p>
                <p className="text-xs text-muted-foreground">Bullet Templates</p>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600 mb-1">100%</p>
                <p className="text-xs text-muted-foreground">ATS Optimized</p>
              </div>
            </div>
          </div>

          {/* Starter Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {starterPacks.map((pack, i) => (
              <div
                key={pack.id}
                className={`group rounded-2xl border border-border/50 bg-white overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                }}
              >
                {/* Header with Gradient */}
                <div
                  className={`h-40 bg-gradient-to-br ${
                    pack.color_theme || "from-primary to-accent"
                  } p-6 relative overflow-hidden flex flex-col justify-between`}
                >
                  {/* Animated background circles */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-2">{pack.industry}</h3>
                    <p className="text-sm text-white/80">{pack.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-primary">{pack.bullets.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Bullets</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-accent">{pack.keywords.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Keywords</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">{pack.sample_metrics.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Metrics</p>
                    </div>
                  </div>

                  {/* Sample Bullets */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                      Sample Bullets
                    </p>
                    <ul className="space-y-2">
                      {pack.bullets.slice(0, 2).map((bullet) => (
                        <li key={bullet.id} className="text-xs text-foreground leading-relaxed">
                          <span className="text-muted-foreground">•</span>{" "}
                          {bullet.text.substring(0, 50)}...
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Keywords */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                      Key Words
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {pack.keywords.slice(0, 4).map((keyword, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {pack.keywords.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{pack.keywords.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() =>
                      navigate("/editor", {
                        state: { starterPackId: pack.id },
                      })
                    }
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Use This Pack
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white border-0 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Proven
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
            <h2 className="text-3xl font-bold">Ready to Optimize Your Resume?</h2>
            <p className="text-lg text-muted-foreground">
              Combine any starter pack with our ATS-optimized templates to create a resume that
              gets past screening systems and lands interviews.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/templates")}
                variant="outline"
                size="lg"
              >
                Browse Templates
              </Button>
              <Button
                onClick={() => navigate("/editor")}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent"
              >
                Start Fresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
