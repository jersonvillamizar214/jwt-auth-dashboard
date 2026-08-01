"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUi } from "./ui";
import { T } from "@/lib/i18n";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { lang } = useUi();
  const t = T[lang];

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg border border-line-2 px-4 py-2 font-medium text-muted transition hover:bg-hover disabled:opacity-60"
    >
      {loading ? t.loggingOut : t.logout}
    </button>
  );
}
