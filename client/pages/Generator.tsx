import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle, Check, ChevronRight, Loader2 } from "lucide-react";

type Step = "idle" | "extracting" | "optimizing" | "building" | "complete";

export default function Generator() {
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState("");

  const steps = [
    { id: "extracting", label: "Extracting profile..." },
    { id: "optimizing", label: "Optimizing content..." },
    { id: "building", label: "Building resume..." },
    { id: "complete", label: "Ready to download!" },
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

    // Simulate processing
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
      <div className="flex flex-col min-h-screen bg-background">
        <Header />

        <div className="flex-1 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                  <Check className="w-8 h-8 text-accent" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your resume is ready!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your ATS-optimized resume has been generated and is ready to download.
              </p>

              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Download Options
                </h2>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 h-12"
                  >
                    Download as DOCX (Recommended)
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 border-2"
                  >
                    Download as PDF (ATS-Safe)
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  💡 <strong>Pro tip:</strong> DOCX is preferred for ATS parsing. PDF preserves layout.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-2xl font-bold text-primary mb-1">High</p>
                  <p className="text-sm text-muted-foreground">ATS Compatibility</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-2xl font-bold text-accent mb-1">8/10</p>
                  <p className="text-sm text-muted-foreground">Match Score</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-8">
                ✓ No images • ✓ Standard formatting • ✓ ATS-ready structure
              </p>

              <div className="space-y-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 border-2"
                >
                  Edit Resume
                </Button>
                <button
                  onClick={handleStartOver}
                  className="text-primary hover:text-primary/80 transition font-medium"
                >
                  Start Over
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
              Generate Your ATS Resume
            </h1>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Paste your LinkedIn URL below. We'll extract and optimize your profile for ATS parsing.
            </p>

            {/* Progress Steps */}
            {step !== "idle" && (
              <div className="mb-12">
                <div className="space-y-3">
                  {steps.map((s) => {
                    const isComplete = steps.findIndex((x) => x.id === step) > steps.findIndex((x) => x.id === s.id);
                    const isCurrent = s.id === step;

                    return (
                      <div
                        key={s.id}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isComplete
                              ? "bg-accent text-white"
                              : isCurrent
                              ? "bg-primary"
                              : "bg-muted"
                          }`}
                        >
                          {isComplete ? (
                            <Check className="w-3 h-3" />
                          ) : isCurrent ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : null}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isCurrent
                              ? "text-primary"
                              : isComplete
                              ? "text-muted-foreground"
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
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* LinkedIn URL Field */}
                  <div>
                    <Label htmlFor="linkedin-url" className="text-base font-semibold mb-2 block">
                      LinkedIn Profile URL
                    </Label>
                    <Input
                      id="linkedin-url"
                      type="url"
                      placeholder="https://www.linkedin.com/in/username"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      className="h-12 text-base border-2 border-border focus:border-primary"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Paste a public profile — we don't require sign-in.
                    </p>
                  </div>

                  {/* Job Title Field */}
                  <div>
                    <Label htmlFor="job-title" className="text-base font-semibold mb-2 block">
                      Target Job Title (Optional)
                    </Label>
                    <Input
                      id="job-title"
                      type="text"
                      placeholder="e.g., Frontend Engineer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="h-12 text-base border-2 border-border focus:border-primary"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Add a job title to align keywords automatically.
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90 h-12"
                    >
                      Generate Resume
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Your data is processed securely and deleted after 24 hours for free users.
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
