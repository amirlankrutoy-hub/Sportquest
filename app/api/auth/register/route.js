import { NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export async function POST(request) {
  const { name, email, password, progress } = await request.json().catch(() => ({}));
  if (!name?.trim() || !email?.includes("@") || !password || password.length < 6) {
    return NextResponse.json({ error: "fields" }, { status: 400 });
  }
  try {
    const user = await createUser({ name, email, password, progress });
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 409 });
  }
}
