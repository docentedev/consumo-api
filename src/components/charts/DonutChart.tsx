import type { DistributionItem } from "../../types/dashboard";
import { chartStrokeClasses } from "../../lib/chart-colors";
import { cn } from "../../lib/cn";

interface DonutChartProps {
  data: DistributionItem[];
  centerLabel: string;
  centerValue: string;
  className?: string;
}

const SIZE = 180;
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const DonutChart = ({
  data,
  centerLabel,
  centerValue,
  className,
}: DonutChartProps) => {
  const segments = data.map((item, index) => {
    const previousTotal = data
      .slice(0, index)
      .reduce((total, entry) => total + entry.value, 0);

    return {
      ...item,
      length: (item.value / 100) * CIRCUMFERENCE,
      dashOffset: -(previousTotal / 100) * CIRCUMFERENCE,
    };
  });

  return (
    <div className={cn("relative mx-auto h-44 w-44", className)}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={`${centerLabel}: ${centerValue}`}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth="16"
          className="stroke-slate-100 dark:stroke-slate-800"
        />
        {segments.map((item) => (
          <circle
            key={item.label}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth="16"
            strokeLinecap="butt"
            strokeDasharray={`${Math.max(0, item.length - 2)} ${CIRCUMFERENCE}`}
            strokeDashoffset={item.dashOffset}
            className={chartStrokeClasses[item.color]}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {centerValue}
        </span>
        <span className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          {centerLabel}
        </span>
      </div>
    </div>
  );
};
