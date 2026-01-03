import { useEffect, useState } from "react";

interface ScoreMeterProps {
  score: number;
  maxScore?: number;
  label?: string;
  animated?: boolean;
  showPercentage?: boolean;
}

export function ScoreMeter({
  score,
  maxScore = 100,
  label = "ATS Score",
  animated = true,
  showPercentage = true,
}: ScoreMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    let current = 0;
    const target = score;
    const increment = target / 20;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setDisplayScore(Math.floor(current));
    }, 30);

    return () => clearInterval(interval);
  }, [score, animated]);

  const percentage = (displayScore / maxScore) * 100;
  const getColor = () => {
    if (displayScore >= 80) return "from-green-500 to-emerald-600";
    if (displayScore >= 60) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-rose-600";
  };

  const getBgColor = () => {
    if (displayScore >= 80) return "bg-green-500/20";
    if (displayScore >= 60) return "bg-yellow-500/20";
    return "bg-red-500/20";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {displayScore}
          {showPercentage && <span className="text-sm">/100</span>}
        </span>
      </div>

      <div className={`h-3 bg-muted rounded-full overflow-hidden ${getBgColor()}`}>
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>

      {displayScore >= 80 && (
        <p className="text-xs text-green-600 font-medium">✓ Great ATS compatibility</p>
      )}
      {displayScore >= 60 && displayScore < 80 && (
        <p className="text-xs text-yellow-600 font-medium">⚠ Room for improvement</p>
      )}
      {displayScore < 60 && (
        <p className="text-xs text-red-600 font-medium">✗ Needs optimization</p>
      )}
    </div>
  );
}
