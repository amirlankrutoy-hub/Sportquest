import { NextResponse } from "next/server";
import { login } from "@/lib/db";

export async function POST(request) {
  const { email, password } = await request.json().catch(() => ({}));
  if (!email || !password) return NextResponse.json({ error: "fields" }, { status: 400 });
  try {
    return NextResponse.json(await login({ email, password }));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
