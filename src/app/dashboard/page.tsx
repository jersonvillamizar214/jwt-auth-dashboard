import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const dateFmt = new Intl.DateTimeFormat("es-CO", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) redirect("/login");

  const isAdmin = user.role === "ADMIN";
  const [totalUsers, users] = isAdmin
    ? await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({
          select: { id: true, name: true, email: true, role: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 25,
        }),
      ])
    : [null, []];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-bold">Hola, {user.name} 👋</h1>
        <p className="mt-1 text-slate-400">
          Estás autenticado. Esta ruta está protegida por tu token JWT.
        </p>

        {/* Stat cards */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Rol" value={user.role} accent />
          <StatCard label="Miembro desde" value={dateFmt.format(user.createdAt)} />
          <StatCard
            label="Usuarios totales"
            value={isAdmin ? String(totalUsers) : "—"}
            hint={isAdmin ? undefined : "Solo visible para ADMIN"}
          />
        </section>

        {/* Profile */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold">Tu perfil</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Detail label="Nombre" value={user.name} />
            <Detail label="Correo" value={user.email} />
            <Detail label="ID de usuario" value={user.id} mono />
            <Detail label="Rol" value={user.role} />
          </dl>
        </section>

        {/* Admin-only user list */}
        {isAdmin && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold">Usuarios registrados</h2>
            <p className="mt-1 text-sm text-slate-400">
              Panel exclusivo para administradores.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500">
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4">Nombre</th>
                    <th className="py-2 pr-4">Correo</th>
                    <th className="py-2 pr-4">Rol</th>
                    <th className="py-2">Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5">
                      <td className="py-2.5 pr-4 font-medium">{u.name}</td>
                      <td className="py-2.5 pr-4 text-slate-400">{u.email}</td>
                      <td className="py-2.5 pr-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            u.role === "ADMIN"
                              ? "bg-indigo-500/20 text-indigo-300"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-400">
                        {dateFmt.format(u.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${
          accent ? "text-indigo-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd className={`mt-0.5 ${mono ? "font-mono text-sm" : ""}`}>{value}</dd>
    </div>
  );
}
