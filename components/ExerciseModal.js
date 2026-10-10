"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Pause, Play, RotateCcw, ShieldAlert, Timer, X, Zap } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import ExerciseFigure from "./ExerciseFigure";
import { useApp } from "./AppProvider";
import { exercises } from "@/data/exercises";
import { doseSeconds } from "@/lib/i18n";

function Countdown({ seconds }) {
  const { t } = useApp();
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(timer.current);
  }, [running]);

  useEffect(() => {
    if (left === 0) setRunning(false);
  }, [left]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-5 rounded-2xl bg-void/50 p-4 ring-1 ring-line">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#18f5b5"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - left / seconds)}
            style={{ transition: "stroke-dashoffset 1s linear", filter: "drop-shadow(0 0 6px rgba(24,245,181,.6))" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-ink">
          {mm}:{ss}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mute">
          <Timer size={14} /> {t("ex.timer")}
        </p>
        {left === 0 ? (
          <p className="mt-2 text-sm font-semibold text-accent">{t("ex.timeUp")}</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setRunning((v) => !v)}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-void transition hover:brightness-110"
            >
              {running ? <Pause size={16} /> : <Play size={16} fill="currentColor" />} {running ? t("ex.pause") : t("ex.start")}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setLeft(seconds);
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-ink-2 ring-1 ring-line transition hover:text-accent"
            >
              <RotateCcw size={15} /> {t("ex.reset")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Окно с объяснением задания: анимация техники, шаги, ошибки, таймер
export default function ExerciseModal({ open, onClose, day, index, canComplete, onComplete }) {
  const { t, L, dose, dayTitle } = useApp();
  if (!day) return <Modal open={false} onClose={onClose} />;
  const ex = exercises[day.ex];
  const seconds = doseSeconds(day.dose);

  return (
    <Modal open={open} onClose={onClose} className="max-w-5xl">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        {/* иллюстрация */}
        <div className="relative overflow-hidden rounded-t-[2rem] bg-void lg:rounded-l-[2rem] lg:rounded-tr-none">
          <div className="grid-lines absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {t("quest.day", { n: index + 1 })} · {t("ex.task")}
            </p>
            <h2 className="mt-2 pr-12 font-display text-4xl font-bold uppercase leading-none text-ink">{dayTitle(day)}</h2>
            {L(day.title) && <p className="mt-1 text-sm text-mute">{L(ex.name)}</p>}
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-lg bg-white/[0.06] px-3 py-1.5 font-bold text-ink">{dose(day.dose)}</span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-accent/10 px-3 py-1.5 font-bold text-accent-3">
                <Zap size={14} fill="currentColor" /> +{day.xp} XP
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="mx-auto mt-4 aspect-[6/5] w-full max-w-md"
            >
              <ExerciseFigure move={ex.figure} className="h-full w-full" />
            </motion.div>
            {seconds && <Countdown key={`${day.ex}-${index}`} seconds={seconds} />}
          </div>
        </div>

        {/* объяснение */}
        <div className="p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold uppercase text-ink">{t("ex.steps")}</h3>
          <ol className="mt-5 space-y-3">
            {L(ex.steps).map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex gap-4 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-line"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent font-display text-sm font-bold text-void">{i + 1}</span>
                <p className="text-sm leading-relaxed text-ink-2">{step}</p>
              </motion.li>
            ))}
          </ol>

          <h3 className="mt-8 flex items-center gap-2 font-display text-xl font-bold uppercase text-ink">
            <AlertTriangle size={18} className="text-flame" /> {t("ex.mistakes")}
          </h3>
          <ul className="mt-4 space-y-2">
            {L(ex.mistakes).map((m, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-flame/[0.06] px-4 py-3 text-sm text-ink-2 ring-1 ring-flame/15">
                <X size={16} className="mt-0.5 shrink-0 text-flame" strokeWidth={3} />
                {m}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-2 text-xs text-mute">
            <ShieldAlert size={14} /> {t("ex.safety")}
          </p>

          {canComplete && (
            <Button
              className="shimmer mt-6 w-full"
              onClick={() => {
                onComplete();
                onClose();
              }}
            >
              {t("quest.complete")} <Check size={18} strokeWidth={3} />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
