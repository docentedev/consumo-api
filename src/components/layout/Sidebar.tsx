import {
  ChevronLeft,
  Layers3,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { navSections } from "../../data/navigation";
import { cn } from "../../lib/cn";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export const Sidebar = ({
  collapsed,
  mobileOpen,
  onClose,
  onToggleCollapse,
}: SidebarProps) => {
  const [location] = useLocation();

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-64",
        )}
        aria-label="Navegación principal"
      >
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-3 dark:border-slate-800/80">
          <Link
            href="/"
            onClick={onClose}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-1.5 py-1 transition hover:opacity-90",
              collapsed && "lg:justify-center",
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-600/25">
              <Layers3 className="h-5 w-5" aria-hidden />
            </span>
            <span className={cn("min-w-0", collapsed && "lg:hidden")}>
              <span className="block truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                Nexo
              </span>
              <span className="block truncate text-[11px] text-slate-400 dark:text-slate-500">
                Analytics Suite
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            className="hidden cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:inline-flex dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {navSections.map((section) => (
            <div key={section.title}>
              <p
                className={cn(
                  "mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500",
                  collapsed && "lg:hidden",
                )}
              >
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        title={collapsed ? item.label : undefined}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                          collapsed && "lg:justify-center lg:px-2",
                          active
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100",
                        )}
                      >
                        {active ? (
                          <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-indigo-500" />
                        ) : null}
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0 transition",
                            active
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300",
                          )}
                          aria-hidden
                        />
                        <span className={cn("truncate", collapsed && "lg:hidden")}>
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span
                            className={cn(
                              "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                              active
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                              collapsed && "lg:hidden",
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-3 dark:border-slate-800">
          <div
            className={cn(
              "relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white",
              collapsed && "lg:hidden",
            )}
          >
            <Sparkles className="absolute -right-2 -top-2 h-16 w-16 text-white/10" aria-hidden />
            <p className="text-xs font-semibold">Plan Pro</p>
            <p className="mt-1 text-[11px] leading-relaxed text-indigo-100">
              Desbloquea reportes avanzados y automatizaciones.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-white/25"
            >
              Mejorar plan
              <ChevronLeft className="h-3 w-3 rotate-180" aria-hidden />
            </button>
          </div>

          <div
            className={cn(
              "mt-3 flex items-center justify-between gap-2 px-2 text-[10px] text-slate-400 dark:text-slate-500",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <span className={cn(collapsed && "lg:hidden")}>v2.4.0</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className={cn(collapsed && "lg:hidden")}>Operativo</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
