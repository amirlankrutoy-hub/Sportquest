import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk включается, только если в .env.local есть ключи. Без них сайт работает
// в демо-режиме со своим входом по коду.
const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
// clockSkewInMs: часы компьютера могут отставать от серверов Clerk на несколько секунд,
// а по умолчанию Clerk допускает только 5 с — тогда свежий токен считается «из будущего».
const clerk = clerkEnabled ? clerkMiddleware({ clockSkewInMs: 60_000 }) : null;

export default async function middleware(request, event) {
  if (!clerk) return NextResponse.next();
  try {
    return await clerk(request, event);
  } catch (e) {
    // испорченная cookie или токен не должны ронять весь сайт
    console.error("[SPORT QUEST] clerk middleware:", e.message);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // все страницы, кроме статики и файлов Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
