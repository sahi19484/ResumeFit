import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle, Check, ChevronRight, Loader2, Sparkles } from "lucide-react";

type Step = "idle" | "extracting" | "optimizing" | "building" | "complete";

export default function Generator() {
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    { id: "extracting", label: "Extracting profile...", icon: "📥" },
    { id: "optimizing", label: "Optimizing content...", icon: "✨" },
    { id: "building", label: "Building resume...", icon: "🔨" },
    { id: "complete", label: "Ready to download!", icon: "🎉" },
  ];

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes("linkedin.com");
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!linkedInUrl.trim()) {
      setError("Please enter your LinkedIn profile URL");
      return;
    }

    if (!validateUrl(linkedInUrl)) {
      setError("Please enter a valid LinkedIn profile URL");
      return;
    }

    setStep("extracting");
    setTimeout(() => setStep("optimizing"), 2000);
    setTimeout(() => setStep("building"), 4000);
    setTimeout(() => setStep("complete"), 6000);
  };

  const handleStartOver = () => {
    setStep("idle");
    setLinkedInUrl("");
    setJobTitle("");
    setError("");
  };

  if (step === "complete") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header />

        <div className="flex-1 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success animation */}
              <div className="mb-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-accent/30 to-primary/30 animate-pulse" />
                </div>
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-accent to-primary mb-6 shadow-xl">
                  <Check className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Your resume is ready!
              </h1>
              <p className="text-lg text-muted-foreground mb-12">
                Your ATS-optimized resume has been generated and is ready to download. Let's get you interviews! 🚀
              </p>

              <div className="bg-white rounded-2xl border border-border/50 shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Download Your Resume
                </h2>

                <div className="space-y-3 mb-6">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    ⬇️ Download as DOCX (Recommended)
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    ⬇️ Download as PDF (ATS-Safe)
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  💡 <strong>Why DOCX?</strong> Better for ATS parsing. PDF preserves beautiful layout.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6 hover:border-primary/40 transition-colors">
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1">High</p>
                  <p className="text-sm text-muted-foreground font-medium">ATS Score</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 p-6 hover:border-accent/40 transition-colors">
                  <p className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mb-1">8/10</p>
                  <p className="text-sm text-muted-foreground font-medium">Match Score</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-8 text-sm text-muted-foreground">
                <span>✓ No images</span>
                <span>•</span>
                <span>✓ Standard fonts</span>
                <span>•</span>
                <span>✓ ATS-ready</span>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  ✏️ Edit Resume
                </Button>
                <button
                  onClick={handleStartOver}
                  className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm"
                >
                  Create Another Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div
              className={`text-center mb-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI-Powered Resume Generator
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Generate Your ATS Resume
              </h1>
              <p className="text-lg text-muted-foreground">
                Paste your LinkedIn URL. We'll extract, optimize, and build your ATS-ready resume in minutes.
              </p>
            </div>

            {/* Progress Steps */}
            {step !== "idle" && (
              <div className="mb-12">
                <div className="space-y-3">
                  {steps.map((s, idx) => {
                    const stepIndex = steps.findIndex((x) => x.id === step);
                    const currentIndex = steps.findIndex((x) => x.id === s.id);
                    const isComplete = stepIndex > currentIndex;
                    const isCurrent = s.id === step;

                    return (
                      <div
                        key={s.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                          isCurrent
                            ? "bg-primary/5 border-primary/40 shadow-md"
                            : isComplete
                            ? "bg-accent/5 border-accent/30"
                            : "bg-muted/30 border-border/50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white transition-all duration-300 ${
                            isComplete
                              ? "bg-gradient-to-r from-accent to-accent/80"
                              : isCurrent
                              ? "bg-gradient-to-r from-primary to-primary/80"
                              : "bg-muted-foreground/50"
                          }`}
                        >
                          {isComplete ? (
                            "✓"
                          ) : isCurrent ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : null}
                        </div>
                        <span
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            isCurrent
                              ? "text-primary"
                              : isComplete
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Form */}
            {step === "idle" && (
              <Card className="p-8 border-border/50 shadow-lg rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* LinkedIn URL Field */}
                  <div className="group">
                    <Label htmlFor="linkedin-url" className="text-base font-bold mb-3 block text-foreground">
                      LinkedIn Profile URL
                    </Label>
                    <div className="relative">
                      <Input
                        id="linkedin-url"
                        type="url"
                        placeholder="https://www.linkedin.com/in/yourname"
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                        className="h-12 text-base border-2 border-border/50 focus:border-primary/60 group-hover:border-border rounded-xl transition-colors duration-300 bg-background/50"
                      />
                      {linkedInUrl && validateUrl(linkedInUrl) && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Paste your public profile — no sign-in needed. Your data stays private.
                    </p>
                  </div>

                  {/* Job Title Field */}
                  <div className="group">
                    <Label htmlFor="job-title" className="text-base font-bold mb-3 block text-foreground">
                      Target Job Title <span className="text-muted-foreground font-normal">(Optional)</span>
                    </Label>
                    <Input
                      id="job-title"
                      type="text"
                      placeholder="e.g., Senior Frontend Engineer, Product Manager"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="h-12 text-base border-2 border-border/50 focus:border-primary/60 group-hover:border-border rounded-xl transition-colors duration-300 bg-background/50"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Help us align keywords to your target role. This makes your resume even stronger.
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 animate-in fade-in">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Generate My Resume
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center font-medium">
                    🔒 Your data is encrypted and deleted after 24 hours. No spam ever.
                  </p>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
