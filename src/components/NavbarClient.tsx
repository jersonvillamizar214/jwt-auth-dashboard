"use client";

import Link from "next/link";
import { Controls, useUi } from "./ui";
import { T } from "@/lib/i18n";
import LogoutButton from "./LogoutButton";

export default function NavbarClient({ loggedIn }: { loggedIn: boolean }) {
  const { lang } = useUi();
  const t = T[lang];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-accent-ink">
            JA
          </span>
          <span>JWT Auth</span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {loggedIn ? (
            <>
              <Link href="/dashboard" className="text-muted transition hover:text-fg">
                {t.dashboard}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-muted transition hover:text-fg">
                {t.login}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-accent px-4 py-2 font-medium text-accent-ink transition hover:brightness-110"
              >
                {t.register}
              </Link>
            </>
          )}
          <Controls />
        </div>
      </nav>
    </header>
  );
}
