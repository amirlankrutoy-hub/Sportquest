import { NextResponse } from "next/server";
import { verifyLoginCode } from "@/lib/db";

// Шаг 2: проверяем код из письма и входим
export async function POST(request) {
  const { email, code, progress } = await request.json().catch(() => ({}));
  if (!email || !/^\d{6}$/.test(String(code ?? "").trim())) return NextResponse.json({ error: "code_invalid" }, { status: 400 });
  try {
    return NextResponse.json(await verifyLoginCode(email, code, progress));
  } catch (e) {
    const status = e.message === "code_attempts" ? 429 : 401;
    return NextResponse.json({ error: e.message }, { status });
  }
}
