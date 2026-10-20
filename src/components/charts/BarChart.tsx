import type { SourceItem } from "../../types/dashboard";
import { chartBarClasses } from "../../lib/chart-colors";
import { cn } from "../../lib/cn";

interface BarChartProps {
  data: SourceItem[];
  valueLabel?: string;
  className?: string;
}

const formatValue = (value: number): string =>
  new Intl.NumberFormat("es-CL").format(value);

export const BarChart = ({
  data,
  valueLabel = "sesiones",
  className,
}: BarChartProps) => {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("space-y-4", className)} role="list" aria-label={`Distribución de ${valueLabel}`}>
      {data.map((item) => (
        <div key={item.label} role="listitem">
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {item.label}
            </span>
            <span className="tabular-nums text-slate-400 dark:text-slate-500">
              {formatValue(item.value)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={cn("h-full rounded-full transition-all duration-500", chartBarClasses[item.color])}
              style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
