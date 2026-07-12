import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import {
  verifyPassword,
  issueTokens,
  persistRefreshToken,
  setAuthCookies,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });
    // Same error for unknown email and wrong password → avoids user enumeration.
    if (!user || !(await verifyPassword(input.password, user.password))) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const tokens = issueTokens(user);
    await persistRefreshToken(user.id, tokens.refreshToken);
    await setAuthCookies(tokens);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: err.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("login error:", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
