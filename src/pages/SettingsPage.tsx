import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  KeyRound,
  Laptop,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  Smartphone,
  Sun,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "react-oidc-context";
import type { ThemeMode } from "../context/theme-context";
import { useTheme } from "../hooks/useTheme";
import { getInitials } from "../lib/initials";
import { cn } from "../lib/cn";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Switch } from "../components/ui/Switch";

type SettingsTab = "profile" | "appearance" | "notifications" | "security";

interface TabItem {
  id: SettingsTab;
  label: string;
  description: string;
  icon: LucideIcon;
}

const tabs: TabItem[] = [
  {
    id: "profile",
    label: "Perfil",
    description: "Información personal y preferencias de la cuenta.",
    icon: UserRound,
  },
  {
    id: "appearance",
    label: "Apariencia",
    description: "Tema visual y cómo se muestra el panel.",
    icon: Palette,
  },
  {
    id: "notifications",
    label: "Notificaciones",
    description: "Elige qué avisos quieres recibir.",
    icon: Bell,
  },
  {
    id: "security",
    label: "Seguridad",
    description: "Contraseña, verificación en dos pasos y sesiones.",
    icon: ShieldCheck,
  },
];

const inputClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600";
const labelClass =
  "mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300";

interface NotificationSettings {
  weeklyReport: boolean;
  activity: boolean;
  mentions: boolean;
  product: boolean;
  billing: boolean;
}

interface SessionItem {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
  icon: LucideIcon;
}

const initialSessions: SessionItem[] = [
  {
    id: "session-1",
    device: "MacBook Pro · Chrome",
    location: "Santiago, CL",
    lastActive: "Ahora mismo",
    current: true,
    icon: Laptop,
  },
  {
    id: "session-2",
    device: "iPhone 15 · Safari",
    location: "Santiago, CL",
    lastActive: "Hace 2 horas",
    current: false,
    icon: Smartphone,
  },
  {
    id: "session-3",
    device: "Windows 11 · Edge",
    location: "Valparaíso, CL",
    lastActive: "Hace 3 días",
    current: false,
    icon: Monitor,
  },
];

const themeOptions: Array<{
  value: ThemeMode;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    value: "light",
    label: "Claro",
    description: "Interfaz luminosa y limpia.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Oscuro",
    description: "Ideal para ambientes con poca luz.",
    icon: Moon,
  },
  {
    value: "system",
    label: "Sistema",
    description: "Sigue la preferencia del dispositivo.",
    icon: Monitor,
  },
];

export const SettingsPage = () => {
  const auth = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const authEmail = auth.user?.profile.email ?? "usuario@nexo.io";
  const authName =
    auth.user?.profile.name ?? authEmail.split("@")[0] ?? "Usuario";

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [profile, setProfile] = useState({
    name: authName,
    email: authEmail,
    role: "Administrador",
    bio: "Responsable de producto y analítica. Enfocado en construir experiencias claras basadas en datos.",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      weeklyReport: true,
      activity: true,
      mentions: true,
      product: false,
      billing: true,
    });
  const [notificationsSaved, setNotificationsSaved] = useState(false);

  const [twoFactor, setTwoFactor] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.localStorage.getItem("nexo-reduce-motion") === "true",
  );
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions);

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reducedMotion);
    window.localStorage.setItem("nexo-reduce-motion", String(reducedMotion));
  }, [reducedMotion]);

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileSaved(true);
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password.current || !password.next) {
      setPasswordError("Completa todos los campos para actualizar la contraseña.");
      return;
    }
    if (password.next !== password.confirm) {
      setPasswordError("La nueva contraseña y su confirmación no coinciden.");
      return;
    }
    setPasswordError(null);
    setPasswordSaved(true);
    setPassword({ current: "", next: "", confirm: "" });
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotificationSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setNotificationsSaved(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        description="Gestiona tu cuenta, la apariencia del panel y la seguridad de tu espacio de trabajo."
      />

      <Card padded={false} className="overflow-hidden">
        <div className="grid lg:grid-cols-[240px_1fr]">
          <nav
            className="flex gap-1 overflow-x-auto border-b border-slate-100 p-3 lg:flex-col lg:border-b-0 lg:border-r dark:border-slate-800"
            aria-label="Secciones de configuración"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition lg:w-full",
                    active
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="p-5 sm:p-6 lg:p-8">
            <div className="mb-6 border-b border-slate-100 pb-5 dark:border-slate-800">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                {activeTabInfo.label}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {activeTabInfo.description}
              </p>
            </div>

            {activeTab === "profile" ? (
              <form onSubmit={handleProfileSubmit} className="max-w-2xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar
                    name={profile.name}
                    initials={getInitials(profile.name)}
                    color="indigo"
                    size="lg"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Foto de perfil
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      JPG o PNG de hasta 2 MB.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button variant="secondary" size="sm">
                        Cambiar foto
                      </Button>
                      <Button variant="ghost" size="sm">
                        Quitar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="profile-name" className={labelClass}>
                      Nombre completo
                    </label>
                    <input
                      id="profile-name"
                      value={profile.name}
                      onChange={(event) =>
                        setProfile((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="profile-email" className={labelClass}>
                      Correo electrónico
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      value={profile.email}
                      onChange={(event) =>
                        setProfile((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="profile-role" className={labelClass}>
                    Rol
                  </label>
                  <select
                    id="profile-role"
                    value={profile.role}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        role: event.target.value,
                      }))
                    }
                    className={cn(inputClass, "cursor-pointer")}
                  >
                    {["Administrador", "Editor", "Analista", "Visor"].map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="profile-bio" className={labelClass}>
                    Biografía
                  </label>
                  <textarea
                    id="profile-bio"
                    rows={3}
                    value={profile.bio}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        bio: event.target.value,
                      }))
                    }
                    className={cn(inputClass, "h-auto resize-none py-2.5")}
                  />
                  <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                    Se muestra en tu perfil público del equipo. Máximo 280 caracteres.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                  {profileSaved ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      Perfil actualizado correctamente.
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      Los cambios se aplican de inmediato.
                    </span>
                  )}
                  <Button type="submit" leftIcon={<Check className="h-4 w-4" />}>
                    Guardar cambios
                  </Button>
                </div>
              </form>
            ) : null}

            {activeTab === "appearance" ? (
              <div className="max-w-3xl space-y-6">
                <div>
                  <p className={labelClass}>Tema de la interfaz</p>
                  <div
                    className="mt-2 grid gap-3 sm:grid-cols-3"
                    role="radiogroup"
                    aria-label="Tema de la interfaz"
                  >
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const selected = theme === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setTheme(option.value)}
                          className={cn(
                            "cursor-pointer rounded-xl border p-2.5 text-left transition",
                            selected
                              ? "border-indigo-500 ring-2 ring-indigo-500/20"
                              : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600",
                          )}
                        >
                          <div
                            className={cn(
                              "h-20 overflow-hidden rounded-lg border p-2",
                              option.value === "light" &&
                                "border-slate-200 bg-white",
                              option.value === "dark" &&
                                "border-slate-700 bg-slate-900",
                              option.value === "system" &&
                                "border-slate-300 bg-gradient-to-r from-white via-slate-100 to-slate-900",
                            )}
                          >
                            <div className="flex h-full gap-1.5">
                              <div
                                className={cn(
                                  "w-1/4 rounded",
                                  option.value === "dark"
                                    ? "bg-slate-700"
                                    : "bg-slate-200",
                                )}
                              />
                              <div className="flex flex-1 flex-col gap-1">
                                <div
                                  className={cn(
                                    "h-2.5 w-2/3 rounded",
                                    option.value === "dark"
                                      ? "bg-slate-700"
                                      : "bg-slate-200",
                                  )}
                                />
                                <div
                                  className={cn(
                                    "flex-1 rounded",
                                    option.value === "dark"
                                      ? "bg-slate-800"
                                      : "bg-slate-100",
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-2.5 flex items-center gap-1.5">
                            <Icon className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" aria-hidden />
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                              {option.label}
                            </span>
                            {selected ? (
                              <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white">
                                <Check className="h-2.5 w-2.5" aria-hidden />
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
                      {resolvedTheme === "dark" ? (
                        <Moon className="h-4 w-4" aria-hidden />
                      ) : (
                        <Sun className="h-4 w-4" aria-hidden />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                        Tema {resolvedTheme === "dark" ? "oscuro" : "claro"} activo
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {theme === "system"
                          ? "La interfaz sigue automáticamente la configuración de tu sistema operativo."
                          : "La preferencia se guarda en este navegador y se mantiene entre sesiones."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      Animaciones reducidas
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      Disminuye las transiciones y efectos de movimiento.
                    </p>
                  </div>
                  <Switch
                    checked={reducedMotion}
                    onChange={setReducedMotion}
                    label="Animaciones reducidas"
                  />
                </div>
              </div>
            ) : null}

            {activeTab === "notifications" ? (
              <div className="max-w-2xl space-y-4">
                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                  {[
                    {
                      key: "weeklyReport" as const,
                      title: "Resumen semanal",
                      description: "Recibe cada lunes un correo con los indicadores clave.",
                    },
                    {
                      key: "activity" as const,
                      title: "Actividad del equipo",
                      description: "Avisos cuando alguien invita, edita o elimina contenido.",
                    },
                    {
                      key: "mentions" as const,
                      title: "Menciones y comentarios",
                      description: "Notificaciones cuando te mencionan en una nota o reporte.",
                    },
                    {
                      key: "product" as const,
                      title: "Novedades del producto",
                      description: "Entérate de nuevas funciones y mejoras del panel.",
                    },
                    {
                      key: "billing" as const,
                      title: "Facturación y límites",
                      description: "Alertas de pagos, consumo de API y cambios de plan.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-4 px-4 py-3.5"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings[item.key]}
                        onChange={() => toggleNotification(item.key)}
                        label={item.title}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                  {notificationsSaved ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      Preferencias guardadas.
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      Puedes cambiar estas preferencias en cualquier momento.
                    </span>
                  )}
                  <Button
                    onClick={() => setNotificationsSaved(true)}
                    leftIcon={<Check className="h-4 w-4" />}
                  >
                    Guardar preferencias
                  </Button>
                </div>
              </div>
            ) : null}

            {activeTab === "security" ? (
              <div className="max-w-2xl space-y-8">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                      <KeyRound className="h-4 w-4 text-slate-400" aria-hidden />
                      Cambiar contraseña
                    </h3>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      Usa al menos 12 caracteres con números y símbolos.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="current-password" className={labelClass}>
                      Contraseña actual
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      value={password.current}
                      onChange={(event) =>
                        setPassword((current) => ({
                          ...current,
                          current: event.target.value,
                        }))
                      }
                      className={inputClass}
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="new-password" className={labelClass}>
                        Nueva contraseña
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        value={password.next}
                        onChange={(event) =>
                          setPassword((current) => ({
                            ...current,
                            next: event.target.value,
                          }))
                        }
                        className={inputClass}
                        autoComplete="new-password"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className={labelClass}>
                        Confirmar contraseña
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        value={password.confirm}
                        onChange={(event) =>
                          setPassword((current) => ({
                            ...current,
                            confirm: event.target.value,
                          }))
                        }
                        className={inputClass}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  {passwordError ? (
                    <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                      {passwordError}
                    </p>
                  ) : null}

                  <div className="flex items-center gap-3">
                    <Button type="submit" size="sm">
                      Actualizar contraseña
                    </Button>
                    {passwordSaved ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" aria-hidden />
                        Contraseña actualizada.
                      </span>
                    ) : null}
                  </div>
                </form>

                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-100">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden />
                        Verificación en dos pasos
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        Añade una capa adicional de seguridad usando una aplicación
                        autenticadora.
                      </p>
                    </div>
                    <Switch
                      checked={twoFactor}
                      onChange={setTwoFactor}
                      label="Verificación en dos pasos"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge tone={twoFactor ? "success" : "warning"} dot>
                      {twoFactor ? "Protegido" : "Sin protección"}
                    </Badge>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Recomendado para cuentas administradoras
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Sesiones activas
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    Dispositivos que tienen acceso a tu cuenta.
                  </p>

                  <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                    {sessions.map((session) => {
                      const Icon = session.icon;
                      return (
                        <li
                          key={session.id}
                          className="flex items-center justify-between gap-3 px-4 py-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <div className="min-w-0">
                              <p className="flex items-center gap-2 truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                                {session.device}
                                {session.current ? (
                                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                    Actual
                                  </span>
                                ) : null}
                              </p>
                              <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">
                                {session.location} · {session.lastActive}
                              </p>
                            </div>
                          </div>

                          {session.current ? (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              Este dispositivo
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setSessions((current) =>
                                  current.filter((item) => item.id !== session.id),
                                )
                              }
                              className="shrink-0 cursor-pointer rounded-lg px-2 py-1 text-[11px] font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                            >
                              Revocar
                            </button>
                          )}
                        </li>
                      );
                    })}

                    {sessions.length === 1 ? (
                      <li className="px-4 py-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
                        No hay otras sesiones activas.
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
};
