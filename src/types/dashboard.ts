import type { LucideIcon } from "lucide-react";

export type TrendDirection = "up" | "down";
export type AvatarColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "sky"
  | "rose"
  | "violet";

export type ActivityStatus = "completado" | "pendiente" | "fallido";
export type UserRole = "Administrador" | "Editor" | "Analista" | "Visor";
export type UserStatus = "Activo" | "Invitado" | "Inactivo";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface Reactor {
  name: string;
  email: string;
  initials: string;
  color: AvatarColor;
}

export interface Activity {
  id: string;
  user: Reactor;
  action: string;
  target: string;
  status: ActivityStatus;
  date: string;
}

export interface TeamUser extends Reactor {
  id: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
}

export interface ChartPoint {
  label: string;
  primary: number;
  secondary: number;
}

export interface ChartDataSet {
  data: ChartPoint[];
  primaryLabel: string;
  secondaryLabel: string;
}

export interface DistributionItem {
  label: string;
  value: number;
  color: AvatarColor;
}

export interface SourceItem {
  label: string;
  value: number;
  color: AvatarColor;
}

export interface TopPage {
  path: string;
  views: string;
  change: number;
  bounce: string;
}

export interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
}

export interface Goal {
  label: string;
  description: string;
  percentage: number;
  color: "indigo" | "emerald" | "amber";
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: TrendDirection;
  helper: string;
  icon: LucideIcon;
  sparkline: number[];
  accent: "indigo" | "emerald" | "amber" | "rose";
}
