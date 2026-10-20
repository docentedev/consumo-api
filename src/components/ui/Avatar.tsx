import type { AvatarColor } from "../../types/dashboard";
import { cn } from "../../lib/cn";

interface AvatarProps {
  name: string;
  initials: string;
  color?: AvatarColor;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const colorClasses: Record<AvatarColor, string> = {
  indigo:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  violet:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
};

const sizeClasses = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-xl",
};

export const Avatar = ({
  name,
  initials,
  color = "indigo",
  size = "md",
  className,
}: AvatarProps) => (
  <span
    title={name}
    aria-label={name}
    className={cn(
      "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide",
      colorClasses[color],
      sizeClasses[size],
      className,
    )}
  >
    {initials}
  </span>
);
