import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import type { NavSection } from "../types/dashboard";

export const navSections: NavSection[] = [
  {
    title: "Panel",
    items: [
      { label: "Vista general", href: "/", icon: LayoutDashboard },
      { label: "Analíticas", href: "/analytics", icon: BarChart3 },
      { label: "Usuarios", href: "/users", icon: Users, badge: "8" },
    ],
  },
  {
    title: "Espacio de trabajo",
    items: [{ label: "Configuración", href: "/settings", icon: Settings }],
  },
];

export const navigationItems = navSections.flatMap((section) => section.items);
