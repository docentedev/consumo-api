import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { KpiCard } from "../../types/dashboard";
import { cn } from "../../lib/cn";
import { Card } from "./Card";
import { Sparkline } from "../charts/Sparkline";

interface StatCardProps {
  kpi: KpiCard;
  className?: string;
  footer?: ReactNode;
}

const accentClasses: Record<KpiCard["accent"], string> = {
  indigo:
    "bg-indigo-50 text-indigo-600 ring-indigo-600/10 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20",
  emerald:
    "bg-emerald-50 text-emerald-600 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
  amber:
    "bg-amber-50 text-amber-600 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
  rose: "bg-rose-50 text-rose-600 ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
};

export const StatCard = ({ kpi, className, footer }: StatCardProps) => {
  const Icon = kpi.icon;
  const isUp = kpi.trend === "up";

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {kpi.label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[26px] dark:text-white">
            {kpi.value}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset",
            accentClasses[kpi.accent],
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              isUp
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400",
            )}
          >
            {isUp ? (
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
            )}
            {kpi.change}
          </span>
          <p className="mt-1 truncate text-xs text-slate-400 dark:text-slate-500">
            {kpi.helper}
          </p>
        </div>
        <Sparkline data={kpi.sparkline} color={kpi.accent} className="h-10 w-24" />
      </div>

      {footer ? <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">{footer}</div> : null}
    </Card>
  );
};
