import { NextResponse } from "next/server";
import { tokenFrom, updateName } from "@/lib/db";

// Шаг 3 (для новых пользователей): сохраняем имя
export async function PUT(request) {
  const { name } = await request.json().catch(() => ({}));
  if (!name?.trim()) return NextResponse.json({ error: "fields" }, { status: 400 });
  const user = await updateName(tokenFrom(request), name);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ user });
}
