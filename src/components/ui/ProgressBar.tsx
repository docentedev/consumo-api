import { cn } from "../../lib/cn";

type ProgressColor = "indigo" | "emerald" | "amber" | "rose";

interface ProgressBarProps {
  value: number;
  color?: ProgressColor;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}

const colorClasses: Record<ProgressColor, string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

export const ProgressBar = ({
  value,
  color = "indigo",
  size = "md",
  label,
  className,
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label}
      className={cn(
        "w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
        size === "sm" ? "h-1.5" : "h-2",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", colorClasses[color])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
