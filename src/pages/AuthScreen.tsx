import {
  ArrowRight,
  BarChart3,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/Button";

interface AuthScreenProps {
  onSignIn: () => void;
  error?: string | null;
}

const benefits = [
  {
    icon: ShieldCheck,
    title: "Acceso federado y seguro",
    description: "Autenticación gestionada con AWS Cognito y verificación de sesión.",
  },
  {
    icon: BarChart3,
    title: "Métricas en tiempo real",
    description: "Visualiza ingresos, tráfico y conversiones en un solo lugar.",
  },
  {
    icon: Users,
    title: "Trabajo en equipo",
    description: "Roles y permisos claros para cada miembro de tu organización.",
  },
];

export const AuthScreen = ({ onSignIn, error }: AuthScreenProps) => (
  <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_45%)]" />

      <div className="relative flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <Layers3 className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-tight">Nexo</p>
          <p className="text-[11px] text-slate-400">Analytics Suite</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-indigo-200 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Inteligencia de producto, sin ruido
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight xl:text-[42px]">
          Decisiones más claras.
          <br />
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            Crecimiento medible.
          </span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Centraliza tus indicadores, entiende a tus usuarios y convierte los datos
          en acciones concretas desde un panel diseñado para equipos exigentes.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-slate-400">Ingresos del trimestre</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">$84.254</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] font-semibold text-emerald-300">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              +18,2 %
            </span>
          </div>
          <div className="mt-4 flex h-16 items-end gap-1.5">
            {[32, 45, 38, 52, 48, 62, 58, 74, 69, 82, 78, 94].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t bg-gradient-to-t from-indigo-500/40 to-indigo-300/90"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>Jul</span>
            <span>Ago</span>
            <span>Sep</span>
            <span>Oct</span>
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-6 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <LockKeyhole className="h-3.5 w-3.5" aria-hidden />
          Cifrado de extremo a extremo
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          SSO corporativo
        </span>
      </div>
    </div>

    <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-600/25">
            <Layers3 className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              Nexo
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Analytics Suite
            </p>
          </div>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
          Panel de control
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Inicia sesión con tu cuenta corporativa para acceder a tus tableros,
          reportes y equipos.
        </p>

        {error ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
            <p className="font-semibold">No pudimos completar el acceso</p>
            <p className="mt-0.5 leading-relaxed opacity-90">{error}</p>
          </div>
        ) : null}

        <Button
          onClick={onSignIn}
          className="mt-6 w-full"
          leftIcon={<LockKeyhole className="h-4 w-4" />}
        >
          Iniciar sesión con SSO
          <ArrowRight className="ml-auto h-4 w-4" aria-hidden />
        </Button>

        <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">
          Serás redirigido al proveedor de identidad de tu organización. No
          almacenamos tus credenciales.
        </p>

        <div className="my-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Todo incluido
          </span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <ul className="space-y-3.5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <li key={benefit.title} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                    {benefit.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-[10px] text-slate-400 dark:text-slate-600">
          Al continuar aceptas los{" "}
          <a href="#terminos" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400">
            Términos de servicio
          </a>{" "}
          y la{" "}
          <a href="#privacidad" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400">
            Política de privacidad
          </a>
          .
        </p>
      </div>
    </div>
  </div>
);
