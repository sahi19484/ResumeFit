import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ResumeData, createDefaultResumeData, generateAISuggestions } from "@/lib/resume-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Plus, Trash2 } from "lucide-react";

interface ResumeDataFormProps {
  initialData?: ResumeData;
  onSubmit: (data: ResumeData) => void;
  jobTitle?: string;
}

export default function ResumeDataForm({
  initialData,
  onSubmit,
  jobTitle = "Professional",
}: ResumeDataFormProps) {
  const [data, setData] = useState<ResumeData>(
    initialData || createDefaultResumeData("", jobTitle)
  );
  const [showSuggestions, setShowSuggestions] = useState(true);
  const suggestions = generateAISuggestions(jobTitle);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setData({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  const handleSummaryChange = (value: string) => {
    setData({ ...data, professional_summary: value });
  };

  const handleExperienceChange = (id: string, field: string, value: any) => {
    setData({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      current: false,
      description: "",
      achievements: [""],
    };
    setData({
      ...data,
      experience: [...data.experience, newExp],
    });
  };

  const handleRemoveExperience = (id: string) => {
    setData({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const handleAchievementChange = (expId: string, idx: number, value: string) => {
    const updated = data.experience.map((exp) =>
      exp.id === expId
        ? {
            ...exp,
            achievements: exp.achievements.map((a, i) => (i === idx ? value : a)),
          }
        : exp
    );
    setData({ ...data, experience: updated });
  };

  const handleAddAchievement = (expId: string) => {
    const updated = data.experience.map((exp) =>
      exp.id === expId
        ? { ...exp, achievements: [...exp.achievements, ""] }
        : exp
    );
    setData({ ...data, experience: updated });
  };

  const handleRemoveAchievement = (expId: string, idx: number) => {
    const updated = data.experience.map((exp) =>
      exp.id === expId
        ? {
            ...exp,
            achievements: exp.achievements.filter((_, i) => i !== idx),
          }
        : exp
    );
    setData({ ...data, experience: updated });
  };

  const applySuggestionSummary = () => {
    setData({
      ...data,
      professional_summary: suggestions.professional_summary,
    });
  };

  const applySuggestionSkills = () => {
    setData({ ...data, skills: suggestions.skills });
  };

  const handleSkillsChange = (value: string) => {
    setData({
      ...data,
      skills: value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    });
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="full-name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="full-name"
                  value={data.personal.full_name}
                  onChange={(e) =>
                    handlePersonalInfoChange("full_name", e.target.value)
                  }
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={data.personal.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                  placeholder="john@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={data.personal.phone}
                  onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                  }
                  placeholder="(555) 123-4567"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  value={data.personal.location}
                  onChange={(e) =>
                    handlePersonalInfoChange("location", e.target.value)
                  }
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="linkedin" className="text-sm font-medium">
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin"
                  value={data.personal.linkedin_url || ""}
                  onChange={(e) =>
                    handlePersonalInfoChange("linkedin_url", e.target.value)
                  }
                  placeholder="linkedin.com/in/yourprofile"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Professional Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Professional Summary
              </h3>
              {showSuggestions && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={applySuggestionSummary}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Suggestion
                </Button>
              )}
            </div>

            {showSuggestions && (
              <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">
                  💡 AI-Generated Suggestion for {jobTitle}:
                </p>
                <p className="text-sm text-foreground">
                  {suggestions.professional_summary}
                </p>
              </div>
            )}

            <Label htmlFor="summary" className="text-sm font-medium">
              Write or improve your professional summary
            </Label>
            <Textarea
              id="summary"
              value={data.professional_summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="Describe your professional background, achievements, and goals..."
              className="mt-2 min-h-32 resize-none"
            />
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-4">
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <Card key={exp.id} className="p-6 border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    Experience #{idx + 1}
                  </h3>
                  {data.experience.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Job Title *</Label>
                    <Input
                      value={exp.job_title}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "job_title", e.target.value)
                      }
                      placeholder="Senior Software Engineer"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "company", e.target.value)
                      }
                      placeholder="Tech Company Inc."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "location", e.target.value)
                      }
                      placeholder="San Francisco, CA"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm font-medium">Start Date</Label>
                      <Input
                        type="month"
                        value={exp.start_date}
                        onChange={(e) =>
                          handleExperienceChange(exp.id, "start_date", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">End Date</Label>
                      <Input
                        type="month"
                        value={exp.end_date}
                        onChange={(e) =>
                          handleExperienceChange(exp.id, "end_date", e.target.value)
                        }
                        disabled={exp.current}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, "current", e.target.checked)
                      }
                      className="rounded"
                    />
                    <Label
                      htmlFor={`current-${exp.id}`}
                      className="text-sm font-medium"
                    >
                      I currently work here
                    </Label>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Key Achievements *
                    </Label>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, aidx) => (
                        <div key={aidx} className="flex gap-2">
                          <Textarea
                            value={achievement}
                            onChange={(e) =>
                              handleAchievementChange(
                                exp.id,
                                aidx,
                                e.target.value
                              )
                            }
                            placeholder="Led team to deliver X project, increasing Y by Z%"
                            className="min-h-20 resize-none text-sm"
                          />
                          {exp.achievements.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleRemoveAchievement(exp.id, aidx)
                              }
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-fit"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddAchievement(exp.id)}
                      className="mt-2 gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Achievement
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <Button
              size="lg"
              variant="outline"
              onClick={handleAddExperience}
              className="w-full gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Experience
            </Button>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Skills
              </h3>
              {showSuggestions && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={applySuggestionSkills}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Suggestions
                </Button>
              )}
            </div>

            {showSuggestions && (
              <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">
                  💡 AI-Suggested Skills for {jobTitle}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.skills.slice(0, 8).map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-primary text-white px-2 py-1 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Label className="text-sm font-medium">
              Enter skills separated by commas
            </Label>
            <Textarea
              value={data.skills.join(", ")}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="JavaScript, React, Python, AWS, Project Management, Leadership"
              className="mt-2 min-h-24 resize-none"
            />

            {data.skills.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Your skills:
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <Button
        size="lg"
        onClick={() => onSubmit(data)}
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 font-semibold"
      >
        Continue to Resume Preview
      </Button>
    </div>
  );
}
