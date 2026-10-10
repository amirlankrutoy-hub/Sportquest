"use client";

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useApp } from "./AppProvider";

export function StreakBadge({ streak, className = "" }) {
  const { plural } = useApp();
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-xl bg-flame/10 px-3 py-1.5 text-sm font-bold text-flame ring-1 ring-flame/25 ${className}`}>
      <motion.span animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
        <Flame size={16} fill="currentColor" />
      </motion.span>
      {streak} {plural(streak, "xp.days")}
    </span>
  );
}

export default function XPBar({ compact = false }) {
  const { xp, level, streak, t } = useApp();
  const inLevel = xp - level.from;
  const span = level.to - level.from;

  return (
    <div className={compact ? "" : "card rounded-3xl p-5 sm:p-6"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
            <Zap size={22} fill="currentColor" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-mute">{t("xp.level", { n: level.index })}</p>
            <p className="font-display text-2xl font-bold uppercase text-ink">{level.name}</p>
          </div>
        </div>
        <StreakBadge streak={streak} />
      </div>
      <div className="mt-5 flex items-baseline justify-between text-sm">
        <motion.span key={xp} initial={{ scale: 1.25, color: "#29ffc3" }} animate={{ scale: 1, color: "#ffffff" }} className="font-display text-xl font-bold">
          {level.next ? `${inLevel} / ${span} XP` : `${xp} XP`}
        </motion.span>
        <span className="text-mute">{level.next ? t("xp.toNext", { next: level.next }) : t("xp.max")}</span>
      </div>
      <ProgressBar value={level.next ? inLevel / span : 1} className="mt-3" height="h-3" />
    </div>
  );
}

