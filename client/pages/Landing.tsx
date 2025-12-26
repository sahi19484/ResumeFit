import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, FileText, Briefcase, Eye } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Turn your LinkedIn profile into an{" "}
              <span className="text-primary">ATS-ready resume</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Paste your public LinkedIn URL. We extract, optimize, and generate a DOCX/PDF that passes ATS scans. No login required. Takes minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/generator">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-base h-12 px-8">
                  Get My ATS Resume
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 text-base h-12 px-8"
                onClick={() => {
                  const element = document.getElementById("how-it-works");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                How It Works
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                No LinkedIn credentials required • Your data is private
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Import from LinkedIn</h3>
              <p className="text-muted-foreground text-sm">
                No login. Public profile only. We extract everything for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                <Check className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">ATS Validated</h3>
              <p className="text-muted-foreground text-sm">
                DOCX + selectable PDF. No tables, no icons. Built for recruiters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                <Briefcase className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Job Aligned</h3>
              <p className="text-muted-foreground text-sm">
                Optional: Target a job title for keyword alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              How It Works
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Paste Your LinkedIn URL
                  </h3>
                  <p className="text-muted-foreground">
                    Share your public profile link. We don't need your password or any credentials.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    We Extract & Optimize
                  </h3>
                  <p className="text-muted-foreground">
                    We pull your profile data and rewrite it with ATS-optimized formatting and action verbs.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Review & Download
                  </h3>
                  <p className="text-muted-foreground">
                    See your resume, adjust as needed, and download as DOCX or PDF. ATS-ready to go.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-12">
            Trusted by job seekers everywhere
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-border p-6">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic mb-4">
                  "ResumeFit made it so easy to create a professional resume that actually passes ATS checks."
                </p>
                <p className="text-sm font-semibold text-foreground">
                  User {i}
                </p>
                <p className="text-xs text-muted-foreground">
                  Product Manager
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-16">
              Why Choose ResumeFit
            </h2>

            <div className="space-y-4">
              {[
                { icon: Zap, title: "Fast", desc: "Generate in minutes, not hours" },
                { icon: Eye, title: "Transparent", desc: "See exactly what changed and why" },
                { icon: Shield, title: "Private", desc: "Public profiles only. No credential theft." },
                { icon: Check, title: "ATS-Optimized", desc: "Every template validated by ATS parsers" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to beat the ATS?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your ATS-ready resume is just minutes away. No credit card required.
          </p>
          <Link to="/generator">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-base h-12 px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
