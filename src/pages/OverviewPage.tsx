import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  DollarSign,
  Download,
  MousePointerClick,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import type { ActivityStatus, KpiCard } from "../types/dashboard";
import {
  activities,
  quarterlyGoals,
  revenueSeries,
  trafficChannels,
} from "../data/dashboard";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import type { BadgeTone } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { StatCard } from "../components/ui/StatCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { AreaChart } from "../components/charts/AreaChart";
import { DonutChart } from "../components/charts/DonutChart";
import { cn } from "../lib/cn";
import { chartBarClasses } from "../lib/chart-colors";

type Range = "7d" | "30d" | "90d";

const kpis: KpiCard[] = [
  {
    label: "Ingresos totales",
    value: "$84.254",
    change: "12,5 %",
    trend: "up",
    helper: "vs. $74.890 el mes pasado",
    icon: DollarSign,
    sparkline: [12, 18, 15, 22, 19, 26, 24, 31],
    accent: "indigo",
  },
  {
    label: "Usuarios activos",
    value: "12.480",
    change: "8,2 %",
    trend: "up",
    helper: "1.042 nuevos esta semana",
    icon: Users,
    sparkline: [8, 10, 9, 13, 15, 14, 17, 19],
    accent: "emerald",
  },
  {
    label: "Tasa de conversión",
    value: "3,84 %",
    change: "0,4 %",
    trend: "down",
    helper: "2.418 sesiones convertidas",
    icon: MousePointerClick,
    sparkline: [18, 17, 19, 16, 15, 17, 14, 13],
    accent: "amber",
  },
  {
    label: "Ticket promedio",
    value: "$68,40",
    change: "4,1 %",
    trend: "up",
    helper: "1.231 transacciones",
    icon: CreditCard,
    sparkline: [10, 12, 11, 14, 16, 15, 18, 20],
    accent: "rose",
  },
];

const statusTone: Record<ActivityStatus, BadgeTone> = {
  completado: "success",
  pendiente: "warning",
  fallido: "danger",
};

const statusLabel: Record<ActivityStatus, string> = {
  completado: "Completado",
  pendiente: "Pendiente",
  fallido: "Fallido",
};

export const OverviewPage = () => {
  const [range, setRange] = useState<Range>("30d");
  const series = revenueSeries[range];

  const ranges: Array<{ value: Range; label: string }> = [
    { value: "7d", label: "7 días" },
    { value: "30d", label: "30 días" },
    { value: "90d", label: "90 días" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vista general"
        description="Un resumen en tiempo real del rendimiento de tu producto, tus usuarios y tus ingresos."
        actions={
          <>
            <Button variant="secondary" leftIcon={<CalendarDays className="h-4 w-4" />}>
              Últimos 30 días
            </Button>
            <Button leftIcon={<Download className="h-4 w-4" />}>Exportar</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Rendimiento de ingresos
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Ingresos frente a gastos operativos del periodo
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
              {ranges.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setRange(item.value)}
                  className={cn(
                    "cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-semibold transition",
                    range === item.value
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              {series.primaryLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {series.secondaryLabel}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <ArrowUpRight className="h-3 w-3" aria-hidden />
              +18,2 % vs. periodo anterior
            </span>
          </div>

          <div className="mt-6">
            <AreaChart
              data={series.data}
              primaryLabel={series.primaryLabel}
              secondaryLabel={series.secondaryLabel}
            />
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Tráfico por canal
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Sesiones de los últimos 30 días
              </p>
            </div>
            <Badge tone="success" dot>
              En vivo
            </Badge>
          </div>

          <div className="flex flex-1 items-center justify-center py-5">
            <DonutChart
              data={trafficChannels}
              centerValue="24,8k"
              centerLabel="Visitas"
            />
          </div>

          <ul className="space-y-3">
            {trafficChannels.map((channel) => (
              <li
                key={channel.label}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      chartBarClasses[channel.color],
                    )}
                  />
                  {channel.label}
                </span>
                <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                  {channel.value} %
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Link
              href="/analytics"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
            >
              Ver analíticas completas
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2" padded={false}>
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Actividad reciente
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Últimos movimientos del equipo en el espacio de trabajo
              </p>
            </div>
            <Link
              href="/users"
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
            >
              Ver todo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-500">
                  <th className="px-5 py-2.5 font-semibold sm:px-6">Usuario</th>
                  <th className="px-3 py-2.5 font-semibold">Acción</th>
                  <th className="px-3 py-2.5 font-semibold">Estado</th>
                  <th className="px-5 py-2.5 text-right font-semibold sm:px-6">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          name={activity.user.name}
                          initials={activity.user.initials}
                          color={activity.user.color}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                            {activity.user.name}
                          </p>
                          <p className="max-w-44 truncate text-[10px] text-slate-400 dark:text-slate-500">
                            {activity.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {activity.action}
                      </p>
                      <p className="max-w-48 truncate text-[10px] text-slate-400 dark:text-slate-500">
                        {activity.target}
                      </p>
                    </td>
                    <td className="px-3 py-3.5">
                      <Badge tone={statusTone[activity.status]} dot>
                        {statusLabel[activity.status]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right text-[11px] whitespace-nowrap text-slate-400 sm:px-6 dark:text-slate-500">
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Objetivos del trimestre
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Progreso al 20 de octubre
              </p>
            </div>
            <Badge tone="violet">Q4 2026</Badge>
          </div>

          <div className="mt-6 flex-1 space-y-5">
            {quarterlyGoals.map((goal) => (
              <div key={goal.label}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    {goal.label}
                  </p>
                  <span className="text-[11px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                    {goal.percentage} %
                  </span>
                </div>
                <ProgressBar
                  value={goal.percentage}
                  color={goal.color}
                  label={goal.label}
                />
                <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-indigo-50 p-3.5 dark:bg-indigo-500/10">
            <p className="text-[11px] font-semibold text-indigo-900 dark:text-indigo-200">
              Vas 18 % por encima del ritmo esperado
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-indigo-700/80 dark:text-indigo-300/80">
              Mantén la inversión en canales orgánicos para alcanzar la meta
              antes de fin de trimestre.
            </p>
          </div>
        </Card>
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-600">
        Datos de demostración · Los indicadores se actualizan cada 15 minutos ·{" "}
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Sincronización activa
        </span>
      </p>
    </div>
  );
};
