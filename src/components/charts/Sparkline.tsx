import { useId } from "react";
import type { AvatarColor } from "../../types/dashboard";
import { chartTextClasses } from "../../lib/chart-colors";
import { cn } from "../../lib/cn";

interface SparklineProps {
  data: number[];
  color?: AvatarColor;
  className?: string;
}

export const Sparkline = ({
  data,
  color = "indigo",
  className,
}: SparklineProps) => {
  const gradientId = useId().replace(/:/g, "");
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => ({
    x: (index / Math.max(1, data.length - 1)) * 100,
    y: 30 - ((value - min) / range) * 24,
  }));

  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const area = `${line} L 100 32 L 0 32 Z`;

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className={cn("shrink-0", chartTextClasses[color], className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
