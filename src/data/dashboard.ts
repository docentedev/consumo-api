import type {
  Activity,
  AppNotification,
  ChartDataSet,
  DistributionItem,
  FunnelStep,
  Goal,
  SourceItem,
  TeamUser,
  TopPage,
} from "../types/dashboard";

export const activities: Activity[] = [
  {
    id: "act-1",
    user: {
      name: "Valentina Rojas",
      email: "valentina.rojas@nexo.io",
      initials: "VR",
      color: "indigo",
    },
    action: "Actualizó el plan",
    target: "Growth · Empresa",
    status: "completado",
    date: "Hace 4 min",
  },
  {
    id: "act-2",
    user: {
      name: "Mateo Fernández",
      email: "mateo.fernandez@nexo.io",
      initials: "MF",
      color: "amber",
    },
    action: "Invitó a un miembro",
    target: "camila.torres@nexo.io",
    status: "pendiente",
    date: "Hace 22 min",
  },
  {
    id: "act-3",
    user: {
      name: "Camila Torres",
      email: "camila.torres@nexo.io",
      initials: "CT",
      color: "emerald",
    },
    action: "Exportó el reporte",
    target: "Ingresos Q4.csv",
    status: "completado",
    date: "Hace 1 h",
  },
  {
    id: "act-4",
    user: {
      name: "Sebastián Muñoz",
      email: "sebastian.munoz@nexo.io",
      initials: "SM",
      color: "sky",
    },
    action: "Intentó conectar",
    target: "API de facturación",
    status: "fallido",
    date: "Hace 2 h",
  },
  {
    id: "act-5",
    user: {
      name: "Isabella García",
      email: "isabella.garcia@nexo.io",
      initials: "IG",
      color: "rose",
    },
    action: "Publicó una nota",
    target: "Resumen semanal",
    status: "completado",
    date: "Hace 3 h",
  },
  {
    id: "act-6",
    user: {
      name: "Francisca López",
      email: "francisca.lopez@nexo.io",
      initials: "FL",
      color: "violet",
    },
    action: "Cambió los permisos",
    target: "Equipo de soporte",
    status: "completado",
    date: "Ayer",
  },
];

export const teamUsers: TeamUser[] = [
  {
    id: "usr-1",
    name: "Valentina Rojas",
    email: "valentina.rojas@nexo.io",
    initials: "VR",
    color: "indigo",
    role: "Administrador",
    status: "Activo",
    lastActive: "Hace 2 min",
  },
  {
    id: "usr-2",
    name: "Mateo Fernández",
    email: "mateo.fernandez@nexo.io",
    initials: "MF",
    color: "amber",
    role: "Editor",
    status: "Activo",
    lastActive: "Hace 18 min",
  },
  {
    id: "usr-3",
    name: "Camila Torres",
    email: "camila.torres@nexo.io",
    initials: "CT",
    color: "emerald",
    role: "Analista",
    status: "Activo",
    lastActive: "Hace 1 h",
  },
  {
    id: "usr-4",
    name: "Sebastián Muñoz",
    email: "sebastian.munoz@nexo.io",
    initials: "SM",
    color: "sky",
    role: "Visor",
    status: "Invitado",
    lastActive: "Invitación enviada",
  },
  {
    id: "usr-5",
    name: "Isabella García",
    email: "isabella.garcia@nexo.io",
    initials: "IG",
    color: "rose",
    role: "Editor",
    status: "Activo",
    lastActive: "Hace 3 h",
  },
  {
    id: "usr-6",
    name: "Tomás Silva",
    email: "tomas.silva@nexo.io",
    initials: "TS",
    color: "violet",
    role: "Analista",
    status: "Inactivo",
    lastActive: "Hace 12 días",
  },
  {
    id: "usr-7",
    name: "Francisca López",
    email: "francisca.lopez@nexo.io",
    initials: "FL",
    color: "indigo",
    role: "Visor",
    status: "Activo",
    lastActive: "Ayer",
  },
  {
    id: "usr-8",
    name: "Diego Herrera",
    email: "diego.herrera@nexo.io",
    initials: "DH",
    color: "emerald",
    role: "Administrador",
    status: "Activo",
    lastActive: "Ayer",
  },
];

export const revenueSeries: Record<"7d" | "30d" | "90d", ChartDataSet> = {
  "7d": {
    primaryLabel: "Ingresos",
    secondaryLabel: "Gastos",
    data: [
      { label: "Lun", primary: 9.4, secondary: 5.2 },
      { label: "Mar", primary: 11.2, secondary: 6.1 },
      { label: "Mié", primary: 10.1, secondary: 5.8 },
      { label: "Jue", primary: 13.8, secondary: 7.2 },
      { label: "Vie", primary: 15.4, secondary: 8.1 },
      { label: "Sáb", primary: 12.2, secondary: 6.4 },
      { label: "Dom", primary: 16.8, secondary: 7.9 },
    ],
  },
  "30d": {
    primaryLabel: "Ingresos",
    secondaryLabel: "Gastos",
    data: [
      { label: "01 Oct", primary: 11.2, secondary: 6.4 },
      { label: "05 Oct", primary: 14.8, secondary: 7.8 },
      { label: "09 Oct", primary: 13.1, secondary: 7.1 },
      { label: "13 Oct", primary: 18.4, secondary: 9.2 },
      { label: "17 Oct", primary: 16.9, secondary: 8.6 },
      { label: "21 Oct", primary: 21.3, secondary: 10.4 },
      { label: "25 Oct", primary: 19.8, secondary: 9.9 },
      { label: "30 Oct", primary: 24.6, secondary: 11.8 },
    ],
  },
  "90d": {
    primaryLabel: "Ingresos",
    secondaryLabel: "Gastos",
    data: [
      { label: "S1", primary: 12.4, secondary: 7.2 },
      { label: "S2", primary: 15.1, secondary: 8.1 },
      { label: "S3", primary: 13.8, secondary: 7.6 },
      { label: "S4", primary: 17.2, secondary: 9.4 },
      { label: "S5", primary: 16.1, secondary: 8.8 },
      { label: "S6", primary: 19.4, secondary: 10.2 },
      { label: "S7", primary: 18.2, secondary: 9.7 },
      { label: "S8", primary: 22.6, secondary: 11.4 },
      { label: "S9", primary: 21.1, secondary: 10.9 },
      { label: "S10", primary: 24.8, secondary: 12.2 },
      { label: "S11", primary: 23.4, secondary: 11.8 },
      { label: "S12", primary: 27.2, secondary: 13.1 },
    ],
  },
};

export const trafficChannels: DistributionItem[] = [
  { label: "Orgánico", value: 42, color: "indigo" },
  { label: "Directo", value: 28, color: "emerald" },
  { label: "Social", value: 18, color: "amber" },
  { label: "Referidos", value: 12, color: "rose" },
];

export const deviceDistribution: DistributionItem[] = [
  { label: "Escritorio", value: 58, color: "indigo" },
  { label: "Móvil", value: 34, color: "emerald" },
  { label: "Tablet", value: 8, color: "amber" },
];

export const trafficSources: SourceItem[] = [
  { label: "Google", value: 3200, color: "indigo" },
  { label: "Directo", value: 2100, color: "emerald" },
  { label: "X / Twitter", value: 1400, color: "amber" },
  { label: "LinkedIn", value: 980, color: "sky" },
  { label: "Newsletter", value: 640, color: "rose" },
];

export const topPages: TopPage[] = [
  { path: "/dashboard", views: "12.480", change: 12.4, bounce: "24,2 %" },
  { path: "/pricing", views: "8.240", change: 6.8, bounce: "31,5 %" },
  { path: "/blog/analytics", views: "6.910", change: -2.1, bounce: "42,8 %" },
  { path: "/docs", views: "5.320", change: 18.2, bounce: "18,9 %" },
  { path: "/integrations", views: "3.870", change: 4.5, bounce: "28,4 %" },
];

export const funnelSteps: FunnelStep[] = [
  { label: "Visitas", value: 24800, percentage: 100 },
  { label: "Registros", value: 11408, percentage: 46 },
  { label: "Activación", value: 6944, percentage: 28 },
  { label: "Compra", value: 2976, percentage: 12 },
];

export const quarterlyGoals: Goal[] = [
  {
    label: "Ingresos recurrentes",
    description: "$84.254 de $100.000",
    percentage: 84,
    color: "indigo",
  },
  {
    label: "Nuevos clientes",
    description: "62 de 100 cuentas",
    percentage: 62,
    color: "emerald",
  },
  {
    label: "Retención de usuarios",
    description: "91 % vs. meta de 95 %",
    percentage: 91,
    color: "amber",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "ntf-1",
    title: "Nuevo miembro en el equipo",
    description: "Camila Torres aceptó la invitación.",
    time: "Hace 12 min",
    unread: true,
  },
  {
    id: "ntf-2",
    title: "Reporte mensual disponible",
    description: "El resumen de octubre ya está listo.",
    time: "Hace 1 h",
    unread: true,
  },
  {
    id: "ntf-3",
    title: "Límite de API al 82 %",
    description: "Considera ampliar tu plan este mes.",
    time: "Hace 4 h",
    unread: false,
  },
];
