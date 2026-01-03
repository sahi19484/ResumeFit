// Template and Resume Editor Types

export interface Template {
  id: string;
  name: string;
  industry_tags: string[];
  style: "modern" | "classic" | "clinical" | "creative" | "results" | "academic" | "technical" | "executive";
  description: string;
  preview_image: string;
  baseline_ats_score: number;
  template_json: TemplateLayout;
  font_family: string;
  color_tokens: ColorTokens;
  gradient?: string;
  gradient_dark?: string;
}

export interface TemplateLayout {
  sections: TemplateSection[];
  spacing: number;
  margins: { top: number; right: number; bottom: number; left: number };
  fontSizeScale: number;
}

export interface TemplateSection {
  id: string;
  name: string;
  label: string;
  required: boolean;
  placeholder: string;
  maxLines?: number;
}

export interface ColorTokens {
  primary: string;
  accent: string;
  neutral_900: string;
  neutral_700: string;
  muted: string;
  gold: string;
  background: string;
  text: string;
  text_secondary: string;
}

export interface StarterPack {
  id: string;
  industry: string;
  icon?: string;
  description: string;
  bullets: BulletSuggestion[];
  keywords: string[];
  sample_metrics: MetricSample[];
  recommended_sections: string[];
  color_theme?: string;
}

export interface BulletSuggestion {
  id: string;
  category: string;
  text: string;
  metric?: string;
  impact?: "high" | "medium" | "low";
}

export interface MetricSample {
  metric: string;
  value: string;
  context: string;
}

export interface UserVersion {
  id: string;
  user_id: string;
  template_id: string;
  title: string;
  content_html: string;
  content_sections: ResumeSection[];
  ats_score_history: { timestamp: number; score: number }[];
  last_saved: number;
  created_at: number;
  download_links?: {
    pdf?: string;
    docx?: string;
    text?: string;
  };
}

export interface ResumeSection {
  id: string;
  name: string;
  content: string;
  order: number;
  visible: boolean;
}

export interface ATSParseResult {
  fields: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    url?: string;
  };
  sections: {
    name: string;
    content: string;
    keywords: string[];
  }[];
  keywords: string[];
  score: number;
  gaps: string[];
  warnings: string[];
}

export interface SuggestionChipProps {
  text: string;
  type: "bullet" | "keyword" | "metric";
  category?: string;
  impact?: "high" | "medium" | "low";
  onApply: () => void;
}

export interface EditorState {
  userVersionId: string;
  templateId: string;
  sections: ResumeSection[];
  atsScore: number;
  lastSaved: number;
  isDirty: boolean;
  selectedSection?: string;
}
