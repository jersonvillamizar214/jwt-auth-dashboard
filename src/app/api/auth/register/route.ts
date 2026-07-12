import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
import {
  hashPassword,
  issueTokens,
  persistRefreshToken,
  setAuthCookies,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Este correo ya está registrado" },
        { status: 409 }
      );
    }

    const password = await hashPassword(input.password);
    const user = await prisma.user.create({
      data: { name: input.name, email: input.email, password },
    });

    const tokens = issueTokens(user);
    await persistRefreshToken(user.id, tokens.refreshToken);
    await setAuthCookies(tokens);

    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: err.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("register error:", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
