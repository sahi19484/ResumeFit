import { Zap, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export interface SuggestionChipProps {
  text: string;
  type: "bullet" | "keyword" | "metric";
  category?: string;
  impact?: "high" | "medium" | "low";
  onApply: () => void;
  applied?: boolean;
}

export function SuggestionChip({
  text,
  type,
  category,
  impact,
  onApply,
  applied = false,
}: SuggestionChipProps) {
  const getIcon = () => {
    switch (type) {
      case "bullet":
        return <TrendingUp className="w-4 h-4" />;
      case "keyword":
        return <Zap className="w-4 h-4" />;
      case "metric":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStyleClass = () => {
    if (applied) return "bg-primary/10 border-primary/30";
    switch (impact) {
      case "high":
        return "bg-green-50 border-green-200 hover:bg-green-100";
      case "medium":
        return "bg-yellow-50 border-yellow-200 hover:bg-yellow-100";
      case "low":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
      default:
        return "bg-muted border-border hover:bg-muted/80";
    }
  };

  const getTextColor = () => {
    if (applied) return "text-primary";
    switch (impact) {
      case "high":
        return "text-green-900";
      case "medium":
        return "text-yellow-900";
      case "low":
        return "text-blue-900";
      default:
        return "text-foreground";
    }
  };

  const getImpactBadge = () => {
    if (!impact) return null;
    const labels = { high: "High Impact", medium: "Medium Impact", low: "Low Impact" };
    return (
      <span
        className={`text-xs font-semibold px-2 py-1 rounded ${
          impact === "high"
            ? "bg-green-200 text-green-800"
            : impact === "medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-blue-200 text-blue-800"
        }`}
      >
        {labels[impact]}
      </span>
    );
  };

  return (
    <div
      className={`border rounded-lg p-3 space-y-2 transition-all duration-200 ${getStyleClass()}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-1">
          {category && <p className="text-xs font-semibold text-muted-foreground">{category}</p>}
          <p className={`text-sm font-medium leading-relaxed ${getTextColor()}`}>{text}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`${getTextColor()}`}>{getIcon()}</span>
          {!applied && (
            <Button
              size="sm"
              onClick={onApply}
              className="bg-primary hover:bg-primary/90 text-white text-xs h-8"
            >
              Apply
            </Button>
          )}
          {applied && <span className="text-xs font-semibold text-primary">✓ Added</span>}
        </div>
      </div>

      {impact && <div className="flex justify-between items-center">{getImpactBadge()}</div>}
    </div>
  );
}
