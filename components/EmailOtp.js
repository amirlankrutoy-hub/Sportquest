"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, KeyRound, Loader2, Mail, MailCheck, RotateCcw } from "lucide-react";
import Button from "./Button";
import { useApp } from "./AppProvider";

const ERRORS = ["email_invalid", "code_wait", "code_invalid", "code_expired", "code_attempts", "mail_failed"];
const slide = {
  initial: (dir) => ({ opacity: 0, x: dir * 40 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -40 }),
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

function CodeInput({ value, onChange, onComplete, disabled, error }) {
  const refs = useRef([]);

  const setAt = (i, digit) => {
    const next = value.slice();
    next[i] = digit;
    onChange(next);
    if (next.every((d) => d !== "")) onComplete(next.join(""));
  };

  const handleChange = (i, raw) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length > 1) {
      // вставка всего кода сразу
      const next = value.slice();
      digits.slice(0, 6 - i).split("").forEach((d, k) => (next[i + k] = d));
      onChange(next);
      refs.current[Math.min(i + digits.length, 5)]?.focus();
      if (next.every((d) => d !== "")) onComplete(next.join(""));
      return;
    }
    setAt(i, digits);
    if (digits && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  return (
    <motion.div className="flex justify-between gap-2" animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
      {value.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={6}
          disabled={disabled}
          aria-label={`${i + 1}`}
          className={`h-14 w-full min-w-0 rounded-2xl border bg-void/70 text-center font-display text-2xl font-bold text-ink outline-none transition sm:h-16 ${
            error ? "border-red-500/60" : d ? "border-accent/70 shadow-[0_0_14px_rgba(24,245,181,.25)]" : "border-line focus:border-accent/60"
          }`}
        />
      ))}
    </motion.div>
  );
}

// Вход по почте: шаг 1 — Gmail, шаг 2 — код из письма
export default function EmailOtp() {
  const { requestCode, auth, t } = useApp();
  const [step, setStep] = useState("email");
  const [dir, setDir] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const [demoCode, setDemoCode] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (resendLeft <= 0) return;
    const id = setTimeout(() => setResendLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendLeft]);

  const errorText = (err) => t(`auth.err.${ERRORS.includes(err.message) ? err.message : "generic"}`, { s: err.wait ?? 60 });

  const send = async (isResend = false) => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const data = await requestCode(email.trim());
      setDemoCode(data.devCode ?? null);
      setResendLeft(data.resendIn ?? 60);
      setCode(["", "", "", "", "", ""]);
      if (isResend) setNotice(t("otp.sent"));
      else {
        setDir(1);
        setStep("code");
      }
    } catch (err) {
      setError(errorText(err));
      if (err.wait) setResendLeft(err.wait);
    } finally {
      setLoading(false);
    }
  };

  const verify = async (value) => {
    setLoading(true);
    setError("");
    try {
      await auth("email/verify", { email: email.trim(), code: value });
    } catch (err) {
      setError(errorText(err));
      setCode(["", "", "", "", "", ""]);
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        {step === "email" ? (
          <motion.form
            key="email"
            custom={dir}
            {...slide}
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mute">{t("otp.step", { n: 1 })}</p>
            <h3 className="mt-1 font-display text-2xl font-bold uppercase text-ink">{t("otp.emailTitle")}</h3>
            <p className="mt-1 text-sm text-mute">{t("otp.emailText")}</p>
            <label className="mt-5 block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-mute">{t("otp.emailLabel")}</span>
              <span className="relative block">
                <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-2xl border border-line bg-void/60 py-3.5 pl-11 pr-4 text-ink outline-none transition placeholder:text-mute/60 focus:border-accent/60 focus:shadow-[0_0_0_4px_rgba(24,245,181,.1)]"
                />
              </span>
            </label>
            {error && <p className="mt-3 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300 ring-1 ring-red-500/20">{error}</p>}
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {t("otp.getCode")} {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </Button>
          </motion.form>
        ) : (
          <motion.div key="code" custom={dir} {...slide}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mute">{t("otp.step", { n: 2 })}</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
                <MailCheck size={20} />
              </span>
              <h3 className="font-display text-2xl font-bold uppercase leading-tight text-ink">{t("otp.codeTitle")}</h3>
            </div>
            <p className="mt-3 text-sm text-mute">
              {t("otp.codeSent")} <span className="font-semibold text-ink">{email.trim()}</span>
            </p>

            {demoCode && (
              <div className="mt-4 rounded-2xl border border-dashed border-flame/40 bg-flame/[0.06] px-4 py-3 text-xs leading-relaxed text-flame">
                <KeyRound size={14} className="mb-1 inline" /> {t("otp.demo")}{" "}
                <span className="font-display text-base font-bold tracking-[0.3em] text-ink">{demoCode}</span>
              </div>
            )}

            <div className="mt-5">
              <CodeInput value={code} onChange={setCode} onComplete={verify} disabled={loading} error={Boolean(error)} />
            </div>
            {error && <p className="mt-3 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300 ring-1 ring-red-500/20">{error}</p>}
            {notice && !error && <p className="mt-3 text-center text-sm text-accent">{notice}</p>}

            <Button className="mt-4 w-full" disabled={loading || code.some((d) => d === "")} onClick={() => verify(code.join(""))}>
              {loading && <Loader2 size={18} className="animate-spin" />}
              {t("otp.verify")}
            </Button>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <button
                type="button"
                onClick={() => {
                  setDir(-1);
                  setStep("email");
                  setError("");
                }}
                className="inline-flex items-center gap-1.5 text-mute transition hover:text-ink"
              >
                <ArrowLeft size={15} /> {t("otp.change")}
              </button>
              <button
                type="button"
                disabled={resendLeft > 0 || loading}
                onClick={() => send(true)}
                className="inline-flex items-center gap-1.5 font-semibold text-accent transition disabled:cursor-default disabled:text-mute"
              >
                <RotateCcw size={14} /> {resendLeft > 0 ? t("otp.resendIn", { s: resendLeft }) : t("otp.resend")}
              </button>
            </div>
            {!demoCode && <p className="mt-3 text-center text-xs text-mute">{t("otp.spam")}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
