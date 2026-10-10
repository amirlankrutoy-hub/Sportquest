"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, UserRound } from "lucide-react";
import LoginScreen from "./LoginScreen";
import Button from "./Button";
import { useApp } from "./AppProvider";
import RunnerLogo from "./RunnerLogo";

// Новый пользователь подтвердил почту: просим имя для профиля
function NameStep() {
  const { setName, user, t } = useApp();
  const [name, setValue] = useState("");

  return (
    <main className="relative grid min-h-dvh place-items-center px-5">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" />
      <motion.form
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) setName(name.trim());
        }}
        className="glass relative w-full max-w-md rounded-[2rem] p-7 shadow-2xl sm:p-9"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent-3 to-accent-2 text-void shadow-glow">
          <UserRound size={26} />
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-none text-ink">{t("name.title")}</h1>
        <p className="mt-3 text-sm text-mute">{t("name.text")}</p>
        <p className="mt-1 text-sm font-semibold text-accent">{user.email}</p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setValue(e.target.value)}
          maxLength={40}
          placeholder={t("auth.name")}
          className="mt-6 w-full rounded-2xl border border-line bg-void/60 px-4 py-3.5 text-lg text-ink outline-none transition placeholder:text-mute/60 focus:border-accent/60 focus:shadow-[0_0_0_4px_rgba(24,245,181,.1)]"
        />
        <Button type="submit" className="mt-4 w-full" disabled={!name.trim()}>
          {t("name.continue")} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.form>
    </main>
  );
}

// Пускает на сайт только после входа (код из письма или Google)
export default function AuthGate({ children }) {
  const { ready, user, needsName } = useApp();

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <RunnerLogo size={84} always />
      </div>
    );
  }
  if (!user.token) return <LoginScreen />;
  if (needsName) return <NameStep />;
  return children;
}
