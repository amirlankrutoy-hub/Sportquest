"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Lock } from "lucide-react";
import GoogleButton from "./GoogleButton";
import EmailOtp from "./EmailOtp";
import ClerkLogin from "./ClerkLogin";
import { CLERK_KEY } from "./ClerkShell";
import { useApp } from "./AppProvider";
import { LANGS } from "@/lib/i18n";
import Icon from "./Icon";
import RunnerLogo from "./RunnerLogo";

const ERRORS = ["google_invalid", "not_configured"];

// Экран входа: без него на сайт не попасть
export default function LoginScreen() {
  const { t, lang, setLang } = useApp();
  const [error, setError] = useState("");

  return (
    <main className="relative grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      {/* визуальная часть */}
      <section className="relative hidden overflow-hidden lg:block">
        <Image src="/images/boxing.jpg" alt="" fill priority sizes="55vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-void/60 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        <div className="absolute inset-0 bg-accent/10 mix-blend-color" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <RunnerLogo size={54} />
            <span className="font-display text-2xl font-bold uppercase text-ink">
              Sport<span className="neon">Quest</span>
            </span>
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl font-display text-6xl font-bold uppercase leading-[0.95] text-ink xl:text-7xl"
            >
              {t("home.cta.title1")}
              <br />
              <span className="neon neon-glow">{t("home.cta.title2")}</span>
            </motion.h1>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Target", "Gamepad2", "MapPin"].map((icon, i) => (
                <motion.span
                  key={icon}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-ink-2"
                >
                  <Icon name={icon} size={16} className="text-accent" /> {t(`login.f${i + 1}`)}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* форма */}
      <section className="relative flex flex-col items-center justify-center px-5 py-16">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" />

        <div className="absolute right-5 top-5 flex gap-1 rounded-xl p-1 ring-1 ring-line">
          <Globe size={16} className="mx-1.5 self-center text-mute" />
          {LANGS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${l.id === lang ? "bg-accent text-void" : "text-mute hover:text-ink"}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative w-full max-w-md rounded-[2rem] p-7 shadow-2xl sm:p-9"
        >
          <span className="block lg:hidden"><RunnerLogo size={60} /></span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-accent lg:mt-0">{t("login.kicker")}</p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-ink">{t("login.title")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-mute">{t("login.text")}</p>

          {CLERK_KEY ? (
            // Clerk: настоящие письма с кодом и кнопка «Продолжить с Google»
            <div className="mt-7">
              <ClerkLogin />
            </div>
          ) : (
            <>
              <div className="mt-7 rounded-2xl bg-void/40 p-5 ring-1 ring-line">
                <EmailOtp />
              </div>

              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-mute">
                <span className="h-px flex-1 bg-line" /> {t("login.or")} <span className="h-px flex-1 bg-line" />
              </div>

              <GoogleButton onError={(code) => setError(t(`auth.err.${ERRORS.includes(code) ? code : "generic"}`))} />
              {error && <p className="mt-3 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300 ring-1 ring-red-500/20">{error}</p>}
            </>
          )}


          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-mute">
            <Lock size={12} /> {t("login.secure")}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
