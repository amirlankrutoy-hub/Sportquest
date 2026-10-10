import { NextResponse } from "next/server";
import { createLoginCode } from "@/lib/db";
import { mailConfigured, sendLoginCode } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Шаг 1: пользователь ввёл почту, отправляем ему 6-значный код
export async function POST(request) {
  const { email, lang } = await request.json().catch(() => ({}));
  if (!email || !EMAIL_RE.test(email.trim())) return NextResponse.json({ error: "email_invalid" }, { status: 400 });

  const result = await createLoginCode(email);
  if (result.wait) return NextResponse.json({ error: "code_wait", wait: result.wait }, { status: 429 });

  if (!mailConfigured()) {
    // Почта не настроена: демо-режим, код показываем на экране и в консоли сервера
    console.log(`[SPORT QUEST] код для ${email}: ${result.code}`);
    return NextResponse.json({ ok: true, demo: true, devCode: result.code, resendIn: 60 });
  }

  try {
    await sendLoginCode(email.trim(), result.code, lang);
  } catch (e) {
    console.error("[SPORT QUEST] не удалось отправить письмо:", e.message);
    return NextResponse.json({ error: "mail_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, resendIn: 60 });
}
