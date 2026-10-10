"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion } from "framer-motion";
import { ArrowRight, Crown, MapPin } from "lucide-react";
import Button from "./Button";
import { Difficulty } from "./SportCard";
import { useApp } from "./AppProvider";

function MatchRing({ value, size = 96, delay = 0 }) {
  const [shown, setShown] = useState(0);
  const r = size / 2 - 7;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    const controls = animate(0, value, { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [value, delay]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(24,245,181,.6))" }}
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#29ffc3" />
            <stop offset="100%" stopColor="#00e5a0" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-ink">{shown}%</span>
    </div>
  );
}

export default function SportRecommendation({ sport, score, rank, onStart }) {
  const { t, L } = useApp();
  const best = rank === 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + rank * 0.15 }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] ${best ? "shadow-glow-lg ring-1 ring-accent/50" : "card"}`}
    >
      <div className={`relative w-full overflow-hidden ${best ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
        <Image src={sport.image} alt={L(sport.name)} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
        {best && (
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 text-xs font-black uppercase tracking-wider text-void">
            <Crown size={14} /> {t("results.best")}
          </span>
        )}
        <span className="absolute right-5 top-5 rounded-xl bg-void/60 px-3 py-1.5 font-display text-sm font-bold text-ink backdrop-blur">#{rank + 1}</span>
      </div>

      <div className="relative -mt-14 flex flex-1 flex-col bg-gradient-to-b from-transparent to-deep p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="mt-1 font-display text-4xl font-bold uppercase text-ink">{L(sport.name)}</h3>
          </div>
          <MatchRing value={score} delay={0.3 + rank * 0.15} size={best ? 104 : 88} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-mute">{L(sport.description)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {L(sport.traits).map((tr) => (
            <span key={tr} className="rounded-xl bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-3 ring-1 ring-accent/20">
              {tr}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-mute">
          <span>{t("common.difficulty")}</span>
          <Difficulty value={sport.difficulty} />
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto]">
          <Button onClick={onStart} variant={best ? "primary" : "dark"} className="w-full">
            {t("results.start")} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href={`/map?sport=${sport.id}`} variant="ghost" className="w-full">
            <MapPin size={18} /> {t("results.map")}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
