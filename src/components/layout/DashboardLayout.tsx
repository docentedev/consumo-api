import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { cn } from "../../lib/cn";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding] duration-300",
          collapsed ? "lg:pl-20" : "lg:pl-64",
        )}
      >
        <Header onOpenSidebar={() => setMobileOpen(true)} />

        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>

        <footer className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 border-t border-slate-200/70 px-4 py-5 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:border-slate-800/70 dark:text-slate-500">
          <span>© 2026 Nexo Analytics. Todos los derechos reservados.</span>
          <span className="flex items-center gap-3">
            <a href="#privacidad" className="transition hover:text-slate-600 dark:hover:text-slate-300">
              Privacidad
            </a>
            <a href="#soporte" className="transition hover:text-slate-600 dark:hover:text-slate-300">
              Soporte
            </a>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Sistemas operativos
            </span>
          </span>
        </footer>
      </div>
    </div>
  );
};
