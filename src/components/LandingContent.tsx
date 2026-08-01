"use client";

import Link from "next/link";
import { useUi } from "./ui";
import { T } from "@/lib/i18n";

const STACK = ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "JWT", "bcrypt", "Zod", "Tailwind CSS"];

export default function LandingContent() {
  const { lang } = useUi();
  const t = T[lang];

  return (
    <>
      <main className="mx-auto max-w-5xl px-6">
        <section className="py-20 text-center sm:py-28">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {t.badge}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t.h1pre}
            <span className="text-accent">{t.h1accent}</span>
            {t.h1suf}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{t.lead}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-accent-ink transition hover:brightness-110"
            >
              {t.tryDemo}
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-line-2 px-6 py-3 font-semibold text-fg transition hover:bg-hover"
            >
              {t.login}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-4 pb-24 sm:grid-cols-2">
          {t.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold text-fg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-dim">
        {t.footer}{" "}
        <a href="https://github.com/jersonvillamizar214" className="text-muted hover:text-fg">
          @jersonvillamizar214
        </a>
      </footer>
    </>
  );
}
