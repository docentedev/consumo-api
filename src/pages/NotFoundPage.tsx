import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "wouter";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
      <Compass className="h-8 w-8" aria-hidden />
    </span>
    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
      Error 404
    </p>
    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
      No encontramos esta página
    </h1>
    <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
      La ruta que buscas no existe o fue movida. Vuelve al panel para continuar
      explorando tus datos.
    </p>
    <Link
      href="/"
      className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-500"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Volver a la vista general
    </Link>
    <div className="mt-4">
      <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
        Ir a la página anterior
      </Button>
    </div>
  </div>
);
