import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScoreMeter } from "@/components/ScoreMeter";
import { SuggestionChip } from "@/components/SuggestionChip";
import ResumePreview from "@/components/ResumePreview";
import ResumeDataForm from "@/components/ResumeDataForm";
import { Save, Download, Eye, Code, ArrowLeft } from "lucide-react";
import { starterPacks } from "@/lib/starter-packs";
import { ResumeData, resumeDataToText } from "@/lib/resume-utils";
import {
  UserVersion,
  ResumeSection,
  ATSParseResult,
  BulletSuggestion,
} from "@/lib/types";

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTemplate =
    (location.state as any)?.selectedTemplate || "Modern Clean";
  const initialResumeData = (location.state as any)?.resumeData as ResumeData | undefined;

  const [resumeData, setResumeData] = useState<ResumeData | null>(initialResumeData || null);
  const [viewMode, setViewMode] = useState<"form" | "preview">("form");
  const [template, setTemplate] = useState<"modern" | "classic" | "minimalist">("modern");
  const [lastSaved, setLastSaved] = useState(new Date());


  // Get starter pack for current template
  const currentStarterPack = starterPacks.find((pack) =>
    selectedTemplate
      .toLowerCase()
      .includes(pack.industry.split(" ")[0].toLowerCase()),
  );

  // Mock ATS Parser
  const parseResume = (content: string): ATSParseResult => {
    const lines = content.split("\n").filter((line) => line.trim());
    const emailMatch = content.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    const phoneMatch = content.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);

    // Simple score calculation
    let score = 60;
    if (emailMatch) score += 5;
    if (phoneMatch) score += 5;
    if (content.toLowerCase().includes("linkedin")) score += 5;
    if (lines.length > 5) score += 5;
    if (content.includes("%") || /\$[\d,]+/.test(content)) score += 10;

    // Extract keywords
    const keywords = [
      "product",
      "management",
      "strategy",
      "leadership",
      "data",
      "growth",
    ].filter((k) => content.toLowerCase().includes(k));

    // Detect gaps
    const gaps = [];
    if (!emailMatch) gaps.push("Missing email address");
    if (!phoneMatch) gaps.push("Missing phone number");
    if (!content.toLowerCase().includes("linkedin"))
      gaps.push("No LinkedIn URL found");
    if (!content.includes("%") && !/\$[\d,]+/.test(content))
      gaps.push("Consider adding quantifiable metrics");

    return {
      fields: {
        email: emailMatch?.[0],
        phone: phoneMatch?.[0],
      },
      sections: resumeSections.map((section) => ({
        name: section.name,
        content: section.content,
        keywords: keywords,
      })),
      keywords,
      score: Math.min(100, score),
      gaps,
      warnings: [],
    };
  };

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Parse resume on content change
  useEffect(() => {
    const fullContent = resumeSections.map((s) => s.content).join("\n");
    const result = parseResume(fullContent);
    setAtsParseResult(result);
    setAtsScore(result.score);

    // Load suggestions from starter pack
    if (currentStarterPack) {
      setSuggestions(currentStarterPack.bullets);
    }
  }, [resumeSections, currentStarterPack]);

  const handleSectionChange = (sectionId: string, newContent: string) => {
    setResumeSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, content: newContent }
          : section,
      ),
    );
  };

  const handleApplySuggestion = (suggestion: BulletSuggestion) => {
    const experienceSection = resumeSections.find((s) => s.id === "experience");
    if (experienceSection) {
      const updatedContent =
        experienceSection.content + "\n• " + suggestion.text;
      handleSectionChange("experience", updatedContent);
      setAppliedSuggestions([...appliedSuggestions, suggestion.id]);
    }
  };

  const handleDownload = () => {
    const fullContent = resumeSections
      .map((section) => `${section.name}\n${section.content}`)
      .join("\n\n");
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(fullContent),
    );
    element.setAttribute("download", "resume.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const currentSection = resumeSections.find((s) => s.id === selectedSectionId);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Resume Editor
              </h1>
              <p className="text-sm text-muted-foreground">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Two-Pane Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Pane: Editor */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden">
                {/* Section Tabs */}
                <div className="flex border-b border-border/50 overflow-x-auto">
                  {resumeSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSectionId(section.id)}
                      className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                        selectedSectionId === section.id
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </div>

                {/* Editor Area */}
                {currentSection && (
                  <div className="p-6">
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      {currentSection.name}
                    </label>
                    <textarea
                      value={currentSection.content}
                      onChange={(e) =>
                        handleSectionChange(currentSection.id, e.target.value)
                      }
                      className="w-full h-64 p-4 border border-border/50 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder={`Edit your ${currentSection.name.toLowerCase()} here...`}
                    />
                  </div>
                )}
              </div>

              {/* Live Preview Toggle */}
              <div className="bg-white rounded-xl border border-border/50 p-4 flex gap-2">
                <button
                  onClick={() => setViewMode("visual")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === "visual"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Visual
                </button>
                <button
                  onClick={() => setViewMode("parsed")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === "parsed"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Parsed Text
                </button>
              </div>

              {/* Preview Area */}
              <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">
                  {viewMode === "visual"
                    ? "Visual Preview"
                    : "How ATS Sees Your Resume"}
                </h3>
                {viewMode === "visual" ? (
                  <div className="prose prose-sm max-w-none">
                    {resumeSections.map((section) => (
                      <div key={section.id} className="mb-4">
                        <h4 className="font-bold text-sm uppercase tracking-wide mb-2">
                          {section.name}
                        </h4>
                        <div className="text-xs text-muted-foreground whitespace-pre-wrap">
                          {section.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    {atsParseResult && (
                      <>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Extracted Fields
                          </h4>
                          <div className="space-y-1 text-muted-foreground">
                            {atsParseResult.fields.email && (
                              <p>📧 Email: {atsParseResult.fields.email}</p>
                            )}
                            {atsParseResult.fields.phone && (
                              <p>📱 Phone: {atsParseResult.fields.phone}</p>
                            )}
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <h4 className="font-semibold text-foreground mb-2">
                            Keywords Found
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {atsParseResult.keywords.map((keyword) => (
                              <span
                                key={keyword}
                                className="bg-green-100 text-green-800 px-2 py-1 rounded"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Pane: Insights & Suggestions */}
            <div className="space-y-6">
              {/* ATS Score */}
              <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                <ScoreMeter score={atsScore} label="Live ATS Score" />
              </div>

              {/* Keyword Gaps */}
              {atsParseResult && atsParseResult.gaps.length > 0 && (
                <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {atsParseResult.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-600 font-bold mt-0.5">
                          ⚠
                        </span>
                        <span className="text-muted-foreground">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions from Starter Pack */}
              {suggestions.length > 0 && (
                <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-4">
                    Suggested Bullets
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {suggestions.slice(0, 5).map((suggestion) => (
                      <SuggestionChip
                        key={suggestion.id}
                        text={suggestion.text}
                        type="bullet"
                        category={suggestion.category}
                        impact={suggestion.impact}
                        applied={appliedSuggestions.includes(suggestion.id)}
                        onApply={() => handleApplySuggestion(suggestion)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords to Include */}
              {currentStarterPack && (
                <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-3">
                    Industry Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStarterPack.keywords.slice(0, 8).map((keyword) => (
                      <span
                        key={keyword}
                        className="bg-primary/10 text-primary px-2.5 py-1 rounded text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
