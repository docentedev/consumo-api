import { useId, useState } from "react";
import type { PointerEvent } from "react";
import type { ChartPoint } from "../../types/dashboard";
import { cn } from "../../lib/cn";

interface AreaChartProps {
  data: ChartPoint[];
  primaryLabel: string;
  secondaryLabel: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

const GRID_LINES = [6, 28, 50, 72, 94];

const smoothPath = (points: Point[]): string =>
  points.reduce((path, point, index, all) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = all[index - 1];
    const middleX = (previous.x + point.x) / 2;
    return `${path} C ${middleX} ${previous.y}, ${middleX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

export const AreaChart = ({
  data,
  primaryLabel,
  secondaryLabel,
  prefix = "$",
  suffix = "k",
  className,
}: AreaChartProps) => {
  const gradientId = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const maxValue = Math.max(
    ...data.map((point) => Math.max(point.primary, point.secondary)),
  );
  const max = Math.max(1, Math.ceil(maxValue * 1.12));
  const yLabels = [max, max * 0.75, max * 0.5, max * 0.25, 0];

  const toX = (index: number) =>
    data.length <= 1 ? 0 : (index / (data.length - 1)) * 100;
  const toY = (value: number) => 94 - (value / max) * 88;

  const primaryPoints = data.map((point, index) => ({
    x: toX(index),
    y: toY(point.primary),
  }));
  const secondaryPoints = data.map((point, index) => ({
    x: toX(index),
    y: toY(point.secondary),
  }));

  const primaryLine = smoothPath(primaryPoints);
  const secondaryLine = smoothPath(secondaryPoints);
  const primaryArea = `${primaryLine} L 100 100 L 0 100 Z`;

  const formatAxis = (value: number) =>
    `${prefix}${Number.isInteger(value) ? value : value.toFixed(1)}${suffix}`;

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setActiveIndex(Math.round(ratio * (data.length - 1)));
  };

  const activePoint = activeIndex !== null ? data[activeIndex] : null;
  const activeX = activeIndex !== null ? toX(activeIndex) : 0;
  const activeY = activePoint ? toY(activePoint.primary) : 0;

  return (
    <div className={cn("flex gap-3", className)}>
      <div
        aria-hidden
        className="flex h-52 shrink-0 flex-col justify-between text-[10px] tabular-nums text-slate-400 sm:h-64 dark:text-slate-500"
      >
        {yLabels.map((label) => (
          <span key={label}>{formatAxis(label)}</span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="relative h-52 sm:h-64"
          onPointerLeave={() => setActiveIndex(null)}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full touch-pan-y"
            role="img"
            aria-label={`Evolución de ${primaryLabel} y ${secondaryLabel}`}
            onPointerMove={handlePointerMove}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {GRID_LINES.map((line) => (
              <line
                key={line}
                x1="0"
                x2="100"
                y1={line}
                y2={line}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <path d={primaryArea} fill={`url(#${gradientId})`} />

            <path
              d={secondaryLine}
              fill="none"
              className="stroke-emerald-400/80"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={primaryLine}
              fill="none"
              className="stroke-indigo-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {activePoint && activeIndex !== null ? (
            <>
              <span
                className="pointer-events-none absolute h-full w-px bg-slate-200 dark:bg-slate-700"
                style={{ left: `${activeX}%` }}
              />
              <span
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-indigo-500 shadow dark:border-slate-900"
                style={{ left: `${activeX}%`, top: `${activeY}%` }}
              />
              <div
                className="pointer-events-none absolute z-10 w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                style={{
                  left: `${Math.min(88, Math.max(12, activeX))}%`,
                  top: `${activeY}%`,
                  transform: "translate(-50%, -118%)",
                }}
              >
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-400">
                  {activePoint.label}
                </p>
                <div className="mt-1.5 space-y-1 text-xs">
                  <p className="flex items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {primaryLabel}
                    </span>
                    <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                      {formatAxis(activePoint.primary)}
                    </span>
                  </p>
                  <p className="flex items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {secondaryLabel}
                    </span>
                    <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                      {formatAxis(activePoint.secondary)}
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-2 flex justify-between gap-1 text-[10px] text-slate-400 dark:text-slate-500">
          {data.map((point, index) => (
            <span
              key={`${point.label}-${index}`}
              className={cn(
                "flex-1 text-center tabular-nums",
                index % 2 !== 0 && "hidden sm:block",
              )}
            >
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
