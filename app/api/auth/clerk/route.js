import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { clerkLogin } from "@/lib/db";

// Пользователь вошёл через Clerk: берём его данные у Clerk на сервере
// (браузеру не доверяем) и выдаём токен сессии нашего сайта.
export async function POST(request) {
  if (!process.env.CLERK_SECRET_KEY) return NextResponse.json({ error: "not_configured" }, { status: 500 });
  let userId = null;
  let u = null;
  try {
    // токен приходит в заголовке Authorization (его проверяет clerkMiddleware)
    ({ userId } = await auth());
    if (userId) u = await currentUser();
  } catch (e) {
    console.error("[SPORT QUEST] clerk auth:", e.message);
  }
  if (!userId || !u) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const email = u?.primaryEmailAddress?.emailAddress ?? u?.emailAddresses?.[0]?.emailAddress;
  if (!email) return NextResponse.json({ error: "fields" }, { status: 400 });

  const { progress } = await request.json().catch(() => ({}));
  const viaGoogle = u.externalAccounts?.some((a) => String(a.provider).includes("google"));
  const name = [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username || null;

  const data = await clerkLogin({
    clerkId: userId,
    email,
    name,
    picture: u.hasImage ? u.imageUrl : null,
    provider: viaGoogle ? "google" : "email",
    progress,
  });
  return NextResponse.json(data);
}
