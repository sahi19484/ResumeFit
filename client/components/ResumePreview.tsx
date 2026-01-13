import { ResumeData } from "@/lib/resume-utils";
import { Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumePreviewProps {
  resume: ResumeData;
  template?: "modern" | "classic" | "minimalist";
  onDownload?: () => void;
}

export default function ResumePreview({
  resume,
  template = "modern",
  onDownload,
}: ResumePreviewProps) {
  return (
    <div className="w-full animate-scale-in">
      {/* Preview Header */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">
          Resume Preview
        </h3>
        {onDownload && (
          <Button
            size="sm"
            onClick={onDownload}
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        )}
      </div>

      {/* Resume Document */}
      <div className="resume-container bg-white rounded-xl shadow-lg border border-border/50 p-8 md:p-12 max-w-4xl stagger bg-gradient-to-br from-primary/10 to-accent/10">
        {template === "modern" && <ModernTemplate resume={resume} />}
        {template === "classic" && <ClassicTemplate resume={resume} />}
        {template === "minimalist" && <MinimalistTemplate resume={resume} />}
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .resume-container {
            box-shadow: none;
            border: none;
            border-radius: 0;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
}

function ModernTemplate({ resume }: { resume: ResumeData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-primary pb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {resume.personal.full_name}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && (
            <>
              <span>•</span>
              <span>{resume.personal.phone}</span>
            </>
          )}
          {resume.personal.location && (
            <>
              <span>•</span>
              <span>{resume.personal.location}</span>
            </>
          )}
          {resume.personal.linkedin_url && (
            <>
              <span>•</span>
              <span>{resume.personal.linkedin_url}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.professional_summary && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide border-l-4 border-primary pl-3">
            Professional Summary
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {resume.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wide border-l-4 border-primary pl-3">
            Experience
          </h2>
          <div className="space-y-5">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-sm font-bold text-foreground">
                    {exp.job_title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {exp.start_date} – {exp.current ? "Present" : exp.end_date}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="flex-shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wide border-l-4 border-primary pl-3">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-sm font-bold text-foreground">
                    {edu.degree}
                    {edu.field_of_study && ` in ${edu.field_of_study}`}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {edu.graduation_date}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  {edu.school}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
                {edu.details && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide border-l-4 border-primary pl-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ClassicTemplate({ resume }: { resume: ResumeData }) {
  return (
    <div className="space-y-4 font-serif">
      {/* Header */}
      <div className="text-center border-b border-foreground pb-4">
        <h1 className="text-3xl font-bold text-foreground">
          {resume.personal.full_name}
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs text-muted-foreground">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && <span>|</span>}
          {resume.personal.phone && <span>{resume.personal.phone}</span>}
          {resume.personal.location && <span>|</span>}
          {resume.personal.location && <span>{resume.personal.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.professional_summary && (
        <section>
          <h2 className="text-sm font-bold text-foreground uppercase mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {resume.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-foreground uppercase mb-2">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between">
                  <span className="font-bold">{exp.job_title}</span>
                  <span>
                    {exp.start_date} – {exp.current ? "Present" : exp.end_date}
                  </span>
                </div>
                <div className="font-semibold italic text-muted-foreground">
                  {exp.company}, {exp.location}
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-1 ml-4 space-y-0.5">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-foreground uppercase mb-2">
            Education
          </h2>
          <div className="space-y-2 text-xs">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <span className="font-bold">
                    {edu.degree}
                    {edu.field_of_study && ` in ${edu.field_of_study}`}
                  </span>
                  <span>{edu.graduation_date}</span>
                </div>
                <div className="font-semibold text-muted-foreground">
                  {edu.school}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-foreground uppercase mb-2">
            Skills
          </h2>
          <p className="text-xs text-muted-foreground">
            {resume.skills.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}

function MinimalistTemplate({ resume }: { resume: ResumeData }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {resume.personal.full_name}
        </h1>
        <div className="text-xs text-muted-foreground mt-1 space-x-2">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && <span>•</span>}
          {resume.personal.phone && <span>{resume.personal.phone}</span>}
          {resume.personal.location && <span>•</span>}
          {resume.personal.location && <span>{resume.personal.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.professional_summary && (
        <div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {resume.professional_summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div>
          <div className="font-bold text-sm text-foreground mb-3">
            EXPERIENCE
          </div>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline gap-2 mb-0.5">
                  <span className="font-semibold">{exp.job_title}</span>
                  <span className="text-muted-foreground">
                    {exp.start_date} – {exp.current ? "Present" : exp.end_date}
                  </span>
                </div>
                <div className="text-muted-foreground mb-1">{exp.company}</div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground flex gap-2"
                      >
                        <span>–</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div>
          <div className="font-bold text-sm text-foreground mb-2">
            EDUCATION
          </div>
          <div className="space-y-2 text-xs">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between gap-2">
                  <span className="font-semibold">{edu.school}</span>
                  <span className="text-muted-foreground">
                    {edu.graduation_date}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {edu.degree}
                  {edu.field_of_study && ` in ${edu.field_of_study}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <div className="font-bold text-sm text-foreground mb-2">SKILLS</div>
          <div className="text-xs text-muted-foreground">
            {resume.skills.join(" • ")}
          </div>
        </div>
      )}
    </div>
  );
}
