import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { REFRESH_COOKIE, clearAuthCookies } from "@/lib/auth";

export async function POST() {
  // Revoke the persisted refresh token (server-side logout), then clear cookies.
  const store = await cookies();
  const refresh = store.get(REFRESH_COOKIE)?.value;
  if (refresh) {
    await prisma.refreshToken.deleteMany({ where: { token: refresh } });
  }
  await clearAuthCookies();
  return NextResponse.json({ ok: true });
}
