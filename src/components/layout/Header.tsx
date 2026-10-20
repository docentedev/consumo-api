import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "react-oidc-context";
import { navigationItems } from "../../data/navigation";
import { notifications } from "../../data/dashboard";
import { signOutFromCognito } from "../../auth/config";
import { getInitials } from "../../lib/initials";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Avatar } from "../ui/Avatar";

interface HeaderProps {
  onOpenSidebar: () => void;
}

type OpenMenu = "notifications" | "profile" | null;

export const Header = ({ onOpenSidebar }: HeaderProps) => {
  const auth = useAuth();
  const [location] = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [notificationList, setNotificationList] = useState(notifications);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const currentSection =
    navigationItems.find((item) =>
      item.href === "/" ? location === "/" : location.startsWith(item.href),
    )?.label ?? "Panel";

  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? navigationItems.filter((item) =>
        item.label.toLowerCase().includes(normalizedQuery),
      )
    : [];

  const unreadCount = notificationList.filter((item) => item.unread).length;

  const displayName =
    auth.user?.profile.name ??
    auth.user?.profile.email?.split("@")[0] ??
    "Usuario";
  const displayEmail = auth.user?.profile.email ?? "sesion@nexo.io";

  useClickOutside(
    notificationsRef,
    () => setOpenMenu((current) => (current === "notifications" ? null : current)),
    openMenu === "notifications",
  );
  useClickOutside(
    profileRef,
    () => setOpenMenu((current) => (current === "profile" ? null : current)),
    openMenu === "profile",
  );
  useClickOutside(searchContainerRef, () => setSearchOpen(false), searchOpen);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
        setMobileSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setOpenMenu(null);
  }, [location]);

  const handleSignOut = async () => {
    await auth.removeUser();
    signOutFromCognito();
  };

  const renderSearchResults = () => {
    if (!normalizedQuery) return null;

    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
        {searchResults.length > 0 ? (
          searchResults.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                  setMobileSearchOpen(false);
                }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Icon className="h-4 w-4 text-slate-400" aria-hidden />
                <span className="flex-1">{item.label}</span>
                <span className="text-[10px] text-slate-400">Ir</span>
              </Link>
            );
          })
        ) : (
          <p className="px-2.5 py-3 text-sm text-slate-400">
            Sin resultados para “{query.trim()}”.
          </p>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Abrir menú"
          className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 items-center gap-1.5 text-sm md:flex">
          <span className="text-slate-400 dark:text-slate-500">Nexo</span>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="truncate font-medium text-slate-700 dark:text-slate-200">
            {currentSection}
          </span>
        </div>

        <div
          ref={searchContainerRef}
          className="relative ml-auto hidden w-full max-w-sm md:block"
        >
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Buscar en el panel…"
            aria-label="Buscar en el panel"
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-14 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-500/60 dark:focus:bg-slate-900"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:inline-flex dark:border-slate-700 dark:bg-slate-800">
            ⌘K
          </kbd>
          {searchOpen && normalizedQuery ? (
            <div className="absolute inset-x-0 top-full z-50 mt-2">{renderSearchResults()}</div>
          ) : null}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 md:ml-2">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((open) => !open)}
            aria-label="Buscar"
            className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              resolvedTheme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenMenu((current) =>
                  current === "notifications" ? null : "notifications",
                )
              }
              aria-label={`Notificaciones${unreadCount > 0 ? `, ${unreadCount} sin leer` : ""}`}
              aria-expanded={openMenu === "notifications"}
              className="relative cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </button>

            {openMenu === "notifications" ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Notificaciones
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {unreadCount} sin leer
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotificationList((items) =>
                        items.map((item) => ({ ...item, unread: false })),
                      )
                    }
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                  >
                    <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                    Marcar leídas
                  </button>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {notificationList.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setNotificationList((items) =>
                            items.map((item) =>
                              item.id === notification.id
                                ? { ...item, unread: false }
                                : item,
                            ),
                          )
                        }
                        className={cn(
                          "flex w-full cursor-pointer gap-3 border-b border-slate-50 px-4 py-3 text-left transition last:border-0 hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800/50",
                          notification.unread && "bg-indigo-50/40 dark:bg-indigo-500/5",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            notification.unread ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-700",
                          )}
                        />
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold text-slate-800 dark:text-slate-100">
                            {notification.title}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                            {notification.description}
                          </span>
                          <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">
                            {notification.time}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-100 px-4 py-2.5 dark:border-slate-800">
                  <Link
                    href="/settings"
                    onClick={() => setOpenMenu(null)}
                    className="text-[11px] font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    Administrar notificaciones
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <span className="mx-0.5 hidden h-6 w-px bg-slate-200 sm:block dark:bg-slate-800" />

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenMenu((current) =>
                  current === "profile" ? null : "profile",
                )
              }
              aria-expanded={openMenu === "profile"}
              aria-label="Menú de usuario"
              className="flex cursor-pointer items-center gap-2 rounded-xl p-1 pr-1 transition hover:bg-slate-100 sm:pr-2 dark:hover:bg-slate-800"
            >
              <Avatar
                name={displayName}
                initials={getInitials(displayName)}
                color="indigo"
                size="sm"
              />
              <span className="hidden min-w-0 text-left lg:block">
                <span className="block max-w-32 truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                  {displayName}
                </span>
                <span className="block max-w-32 truncate text-[10px] text-slate-400 dark:text-slate-500">
                  {displayEmail}
                </span>
              </span>
              <ChevronDown
                className="hidden h-3.5 w-3.5 text-slate-400 lg:block"
                aria-hidden
              />
            </button>

            {openMenu === "profile" ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {displayName}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-400 dark:text-slate-500">
                    {displayEmail}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <ShieldCheck className="h-3 w-3" aria-hidden />
                    Sesión verificada
                  </span>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/settings"
                    onClick={() => setOpenMenu(null)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <UserRound className="h-4 w-4 text-slate-400" aria-hidden />
                    Mi perfil
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setOpenMenu(null)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <Settings className="h-4 w-4 text-slate-400" aria-hidden />
                    Configuración
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {mobileSearchOpen ? (
        <div className="border-t border-slate-100 px-4 py-3 md:hidden dark:border-slate-800">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar en el panel…"
              aria-label="Buscar en el panel"
              autoFocus
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
            />
          </div>
          {normalizedQuery ? <div className="mt-2">{renderSearchResults()}</div> : null}
        </div>
      ) : null}
    </header>
  );
};
