import { NextResponse } from "next/server";
import { googleLogin } from "@/lib/db";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// Проверяем ID-токен, который выдал Google Identity Services, через официальный
// эндпоинт tokeninfo: подпись, срок действия и то, что токен выписан для нашего Client ID.
async function verify(credential) {
  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`, { cache: "no-store" });
  if (!res.ok) return null;
  const p = await res.json();
  const issOk = p.iss === "accounts.google.com" || p.iss === "https://accounts.google.com";
  const fresh = Number(p.exp) * 1000 > Date.now();
  const verified = p.email_verified === true || p.email_verified === "true";
  if (p.aud !== CLIENT_ID || !issOk || !fresh || !verified || !p.sub || !p.email) return null;
  return p;
}

export async function POST(request) {
  if (!CLIENT_ID) return NextResponse.json({ error: "not_configured" }, { status: 500 });
  const { credential, progress } = await request.json().catch(() => ({}));
  if (!credential) return NextResponse.json({ error: "fields" }, { status: 400 });

  const payload = await verify(credential).catch(() => null);
  if (!payload) return NextResponse.json({ error: "google_invalid" }, { status: 401 });

  const data = await googleLogin({
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    progress,
  });
  return NextResponse.json(data);
}
