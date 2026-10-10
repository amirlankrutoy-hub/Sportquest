"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { useApp } from "./AppProvider";

export const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Оформление окон Clerk под дизайн SPORT QUEST
export const clerkAppearance = {
  variables: {
    colorPrimary: "#18f5b5",
    colorText: "#ffffff",
    colorTextSecondary: "#7e9296",
    colorBackground: "#07191d",
    colorInputBackground: "#03090b",
    colorInputText: "#ffffff",
    colorNeutral: "#d9e4e5",
    colorDanger: "#ff6b6b",
    borderRadius: "1rem",
    fontFamily: "var(--font-manrope), Segoe UI, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none border-0",
    card: "bg-transparent shadow-none p-0",
    formButtonPrimary: "text-[#03090b] font-bold normal-case shadow-[0_8px_30px_-8px_rgba(24,245,181,.6)]",
    // кнопка «Продолжить с Google»: белая и крупная, чтобы было видно, что она активна
    socialButtonsBlockButton:
      "h-14! bg-white! border-0! rounded-2xl! shadow-[0_8px_30px_-10px_rgba(255,255,255,.45)] transition hover:bg-[#eef2f3]! hover:-translate-y-0.5",
    socialButtonsBlockButtonText: "text-[#1f1f1f]! text-base! font-bold!",
    footer: "bg-transparent",
  },
};

// Состояние «моста» Clerk → сессия сайта: нужно экрану входа, чтобы показать ошибку
const LinkContext = createContext({ error: null, retry: () => {} });
export const useClerkLink = () => useContext(LinkContext);

// После входа через Clerk создаём сессию нашего сайта (XP, квесты, профиль).
// Свежий токен Clerk передаём в заголовке: cookie Clerk живёт всего минуту,
// и запрос с просроченной cookie сервер не примет.
function useClerkBridge() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user, auth } = useApp();
  const linking = useRef(false);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || user.token || linking.current) return;
    linking.current = true;
    setError(null);
    (async () => {
      try {
        const token = await getToken({ skipCache: true });
        if (!token) throw new Error("no_token");
        await auth("clerk", {}, { Authorization: `Bearer ${token}` });
      } catch (e) {
        console.error("[SPORT QUEST] не удалось связать вход Clerk:", e.message);
        setError(e.message || "generic");
      } finally {
        linking.current = false;
      }
    })();
  }, [isLoaded, isSignedIn, user.token, auth, getToken, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { error, retry };
}

function Bridge({ children }) {
  const link = useClerkBridge();
  return <LinkContext.Provider value={link}>{children}</LinkContext.Provider>;
}

export default function ClerkShell({ children }) {
  const { lang } = useApp();
  if (!CLERK_KEY) return children;
  return (
    <ClerkProvider publishableKey={CLERK_KEY} localization={lang === "en" ? undefined : ruRU} appearance={clerkAppearance}>
      <Bridge>{children}</Bridge>
    </ClerkProvider>
  );
}
