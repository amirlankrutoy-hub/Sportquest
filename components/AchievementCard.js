"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useApp } from "./AppProvider";
import Icon from "./Icon";

export default function AchievementCard({ achievement: a, unlocked, progress, index = 0 }) {
  const { t, L } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative overflow-hidden rounded-[1.5rem] border p-5 ${
        unlocked ? "border-accent/35 bg-gradient-to-br from-accent/[0.12] to-transparent" : "border-line bg-deep/70"
      }`}
    >
      {unlocked && <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/25 blur-2xl" />}
      <div className="flex items-start justify-between">
        <span className={`grid h-14 w-14 place-items-center rounded-2xl ${unlocked ? "bg-accent/15 text-accent-3" : "bg-white/[0.04] text-mute"}`}>
          <Icon name={a.icon} size={26} />
        </span>
        {unlocked ? (
          <span className="rounded-lg bg-accent px-2 py-1 text-[10px] font-black uppercase tracking-wider text-void">{t("ach.open")}</span>
        ) : (
          <Lock size={16} className="text-mute" />
        )}
      </div>
      <p className="mt-4 font-semibold leading-snug text-ink">{L(a.title)}</p>
      <p className="mt-1 text-xs leading-relaxed text-mute">{L(a.description)}</p>
      {!unlocked && progress && (
        <div className="mt-4">
          <ProgressBar value={progress[0] / progress[1]} height="h-1.5" glow={false} />
          <p className="mt-1.5 text-[11px] text-mute">
            {progress[0]} / {progress[1]}
          </p>
        </div>
      )}
      {a.xp > 0 && <p className={`mt-3 text-xs font-bold ${unlocked ? "text-accent" : "text-mute"}`}>+{a.xp} XP</p>}
    </motion.div>
  );
}
