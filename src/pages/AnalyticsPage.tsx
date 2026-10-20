import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Download,
  Eye,
  MousePointerClick,
  Timer,
  TrendingUp,
} from "lucide-react";
import type { KpiCard } from "../types/dashboard";
import {
  deviceDistribution,
  funnelSteps,
  revenueSeries,
  topPages,
  trafficChannels,
  trafficSources,
} from "../data/dashboard";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { AreaChart } from "../components/charts/AreaChart";
import { BarChart } from "../components/charts/BarChart";
import { DonutChart } from "../components/charts/DonutChart";
import { cn } from "../lib/cn";
import { chartBarClasses } from "../lib/chart-colors";

type Range = "7d" | "30d" | "90d";

const kpis: KpiCard[] = [
  {
    label: "Visitas únicas",
    value: "248.320",
    change: "14,2 %",
    trend: "up",
    helper: "frente a 217.4k anteriores",
    icon: Eye,
    sparkline: [12, 16, 15, 20, 19, 24, 23, 28],
    accent: "indigo",
  },
  {
    label: "Tasa de conversión",
    value: "3,84 %",
    change: "0,4 %",
    trend: "down",
    helper: "2.418 conversiones totales",
    icon: MousePointerClick,
    sparkline: [18, 17, 19, 16, 15, 17, 14, 13],
    accent: "rose",
  },
  {
    label: "Duración media",
    value: "4m 12s",
    change: "6,8 %",
    trend: "up",
    helper: "Sesiones más profundas",
    icon: Timer,
    sparkline: [9, 11, 10, 13, 12, 15, 14, 17],
    accent: "amber",
  },
  {
    label: "Leads calificados",
    value: "1.024",
    change: "9,1 %",
    trend: "up",
    helper: "38 % del total de leads",
    icon: TrendingUp,
    sparkline: [6, 8, 7, 10, 12, 11, 14, 16],
    accent: "emerald",
  },
];

const rangeLabels: Array<{ value: Range; label: string }> = [
  { value: "7d", label: "7 días" },
  { value: "30d", label: "30 días" },
  { value: "90d", label: "90 días" },
];

const formatNumber = (value: number): string =>
  new Intl.NumberFormat("es-CL").format(value);

export const AnalyticsPage = () => {
  const [range, setRange] = useState<Range>("30d");
  const [channel, setChannel] = useState("Todos");
  const [device, setDevice] = useState("Todos");

  const baseSeries = revenueSeries[range];
  const analyticsData = baseSeries.data.map((point) => ({
    label: point.label,
    primary: Number((point.primary * 9.2).toFixed(1)),
    secondary: Number((point.secondary * 1.6).toFixed(1)),
  }));

  const previousStep = (index: number) =>
    index === 0 ? null : funnelSteps[index - 1].value;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analíticas"
        description="Explora el comportamiento de tus visitantes, la efectividad de tus canales y el recorrido hacia la conversión."
        actions={
          <>
            <Button variant="secondary" leftIcon={<CalendarDays className="h-4 w-4" />}>
              Comparar periodos
            </Button>
            <Button leftIcon={<Download className="h-4 w-4" />}>Exportar CSV</Button>
          </>
        }
      />

      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Filtros del reporte
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Ajusta el periodo y el origen de los datos analizados
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              {rangeLabels.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setRange(item.value)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:flex-none",
                    range === item.value
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <select
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              aria-label="Canal"
              className="h-9 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {["Todos", "Orgánico", "Directo", "Social", "Referidos"].map((option) => (
                <option key={option} value={option}>
                  Canal: {option}
                </option>
              ))}
            </select>

            <select
              value={device}
              onChange={(event) => setDevice(event.target.value)}
              aria-label="Dispositivo"
              className="h-9 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {["Todos", "Escritorio", "Móvil", "Tablet"].map((option) => (
                <option key={option} value={option}>
                  Dispositivo: {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Visitas y conversiones
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Evolución del tráfico · {rangeLabels.find((item) => item.value === range)?.label}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Visitas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Conversiones
            </span>
          </div>
        </div>

        <div className="mt-6">
          <AreaChart
            data={analyticsData}
            primaryLabel="Visitas"
            secondaryLabel="Conversiones"
            prefix=""
            suffix="k"
          />
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Sesiones por fuente
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Principales orígenes de tráfico
              </p>
            </div>
            <Badge tone="info">Acumulado</Badge>
          </div>
          <BarChart data={trafficSources} />
        </Card>

        <Card>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Dispositivos
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Cómo acceden tus usuarios
              </p>
            </div>
            <Badge tone="neutral">30 días</Badge>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            <DonutChart
              data={deviceDistribution}
              centerValue="24,8k"
              centerLabel="Sesiones"
              className="h-40 w-40"
            />

            <ul className="w-full max-w-52 space-y-3">
              {deviceDistribution.map((item) => (
                <li key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className={cn("h-2.5 w-2.5 rounded-full", chartBarClasses[item.color])} />
                      {item.label}
                    </span>
                    <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                      {item.value} %
                    </span>
                  </div>
                  <ProgressBar value={item.value} color="indigo" size="sm" label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-center dark:border-slate-800">
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">58 %</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Escritorio</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">42 %</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Móvil + Tablet</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2" padded={false}>
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Páginas más visitadas
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Rendimiento de las rutas principales del producto
              </p>
            </div>
            <Badge tone="neutral">{channel}</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-500">
                  <th className="px-5 py-2.5 font-semibold sm:px-6">Página</th>
                  <th className="px-3 py-2.5 font-semibold">Vistas</th>
                  <th className="px-3 py-2.5 font-semibold">Cambio</th>
                  <th className="px-5 py-2.5 text-right font-semibold sm:px-6">Rebote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {topPages.map((page) => {
                  const positive = page.change >= 0;
                  return (
                    <tr key={page.path} className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                      <td className="px-5 py-3.5 sm:px-6">
                        <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {page.path}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                        {page.views}
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 text-[11px] font-semibold",
                            positive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400",
                          )}
                        >
                          {positive ? (
                            <ArrowUpRight className="h-3 w-3" aria-hidden />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" aria-hidden />
                          )}
                          {positive ? "+" : ""}
                          {page.change} %
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right text-[11px] tabular-nums text-slate-400 sm:px-6 dark:text-slate-500">
                        {page.bounce}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Embudo de conversión
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Del primer clic a la compra
            </p>
          </div>

          <div className="space-y-4">
            {funnelSteps.map((step, index) => {
              const previous = previousStep(index);
              const conversion = previous
                ? Math.round((step.value / previous) * 100)
                : null;

              return (
                <div key={step.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {index + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold tabular-nums text-slate-900 dark:text-white">
                      {formatNumber(step.value)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      style={{ width: `${step.percentage}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                    <span>{step.percentage} % del total</span>
                    {conversion !== null ? <span>{conversion} % del paso anterior</span> : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/50">
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
              Caída principal detectada
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
              Entre registros y activación se pierde el 39 % de los usuarios.
              Revisa el onboarding para mejorar este tramo.
            </p>
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {trafficChannels.map((channelItem) => (
          <Badge key={channelItem.label} tone="neutral" className="gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", chartBarClasses[channelItem.color])} />
            {channelItem.label}: {channelItem.value} %
          </Badge>
        ))}
      </div>
    </div>
  );
};
