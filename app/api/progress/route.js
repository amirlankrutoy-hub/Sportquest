import { NextResponse } from "next/server";
import { getProgress, saveProgress, tokenFrom } from "@/lib/db";

export async function GET(request) {
  const data = await getProgress(tokenFrom(request));
  if (!data) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(data);
}

export async function PUT(request) {
  const { progress } = await request.json().catch(() => ({}));
  const ok = await saveProgress(tokenFrom(request), progress);
  if (!ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true });
}
