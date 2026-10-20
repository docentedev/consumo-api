import type { AvatarColor } from "../types/dashboard";

export const chartBarClasses: Record<AvatarColor, string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  sky: "bg-sky-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
};

export const chartStrokeClasses: Record<AvatarColor, string> = {
  indigo: "stroke-indigo-500",
  emerald: "stroke-emerald-500",
  amber: "stroke-amber-500",
  sky: "stroke-sky-500",
  rose: "stroke-rose-500",
  violet: "stroke-violet-500",
};

export const chartTextClasses: Record<AvatarColor, string> = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  sky: "text-sky-600 dark:text-sky-400",
  rose: "text-rose-600 dark:text-rose-400",
  violet: "text-violet-600 dark:text-violet-400",
};
