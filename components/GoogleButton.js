"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./AppProvider";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const LOCALES = { ru: "ru", en: "en", uz: "uz" };

let loader = null;
function loadGsi() {
  if (window.google?.accounts?.id) return Promise.resolve();
  loader ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = resolve;
    s.onerror = () => {
      loader = null;
      reject(new Error("gsi"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

let initialized = false;

// Официальная кнопка «Войти через Google» (Google Identity Services).
// Google возвращает ID-токен, его проверяет наш сервер в /api/auth/google.
export default function GoogleButton({ onError }) {
  const { auth, lang, t } = useApp();
  const box = useRef(null);
  const handler = useRef(null);
  const [failed, setFailed] = useState(false);

  handler.current = async ({ credential }) => {
    try {
      await auth("google", { credential });
    } catch (err) {
      onError?.(err.message);
    }
  };

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;
    loadGsi()
      .then(() => {
        if (cancelled || !box.current) return;
        const id = window.google.accounts.id;
        if (!initialized) {
          id.initialize({
            client_id: CLIENT_ID,
            callback: (res) => handler.current(res),
            ux_mode: "popup",
            auto_select: false,
            itp_support: true,
          });
          initialized = true;
          id.prompt(); // окно One Tap в углу, как на многих сайтах
        }
        box.current.innerHTML = "";
        id.renderButton(box.current, {
          type: "standard",
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "left",
          width: Math.min(box.current.offsetWidth || 360, 400),
          locale: LOCALES[lang],
        });
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [lang]);

  if (!CLIENT_ID) {
    return (
      <div className="rounded-2xl border border-dashed border-flame/40 bg-flame/[0.06] p-4">
        <button disabled className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-white/90 font-semibold text-[#1f1f1f] opacity-60">
          <GoogleLogo /> Google
        </button>
        <p className="mt-3 text-xs leading-relaxed text-flame">{t("login.notConfigured")}</p>
      </div>
    );
  }

  return (
    <div>
      <div ref={box} className="flex min-h-11 w-full justify-center [color-scheme:light]" />
      {failed && <p className="mt-2 text-center text-xs text-flame">{t("login.loadError")}</p>}
    </div>
  );
}

export function GoogleLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
