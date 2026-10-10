"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, Lock, Zap } from "lucide-react";
import ExerciseFigure from "./ExerciseFigure";
import { useApp } from "./AppProvider";
import { exercises } from "@/data/exercises";

// status: done | current | locked
export default function QuestCard({ day, index, status, onComplete, onHow }) {
  const { t, L, dose, dayTitle } = useApp();
  const done = status === "done";
  const current = status === "current";
  const locked = status === "locked";
  const ex = exercises[day.ex];

  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-16 sm:pl-20"
    >
      {/* узел таймлайна */}
      <span className="absolute left-0 top-6 flex w-12 justify-center sm:w-14">
        <motion.span
          layout
          className={`relative grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-bold sm:h-14 sm:w-14 ${
            done
              ? "bg-gradient-to-br from-accent-3 to-accent-2 text-void shadow-glow"
              : current
              ? "bg-panel-2 text-accent-3 ring-2 ring-accent"
              : "bg-panel text-mute ring-1 ring-line"
          }`}
        >
          {current && <span className="absolute inset-0 animate-ping rounded-2xl ring-2 ring-accent/50" />}
          <AnimatePresence mode="wait">
            {done ? (
              <motion.span key="done" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <Check size={24} strokeWidth={3} />
              </motion.span>
            ) : (
              <motion.span key="num">{index + 1}</motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>

      <motion.div
        layout
        whileHover={!locked ? { scale: 1.01 } : undefined}
        className={`relative overflow-hidden rounded-[1.5rem] border transition-colors duration-500 ${
          done ? "border-accent/30 bg-accent/[0.05]" : current ? "glass border-accent/40 shadow-glow" : "border-line bg-deep/60 opacity-60"
        }`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* превью техники */}
          <button
            type="button"
            onClick={onHow}
            disabled={locked}
            aria-label={t("quest.how")}
            className="group relative aspect-[6/4] shrink-0 border-b border-line bg-void/50 sm:aspect-auto sm:w-44 sm:border-b-0 sm:border-r"
          >
            <ExerciseFigure move={ex.figure} className="h-full w-full p-2" />
            {!locked && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-void/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent opacity-0 transition group-hover:opacity-100">
                {t("quest.how")}
              </span>
            )}
          </button>

          <div className="flex-1 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${done || current ? "text-accent" : "text-mute"}`}>{t("quest.day", { n: index + 1 })}</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-ink">{dayTitle(day)}</h3>
                {L(day.title) && <p className="text-xs text-mute">{L(ex.name)}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-lg bg-white/[0.05] px-2.5 py-1.5 font-semibold text-ink-2">{dose(day.dose)}</span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-accent/10 px-2.5 py-1.5 font-bold text-accent-3">
                  <Zap size={14} fill="currentColor" /> +{day.xp} XP
                </span>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-mute">{L(ex.steps)[0]}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {done && (
                <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mr-2 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  <Check size={16} strokeWidth={3} /> {t("quest.complete")}
                </motion.span>
              )}
              {current && (
                <motion.button
                  onClick={onComplete}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="shimmer relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-accent-3 via-accent to-accent-2 px-5 font-bold text-void shadow-glow"
                >
                  {t("quest.complete")} <Check size={18} strokeWidth={3} />
                </motion.button>
              )}
              {!locked && (
                <button
                  onClick={onHow}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-bold text-ink-2 ring-1 ring-line transition hover:text-accent hover:ring-accent/40"
                >
                  <BookOpen size={16} /> {t("quest.how")}
                </button>
              )}
              {locked && (
                <span className="inline-flex items-center gap-2 text-sm text-mute">
                  <Lock size={14} /> {t("quest.locked", { n: index })}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
