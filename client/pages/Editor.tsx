import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreMeter } from "@/components/ScoreMeter";
import { SuggestionChip } from "@/components/SuggestionChip";
import { starterPacks, mockParseResume } from "@/lib/starter-packs";
import { EditorState, ResumeSection, ATSParseResult } from "@/lib/types";
import { Save, Download, Eye, AlertCircle } from "lucide-react";

export default function Editor() {
  const location = useLocation();
  const [editorState, setEditorState] = useState<EditorState>({
    userVersionId: `draft-${Date.now()}`,
    templateId: location.state?.selectedTemplate || "template-1",
    sections: [
      { id: "name", name: "name", content: "SARAH ANDERSON", order: 1, visible: true },
      { id: "title", name: "title", content: "Product Manager | Tech & Innovation", order: 2, visible: true },
      {
        id: "contact",
        name: "contact",
        content: "sarah.anderson@email.com | (555) 123-4567 | San Francisco, CA",
        order: 3,
        visible: true,
      },
      {
        id: "summary",
        name: "Professional Summary",
        content:
          "Results-driven Product Manager with 8+ years of experience leading product strategy and cross-functional teams. Proven expertise in data-driven decision-making and launching successful products.",
        order: 4,
        visible: true,
      },
      {
        id: "experience",
        name: "Experience",
        content: "Senior Product Manager - TechCorp Inc. (2021-Present)\n• Led product strategy for 3 platforms serving 2M+ users\n• Increased user engagement by 45% through feature optimization\n• Managed cross-functional team of 12 engineers and designers",
        order: 5,
        visible: true,
      },
      {
        id: "education",
        name: "Education",
        content: "MBA in Business Administration - Stanford University (2019)\nBS in Computer Science - UC Berkeley (2015)",
        order: 6,
        visible: true,
      },
    ],
    atsScore: 72,
    lastSaved: Date.now(),
    isDirty: false,
  });

  const [atsResult, setAtsResult] = useState<ATSParseResult | null>(null);
  const [starterPack, setStarterPack] = useState(starterPacks[0]);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Parse resume content for ATS
  const updateATSPreview = useCallback(() => {
    const htmlContent = generateHTML(editorState.sections);
    const result = mockParseResume(htmlContent);
    setAtsResult(result);
  }, [editorState.sections]);

  // Update ATS preview when sections change
  useEffect(() => {
    updateATSPreview();
  }, [updateATSPreview]);

  // Autosave every 10 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(async () => {
      if (editorState.isDirty) {
        await saveVersion();
      }
    }, 10000);

    return () => clearInterval(autoSaveInterval);
  }, [editorState]);

  const updateSection = (sectionId: string, content: string) => {
    setEditorState((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, content } : s
      ),
      isDirty: true,
    }));
  };

  const applySuggestion = (bulletId: string, bulletText: string, sectionName: string) => {
    const section = editorState.sections.find((s) => s.name === sectionName);
    if (section) {
      const newContent = section.content + "\n• " + bulletText;
      updateSection(section.id, newContent);
      setAppliedSuggestions((prev) => new Set([...prev, bulletId]));
    }
  };

  const saveVersion = async () => {
    setIsSaving(true);
    // Mock save operation
    await new Promise((resolve) => setTimeout(resolve, 500));
    setEditorState((prev) => ({
      ...prev,
      lastSaved: Date.now(),
      isDirty: false,
    }));
    setIsSaving(false);
  };

  const generateHTML = (sections: ResumeSection[]): string => {
    return sections
      .filter((s) => s.visible)
      .map((s) => {
        if (s.name === "name")
          return `<h1>${s.content}</h1>`;
        if (s.name === "title")
          return `<p>${s.content}</p>`;
        return `<h2>${s.name}</h2><p>${s.content.replace(/\n/g, "</p><p>")}</p>`;
      })
      .join("\n");
  };

  const exportToPDF = () => {
    const htmlContent = generateHTML(editorState.sections);
    // Mock PDF generation
    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    const printWindow = window.open("", "", "height=400,width=600");
    printWindow?.document.write(element.innerHTML);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1">
        {/* Toolbar */}
        <div className="border-b bg-muted/50 sticky top-16 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold">Resume Editor</h1>
              <div className="text-sm text-muted-foreground">
                Last saved: {new Date(editorState.lastSaved).toLocaleTimeString()}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="md:hidden"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" size="sm" onClick={saveVersion} disabled={!editorState.isDirty || isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" onClick={exportToPDF} className="bg-gradient-to-r from-primary to-primary/80">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Pane: Canvas Editor */}
            <div className={`${showPreview ? "hidden" : ""} md:col-span-7 md:block`}>
              <Card className="p-6 space-y-6 bg-white">
                <div className="space-y-4">
                  {editorState.sections.map((section) => (
                    <div key={section.id} className="space-y-2">
                      {section.name !== "name" && section.name !== "title" && (
                        <label className="text-sm font-semibold text-foreground capitalize">
                          {section.name}
                        </label>
                      )}
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, e.target.value)}
                        className={`w-full border rounded-lg p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary ${
                          section.name === "name" ? "text-2xl font-bold" : ""
                        } ${section.name === "title" ? "text-lg font-semibold" : ""}`}
                        rows={section.name === "experience" || section.name === "education" ? 6 : 2}
                        placeholder={`Enter ${section.name}...`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Pane: Insights & Suggestions */}
            <div className={`${!showPreview ? "hidden" : ""} md:col-span-5 md:block`}>
              <div className="space-y-6">
                {/* ATS Score Section */}
                <Card className="p-6">
                  <ScoreMeter score={atsResult?.score || 72} label="ATS Compatibility Score" />
                </Card>

                {/* Warnings & Gaps */}
                {atsResult && (atsResult.warnings.length > 0 || atsResult.gaps.length > 0) && (
                  <Card className="p-6 space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      Issues to Fix
                    </h3>

                    {atsResult.gaps.map((gap, i) => (
                      <div key={i} className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                        • {gap}
                      </div>
                    ))}

                    {atsResult.warnings.map((warning, i) => (
                      <div key={i} className="text-sm text-red-700 bg-red-50 p-2 rounded">
                        • {warning}
                      </div>
                    ))}
                  </Card>
                )}

                {/* Suggestions Tab */}
                <Card className="p-6">
                  <Tabs defaultValue="bullets" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="bullets">Bullets</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="bullets" className="space-y-3 mt-4">
                      <p className="text-xs text-muted-foreground">
                        Suggestions from {starterPack.industry} starter pack
                      </p>
                      {starterPack.bullets.slice(0, 3).map((bullet) => (
                        <SuggestionChip
                          key={bullet.id}
                          text={bullet.text}
                          type="bullet"
                          category={bullet.category}
                          impact={bullet.impact}
                          applied={appliedSuggestions.has(bullet.id)}
                          onApply={() =>
                            applySuggestion(bullet.id, bullet.text, "experience")
                          }
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="keywords" className="space-y-3 mt-4">
                      <p className="text-xs text-muted-foreground">
                        Keywords to improve ATS matching
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {starterPack.keywords.slice(0, 8).map((keyword, i) => (
                          <button
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="metrics" className="space-y-3 mt-4">
                      <p className="text-xs text-muted-foreground">
                        Sample metrics for your industry
                      </p>
                      {starterPack.sample_metrics.map((metric, i) => (
                        <div key={i} className="p-3 bg-muted rounded-lg">
                          <p className="font-semibold text-sm">{metric.metric}</p>
                          <p className="text-xl font-bold text-primary">{metric.value}</p>
                          <p className="text-xs text-muted-foreground">{metric.context}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </Card>

                {/* Parsed Text Preview */}
                <Card className="p-6 space-y-3">
                  <h3 className="font-semibold text-sm">How ATS Sees Your Resume</h3>
                  {atsResult && (
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-xs text-muted-foreground">NAME</p>
                        <p className="font-mono">{atsResult.fields.name}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-muted-foreground">EMAIL</p>
                        <p className="font-mono text-xs">{atsResult.fields.email}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-muted-foreground">PHONE</p>
                        <p className="font-mono text-xs">{atsResult.fields.phone}</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
