"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "login" | "register";

const copy = {
  login: {
    title: "Iniciar sesión",
    action: "Entrar",
    endpoint: "/api/auth/login",
    switchText: "¿No tienes cuenta?",
    switchHref: "/register",
    switchLabel: "Crear una",
  },
  register: {
    title: "Crear cuenta",
    action: "Registrarme",
    endpoint: "/api/auth/register",
    switchText: "¿Ya tienes cuenta?",
    switchHref: "/login",
    switchLabel: "Inicia sesión",
  },
} as const;

export default function AuthForm({ mode }: { mode: Mode }) {
  const t = copy[mode];
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
      const res = await fetch(t.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Algo salió mal. Inténtalo de nuevo.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-1 text-sm text-slate-400">
        Demo de autenticación con JWT y cookies httpOnly.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "register" && (
          <Field
            label="Nombre"
            name="name"
            type="text"
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
        )}
        <Field
          label="Correo"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
        />
        <Field
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-500 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-60"
        >
          {loading ? "Procesando…" : t.action}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        {t.switchText}{" "}
        <Link href={t.switchHref} className="text-indigo-400 hover:text-indigo-300">
          {t.switchLabel}
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
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </span>
      <input
        {...props}
        required
        className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
      />
    </label>
  );
}
