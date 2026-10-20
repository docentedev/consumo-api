import { useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  AvatarColor,
  TeamUser,
  UserRole,
  UserStatus,
} from "../types/dashboard";
import { teamUsers } from "../data/dashboard";
import { getInitials } from "../lib/initials";
import { cn } from "../lib/cn";
import { useClickOutside } from "../hooks/useClickOutside";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import type { BadgeTone } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Modal } from "../components/ui/Modal";

type RoleFilter = "Todos" | UserRole;

interface MiniStatProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent: "indigo" | "emerald" | "amber" | "violet";
}

const accentClasses: Record<MiniStatProps["accent"], string> = {
  indigo:
    "bg-indigo-50 text-indigo-600 ring-indigo-600/10 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20",
  emerald:
    "bg-emerald-50 text-emerald-600 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
  amber:
    "bg-amber-50 text-amber-600 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
  violet:
    "bg-violet-50 text-violet-600 ring-violet-600/10 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20",
};

const MiniStat = ({ label, value, detail, icon: Icon, accent }: MiniStatProps) => (
  <Card>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">{detail}</p>
      </div>
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-inset",
          accentClasses[accent],
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
    </div>
  </Card>
);

const roleTone: Record<UserRole, BadgeTone> = {
  Administrador: "violet",
  Editor: "info",
  Analista: "neutral",
  Visor: "neutral",
};

const statusTone: Record<UserStatus, BadgeTone> = {
  Activo: "success",
  Invitado: "warning",
  Inactivo: "neutral",
};

const avatarColors: AvatarColor[] = ["indigo", "emerald", "amber", "sky", "rose", "violet"];
const roles: UserRole[] = ["Administrador", "Editor", "Analista", "Visor"];
const PAGE_SIZE = 6;

interface UserRowActionsProps {
  user: TeamUser;
  onDelete: (user: TeamUser) => void;
  onResend: (user: TeamUser) => void;
}

const UserRowActions = ({ user, onDelete, onResend }: UserRowActionsProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Acciones para ${user.name}`}
        aria-expanded={open}
        className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => {
              onResend(user);
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 text-slate-400" aria-hidden />
            {user.status === "Invitado" ? "Reenviar invitación" : "Enviar correo"}
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete(user);
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            Eliminar usuario
          </button>
        </div>
      ) : null}
    </div>
  );
};

export const UsersPage = () => {
  const [users, setUsers] = useState<TeamUser[]>(teamUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<RoleFilter>("Todos");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    role: UserRole;
  }>({ name: "", email: "", role: "Visor" });

  const normalizedSearch = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !normalizedSearch ||
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch);
    const matchesRole = role === "Todos" || user.role === role;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleUsers = filteredUsers.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  );

  const allVisibleSelected =
    visibleUsers.length > 0 &&
    visibleUsers.every((user) => selected.includes(user.id));

  const activeCount = users.filter((user) => user.status === "Activo").length;
  const invitedCount = users.filter((user) => user.status === "Invitado").length;
  const adminCount = users.filter((user) => user.role === "Administrador").length;

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelected((current) =>
        current.filter((id) => !visibleUsers.some((user) => user.id === id)),
      );
      return;
    }

    setSelected((current) => [
      ...new Set([...current, ...visibleUsers.map((user) => user.id)]),
    ]);
  };

  const toggleUser = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleDelete = (user: TeamUser) => {
    setUsers((current) => current.filter((item) => item.id !== user.id));
    setSelected((current) => current.filter((id) => id !== user.id));
    setFeedback(`Se eliminó a ${user.name} del espacio de trabajo.`);
  };

  const handleBulkDelete = () => {
    const amount = selected.length;
    setUsers((current) => current.filter((user) => !selected.includes(user.id)));
    setSelected([]);
    setFeedback(`Se eliminaron ${amount} usuarios del espacio de trabajo.`);
  };

  const handleResend = (user: TeamUser) => {
    setFeedback(`Invitación reenviada a ${user.email}.`);
  };

  const handleInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email) {
      setFormError("Completa el nombre y el correo electrónico.");
      return;
    }

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      setFormError("Ya existe un usuario con ese correo electrónico.");
      return;
    }

    const newUser: TeamUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      initials: getInitials(name),
      color: avatarColors[users.length % avatarColors.length],
      role: form.role,
      status: "Invitado",
      lastActive: "Invitación enviada",
    };

    setUsers((current) => [newUser, ...current]);
    setInviteOpen(false);
    setForm({ name: "", email: "", role: "Visor" });
    setFormError(null);
    setPage(0);
    setFeedback(`Invitación enviada a ${email}.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios"
        description="Administra los miembros de tu espacio de trabajo, sus roles y el estado de sus invitaciones."
        actions={
          <Button
            leftIcon={<UserPlus className="h-4 w-4" />}
            onClick={() => {
              setFormError(null);
              setInviteOpen(true);
            }}
          >
            Invitar usuario
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MiniStat
          label="Miembros totales"
          value={String(users.length)}
          detail="2 nuevos este mes"
          icon={UsersRound}
          accent="indigo"
        />
        <MiniStat
          label="Usuarios activos"
          value={String(activeCount)}
          detail="Con actividad en los últimos 7 días"
          icon={UserCheck}
          accent="emerald"
        />
        <MiniStat
          label="Invitaciones pendientes"
          value={String(invitedCount)}
          detail="Esperando aceptación"
          icon={Clock3}
          accent="amber"
        />
        <MiniStat
          label="Administradores"
          value={String(adminCount)}
          detail="Acceso completo al panel"
          icon={ShieldCheck}
          accent="violet"
        />
      </div>

      <Card padded={false}>
        <div className="flex flex-col gap-3 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Directorio del equipo
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {filteredUsers.length} de {users.length} miembros
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(0);
                }}
                placeholder="Buscar por nombre o correo…"
                aria-label="Buscar usuarios"
                className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 sm:w-64 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-0.5 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            <select
              value={role}
              onChange={(event) => {
                setRole(event.target.value as RoleFilter);
                setPage(0);
              }}
              aria-label="Filtrar por rol"
              className="h-9 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <option value="Todos">Todos los roles</option>
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {feedback ? (
          <div className="mx-5 mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-800 sm:mx-6 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span className="flex-1">{feedback}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              aria-label="Cerrar aviso"
              className="cursor-pointer rounded p-0.5 transition hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}

        {selected.length > 0 ? (
          <div className="mx-5 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-xs text-indigo-800 sm:mx-6 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            <span className="font-medium">
              {selected.length} {selected.length === 1 ? "usuario seleccionado" : "usuarios seleccionados"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelected([])}
                className="cursor-pointer rounded-lg px-2 py-1 text-[11px] font-medium transition hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-rose-500"
              >
                <Trash2 className="h-3 w-3" aria-hidden />
                Eliminar
              </button>
            </div>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-500">
                <th className="w-10 px-5 py-2.5 sm:px-6">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    aria-label="Seleccionar todos los usuarios visibles"
                    className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 accent-indigo-600"
                  />
                </th>
                <th className="px-3 py-2.5 font-semibold">Usuario</th>
                <th className="px-3 py-2.5 font-semibold">Rol</th>
                <th className="px-3 py-2.5 font-semibold">Estado</th>
                <th className="px-3 py-2.5 font-semibold">Última actividad</th>
                <th className="px-5 py-2.5 text-right font-semibold sm:px-6">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {visibleUsers.map((user) => (
                <tr
                  key={user.id}
                  className={cn(
                    "transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30",
                    selected.includes(user.id) && "bg-indigo-50/40 dark:bg-indigo-500/5",
                  )}
                >
                  <td className="px-5 py-3.5 sm:px-6">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => toggleUser(user.id)}
                      aria-label={`Seleccionar a ${user.name}`}
                      className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 accent-indigo-600"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        name={user.name}
                        initials={user.initials}
                        color={user.color}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                          {user.name}
                        </p>
                        <p className="max-w-52 truncate text-[10px] text-slate-400 dark:text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <Badge tone={roleTone[user.role]}>{user.role}</Badge>
                  </td>
                  <td className="px-3 py-3.5">
                    <Badge tone={statusTone[user.status]} dot>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-3.5 text-[11px] whitespace-nowrap text-slate-400 dark:text-slate-500">
                    {user.lastActive}
                  </td>
                  <td className="px-5 py-3.5 text-right sm:px-6">
                    <div className="flex justify-end">
                      <UserRowActions
                        user={user}
                        onDelete={handleDelete}
                        onResend={handleResend}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {visibleUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <UsersRound className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" aria-hidden />
                    <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                      No encontramos usuarios
                    </p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      Prueba con otro término de búsqueda o cambia el filtro de rol.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        setSearch("");
                        setRole("Todos");
                        setPage(0);
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Mostrando{" "}
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {filteredUsers.length === 0 ? 0 : currentPage * PAGE_SIZE + 1}–
              {Math.min((currentPage + 1) * PAGE_SIZE, filteredUsers.length)}
            </span>{" "}
            de {filteredUsers.length} usuarios
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              disabled={currentPage === 0}
              aria-label="Página anterior"
              className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(totalPages - 1, value + 1))}
              disabled={currentPage >= totalPages - 1}
              aria-label="Página siguiente"
              className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invitar a un nuevo miembro"
        description="Enviaremos un correo con un enlace seguro para unirse al espacio de trabajo."
        footer={
          <>
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form="invite-form" leftIcon={<UserPlus className="h-4 w-4" />}>
              Enviar invitación
            </Button>
          </>
        }
      >
        <form id="invite-form" onSubmit={handleInvite} className="space-y-4">
          <div>
            <label htmlFor="invite-name" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Nombre completo
            </label>
            <input
              id="invite-name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Camila Torres"
              autoComplete="name"
              required
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600"
            />
          </div>

          <div>
            <label htmlFor="invite-email" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Correo electrónico
            </label>
            <input
              id="invite-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="camila@empresa.com"
              autoComplete="email"
              required
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600"
            />
          </div>

          <div>
            <label htmlFor="invite-role" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Rol en el espacio de trabajo
            </label>
            <select
              id="invite-role"
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  role: event.target.value as UserRole,
                }))
              }
              className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {formError ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
              {formError}
            </p>
          ) : null}

          <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            El usuario recibirá acceso de solo lectura hasta que un administrador
            ajuste sus permisos.
          </p>
        </form>
      </Modal>
    </div>
  );
};
