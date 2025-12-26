import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, FileText, Briefcase, Eye, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animated feature cards
  const FeatureCard = ({ icon: Icon, title, description, delay, gradient }: any) => (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white border border-border/50 p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl ${gradient} mb-4 transition-transform duration-500 group-hover:scale-110`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );

  // Animated step indicator
  const StepCard = ({ number, title, description, delay }: any) => (
    <div
      className={`flex gap-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg">
          {number}
        </div>
      </div>
      <div className="pt-1">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  // Testimonial card
  const TestimonialCard = ({ name, title: role, delay }: any) => (
    <div
      className={`bg-white rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400 text-lg">
            ★
          </span>
        ))}
      </div>
      <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
        "ResumeFit made it so easy to create a professional resume that actually passes ATS checks. Got 3 interviews in a week!"
      </p>
      <p className="text-sm font-semibold text-foreground">
        {name}
      </p>
      <p className="text-xs text-muted-foreground">
        {role}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-40 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-accent/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                The Future of Resume Building
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`text-4xl md:text-7xl font-black text-foreground mb-6 leading-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? "150ms" : "0ms",
                background: "linear-gradient(135deg, #1a2742 0%, #0d4a8a 50%, #1a2742 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Turn LinkedIn into<br />an<span className="ml-3 text-primary">ATS Winner</span>
            </h1>

            {/* Subheading */}
            <p
              className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? "300ms" : "0ms",
              }}
            >
              One click. One minute. Your resume passes ATS checks with confidence. Powered by AI, trusted by recruiters.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? "450ms" : "0ms",
              }}
            >
              <Link to="/generator" className="group">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-base h-12 px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get My ATS Resume
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 text-base h-12 px-8 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById("how-it-works");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: isVisible ? "600ms" : "0ms",
              }}
            >
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                No credentials needed • Your data is private • 24-hour auto-delete
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={FileText}
              title="Import from LinkedIn"
              description="No login. Public profile only. We extract everything for you instantly."
              delay={100}
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={Check}
              title="ATS Validated"
              description="DOCX + selectable PDF. No tables, no icons. Built for recruiters."
              delay={200}
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
            />
            <FeatureCard
              icon={Briefcase}
              title="Job Aligned"
              description="Optional: Target a job title for automatic keyword alignment."
              delay={300}
              gradient="bg-gradient-to-br from-violet-500 to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? "200ms" : "0ms",
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Get your ATS-ready resume in just 3 simple steps
              </p>
            </div>

            <div className="space-y-10">
              <StepCard
                number="1"
                title="Paste Your LinkedIn URL"
                description="Share your public profile link. We don't need your password or any credentials. It takes 30 seconds."
                delay={300}
              />
              <StepCard
                number="2"
                title="We Extract & Optimize"
                description="Our AI pulls your profile data and rewrites it with ATS-optimized formatting, action verbs, and strategic keywords."
                delay={450}
              />
              <StepCard
                number="3"
                title="Review & Download"
                description="See your resume in our editor, make tweaks if needed, and download as DOCX or PDF. It's ready to send!"
                delay={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "300ms" : "0ms",
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by Job Seekers
            </h2>
            <p className="text-lg text-muted-foreground">
              Thousands of professionals land interviews with ResumeFit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Sarah Chen", role: "Product Manager" },
              { name: "Marcus Johnson", role: "Software Engineer" },
              { name: "Emma Rodriguez", role: "Data Scientist" },
              { name: "Alex Kim", role: "UX Designer" },
              { name: "Jordan Miller", role: "Frontend Developer" },
              { name: "Casey Thompson", role: "Project Manager" },
            ].map((testimonial, i) => (
              <TestimonialCard
                key={i}
                name={testimonial.name}
                title={testimonial.role}
                delay={200 + i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? "200ms" : "0ms",
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose ResumeFit
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Generate in minutes, not hours. Your resume ready while coffee brews.",
                  color: "from-yellow-500 to-orange-600",
                  delay: 200,
                },
                {
                  icon: Eye,
                  title: "Total Transparency",
                  desc: "See exactly what changed and why. No black-box AI surprises.",
                  color: "from-blue-500 to-cyan-600",
                  delay: 300,
                },
                {
                  icon: Shield,
                  title: "Privacy First",
                  desc: "Public profiles only. No passwords. Auto-delete in 24 hours.",
                  color: "from-green-500 to-emerald-600",
                  delay: 400,
                },
                {
                  icon: TrendingUp,
                  title: "ATS Optimized",
                  desc: "Every template tested. Pass ATS checks. Get interviews.",
                  color: "from-purple-500 to-pink-600",
                  delay: 500,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`group relative p-8 rounded-2xl bg-white border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${feature.delay}ms` : "0ms",
                  }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "400ms" : "0ms",
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to land more interviews?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your ATS-ready resume is just 60 seconds away. No credit card. No BS.
            </p>
            <Link to="/generator">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-base h-12 px-10 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Building Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
