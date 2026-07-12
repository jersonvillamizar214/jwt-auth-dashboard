import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
  {
    title: "JWT + cookies httpOnly",
    desc: "Access y refresh tokens firmados, guardados en cookies invisibles a JavaScript para mitigar XSS.",
  },
  {
    title: "Contraseñas con bcrypt",
    desc: "Nunca se almacena la contraseña en texto plano: solo un hash irreversible con salt.",
  },
  {
    title: "Autorización por roles",
    desc: "Rutas protegidas para USER y ADMIN. Los admins ven la lista completa de usuarios.",
  },
  {
    title: "Full-stack en Next.js",
    desc: "Frontend y backend (route handlers) en un solo proyecto, desplegable en Vercel + Neon.",
  },
];

const stack = [
  "Next.js 16",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "JWT",
  "bcrypt",
  "Zod",
  "Tailwind CSS",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="py-20 text-center sm:py-28">
          <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            Proyecto de portafolio · Full-stack
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Autenticación segura con{" "}
            <span className="text-indigo-400">JWT</span> en Next.js
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Registro, inicio de sesión y un dashboard protegido por roles.
            Backend y frontend en una sola app, lista para producción.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
            >
              Probar la demo
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
            >
              Iniciar sesión
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-4 pb-24 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-6"
            >
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        Construido con Next.js · Prisma · PostgreSQL —{" "}
        <a
          href="https://github.com/jersonvillamizar214"
          className="text-slate-400 hover:text-white"
        >
          @jersonvillamizar214
        </a>
      </footer>
    </>
  );
}
