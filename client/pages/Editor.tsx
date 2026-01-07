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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { starterPacks } from "@/lib/starter-packs";
import { ResumeData, resumeDataToText } from "@/lib/resume-utils";
import { generatePDFFromResume, generateDOCXFromResume } from "@/lib/pdf-utils";
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
  const initialResumeData = (location.state as any)?.resumeData as
    | ResumeData
    | undefined;

  const [resumeData, setResumeData] = useState<ResumeData | null>(
    initialResumeData || null,
  );
  const [viewMode, setViewMode] = useState<"form" | "preview">("form");
  const [template, setTemplate] = useState<"modern" | "classic" | "minimalist">(
    "modern",
  );
  const [lastSaved, setLastSaved] = useState(new Date());

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (data: ResumeData) => {
    setResumeData(data);
    setViewMode("preview");
  };

  const handleDownload = () => {
    if (!resumeData) return;
    generatePDFFromResume(resumeData, "resume.pdf");
  };

  const handleDownloadDOCX = () => {
    if (!resumeData) return;
    generateDOCXFromResume(resumeData, "resume.docx");
  };

  const handleDownloadText = () => {
    if (!resumeData) return;
    const textContent = resumeDataToText(resumeData);
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(textContent),
    );
    element.setAttribute("download", "resume.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Show form to create/edit resume if no data
  if (!resumeData || viewMode === "form") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header />

        <div className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-sm mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Edit Your Resume
                </h1>
                <p className="text-lg text-muted-foreground">
                  Customize every section to make your resume truly stand out.
                </p>
              </div>

              <ResumeDataForm
                initialData={resumeData || undefined}
                onSubmit={handleFormSubmit}
                jobTitle="Professional"
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Show preview mode
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Resume Preview
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setViewMode("form")}
                  className="flex items-center gap-2"
                >
                  Edit Resume
                </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleDownload}>
                        📄 PDF Format
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadDOCX}>
                        📝 Word Document
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownloadText}>
                        📋 Text Format
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Preview */}
              <div className="lg:col-span-3">
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setTemplate("modern")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      template === "modern"
                        ? "bg-primary text-white"
                        : "bg-white border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Modern
                  </button>
                  <button
                    onClick={() => setTemplate("classic")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      template === "classic"
                        ? "bg-primary text-white"
                        : "bg-white border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Classic
                  </button>
                  <button
                    onClick={() => setTemplate("minimalist")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      template === "minimalist"
                        ? "bg-primary text-white"
                        : "bg-white border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Minimalist
                  </button>
                </div>

                <ResumePreview
                  resume={resumeData}
                  template={template}
                  onDownload={handleDownload}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm sticky top-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Resume Details
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">
                        {resumeData.personal.full_name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium text-xs">
                        {resumeData.personal.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sections:</span>
                      <span className="font-medium">
                        {resumeData.experience.length + 2}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Skills:</span>
                      <span className="font-medium">
                        {resumeData.skills.length}
                      </span>
                    </div>
                  </div>

                  <div className="border-t my-4" />

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <span>✓</span>
                      <span>ATS-Optimized</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Professional Format</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Ready to Submit</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
