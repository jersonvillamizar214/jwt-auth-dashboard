"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUi } from "./ui";
import { T } from "@/lib/i18n";

type Mode = "login" | "register";

export default function AuthForm({ mode }: { mode: Mode }) {
  const { lang } = useUi();
  const t = T[lang];
  const a = t.auth;
  const c = a[mode];
  const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
  const switchHref = mode === "login" ? "/register" : "/login";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? a.errGeneric);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(a.errConn);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-2xl">
      <h1 className="text-2xl font-bold">{c.title}</h1>
      <p className="mt-1 text-sm text-muted">{a.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "register" && (
          <Field label={a.name} name="name" type="text" placeholder={a.namePh} autoComplete="name" />
        )}
        <Field label={a.email} name="email" type="email" placeholder={a.emailPh} autoComplete="email" />
        <Field
          label={a.password}
          name="password"
          type="password"
          placeholder={a.passwordPh}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-500 dark:text-rose-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? a.processing : c.action}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {c.switchText}{" "}
        <Link href={switchHref} className="text-accent hover:brightness-110">
          {c.switchLabel}
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <input
        {...props}
        required
        className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition placeholder:text-dim focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
