import { Layers3 } from "lucide-react";

export const LoadingScreen = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="relative">
      <span className="absolute inset-0 animate-ping rounded-2xl bg-indigo-500/20" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-600/25">
        <Layers3 className="h-7 w-7" aria-hidden />
      </span>
    </div>
    <p className="mt-6 text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-100">
      Nexo
    </p>
    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
      Preparando tu panel de control…
    </p>
    <div className="mt-6 flex gap-1.5">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500"
          style={{ animationDelay: `${index * 120}ms` }}
        />
      ))}
    </div>
  </div>
);
