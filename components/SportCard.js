"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Flame } from "lucide-react";
import { useApp } from "./AppProvider";
import { SportThumb } from "./Icon";

export function Difficulty({ value }) {
  const { t } = useApp();
  return (
    <span className="inline-flex items-center gap-1.5" title={t(`diff.${value}`)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-1.5 w-4 rounded-full ${n <= value ? "bg-accent shadow-[0_0_6px_rgba(24,245,181,.6)]" : "bg-white/10"}`} />
      ))}
    </span>
  );
}

export default function SportCard({ sport, match, onClick, index = 0 }) {
  const { t, L } = useApp();
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="card group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] text-left transition-[border-color,box-shadow] duration-300 hover:border-accent/35 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={sport.image}
          alt={L(sport.name)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
                {match != null && (
          <span className="absolute right-4 top-4 rounded-xl bg-void/70 px-3 py-1.5 font-display text-lg font-bold text-accent-3 ring-1 ring-accent/40 backdrop-blur">
            {match}%
          </span>
        )}
        <h3 className="absolute bottom-3 left-5 font-display text-3xl font-bold uppercase text-ink">{L(sport.name)}</h3>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-3">
        <p className="text-sm leading-relaxed text-mute">{L(sport.short)}</p>
        <div className="mt-auto space-y-3 pt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-mute">{t("common.difficulty")}</span>
            <Difficulty value={sport.difficulty} />
          </div>
          <div className="flex items-start gap-2 text-xs text-ink-2/80">
            <Dumbbell size={14} className="mt-0.5 shrink-0 text-accent" />
            <span>{L(sport.equipment).join(" · ")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-2/80">
            <Flame size={14} className="shrink-0 text-flame" />
            {t("sports.kcal", { kcal: sport.kcal })}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
