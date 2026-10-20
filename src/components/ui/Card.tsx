import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export const Card = ({
  className,
  padded = true,
  children,
  ...props
}: CardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
      padded && "p-5 sm:p-6",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
