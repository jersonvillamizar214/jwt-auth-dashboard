"use client";

import { useUi } from "./ui";
import { T } from "@/lib/i18n";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string; // ISO
}

export default function DashboardContent({
  user,
  isAdmin,
  totalUsers,
  users,
}: {
  user: UserRow;
  isAdmin: boolean;
  totalUsers: number | null;
  users: UserRow[];
}) {
  const { lang } = useUi();
  const t = T[lang];
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(t.locale, { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(iso)
    );

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">{t.hello.replace("{name}", user.name)}</h1>
      <p className="mt-1 text-muted">{t.authed}</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={t.role} value={user.role} accent />
        <StatCard label={t.memberSince} value={fmt(user.createdAt)} />
        <StatCard
          label={t.totalUsers}
          value={isAdmin ? String(totalUsers) : "—"}
          hint={isAdmin ? undefined : t.adminOnly}
        />
      </section>

      <section className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold">{t.yourProfile}</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <Detail label={t.auth.name} value={user.name} />
          <Detail label={t.auth.email} value={user.email} />
          <Detail label={t.userId} value={user.id} mono />
          <Detail label={t.role} value={user.role} />
        </dl>
      </section>

      {isAdmin && (
        <section className="mt-8 rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-lg font-semibold">{t.registeredUsers}</h2>
          <p className="mt-1 text-sm text-muted">{t.adminPanel}</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-dim">
                <tr className="border-b border-line">
                  <th className="py-2 pr-4">{t.auth.name}</th>
                  <th className="py-2 pr-4">{t.auth.email}</th>
                  <th className="py-2 pr-4">{t.role}</th>
                  <th className="py-2">{t.thRegistered}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-line">
                    <td className="py-2.5 pr-4 font-medium">{u.name}</td>
                    <td className="py-2.5 pr-4 text-muted">{u.email}</td>
                    <td className="py-2.5 pr-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          u.role === "ADMIN"
                            ? "bg-accent/20 text-accent"
                            : "bg-surface-2 text-muted"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 text-muted">{fmt(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
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
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent ? "text-accent" : "text-fg"}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-dim">{hint}</p>}
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={`mt-0.5 ${mono ? "font-mono text-sm" : ""}`}>{value}</dd>
    </div>
  );
}
