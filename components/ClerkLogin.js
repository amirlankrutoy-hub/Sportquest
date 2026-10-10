"use client";

import { useEffect, useState } from "react";
import { SignIn, useAuth, useClerk } from "@clerk/nextjs";
import { AlertTriangle, Loader2, LogOut, RotateCcw } from "lucide-react";
import { useClerkLink } from "./ClerkShell";
import { useApp } from "./AppProvider";

// Форма входа и регистрации Clerk: почта → код из письма, или «Продолжить с Google».
export default function ClerkLogin() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { error, retry } = useClerkLink();
  const { t } = useApp();
  const [slow, setSlow] = useState(false);

  // если Clerk долго не загружается — не крутим загрузку вечно
  useEffect(() => {
    if (isLoaded) return setSlow(false);
    const id = setTimeout(() => setSlow(true), 12000);
    return () => clearTimeout(id);
  }, [isLoaded]);

  if (isSignedIn && error) {
    return (
      <div className="rounded-2xl border border-flame/30 bg-flame/[0.06] p-5 text-center">
        <AlertTriangle className="mx-auto text-flame" size={26} />
        <p className="mt-3 text-sm text-ink-2">{t("clerk.linkError")}</p>
        <p className="mt-1 text-xs text-mute">{error}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button onClick={retry} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-void">
            <RotateCcw size={15} /> {t("clerk.retry")}
          </button>
          <button onClick={() => signOut()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold text-ink-2 ring-1 ring-line">
            <LogOut size={15} /> {t("nav.logout")}
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded || isSignedIn) {
    return (
      <div className="grid h-48 place-items-center text-center">
        <div>
          <Loader2 size={28} className="mx-auto animate-spin text-accent" />
          {slow && (
            <div className="mt-4">
              <p className="text-sm text-mute">{t("clerk.slow")}</p>
              <button onClick={() => window.location.reload()} className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold text-accent ring-1 ring-line">
                <RotateCcw size={14} /> {t("clerk.reload")}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <SignIn routing="hash" withSignUp forceRedirectUrl="/" signUpForceRedirectUrl="/" />;
}
