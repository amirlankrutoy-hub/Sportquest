"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useApp } from "./AppProvider";
import Icon from "./Icon";

const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 120 + (i % 3) * 40;
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 4 + (i % 4) * 2, delay: (i % 5) * 0.03 };
});

// Анимация получения опыта: вспышка, частицы и список открытых достижений
export default function XPBurst({ burst, onDone }) {
  const { t, L, questName } = useApp();
  const label = burst?.label && (burst.label.questId ? t(burst.label.key, { name: questName(burst.label.questId) }) : t(burst.label.key, burst.label.vars));
  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(onDone, burst.achievements.length || burst.levelUp ? 3400 : 2200);
    return () => clearTimeout(t);
  }, [burst, onDone]);

  return (
    <AnimatePresence>
      {burst && (
        <motion.div
          key={burst.id}
          className="pointer-events-none fixed inset-0 z-[90] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          <div className="absolute inset-0 bg-void/75 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,245,181,.22),transparent_55%)]" />

          <div className="relative flex flex-col items-center">
            {PARTICLES.map((p, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-16 rounded-full bg-accent-3"
                style={{ width: p.size, height: p.size, boxShadow: "0 0 12px #29ffc3" }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: p.delay }}
              />
            ))}

            <motion.div
              className="relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-accent-3 to-accent-2 text-void shadow-glow-lg"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: [0, 1.2, 1], rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-accent-3"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <Zap size={54} fill="currentColor" strokeWidth={1.5} />
            </motion.div>

            {burst.amount > 0 && (
              <motion.p
                className="neon neon-glow mt-6 font-display text-6xl font-bold sm:text-7xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
              >
                +{burst.amount} XP
              </motion.p>
            )}
            {label && (
              <motion.p className="mt-2 text-lg font-semibold text-ink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                {label}
              </motion.p>
            )}

            {burst.levelUp && (
              <motion.div
                className="glass mt-5 rounded-2xl px-5 py-3 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{t("xp.newLevel")}</p>
                <p className="font-display text-2xl font-bold uppercase text-ink">{t(burst.levelUp)}</p>
              </motion.div>
            )}

            <div className="mt-4 flex flex-col items-center gap-2">
              {burst.achievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-2.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent-3"><Icon name={a.icon} size={20} /></span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-accent">{t("ach.unlocked")}</p>
                    <p className="text-sm font-semibold text-ink">{L(a.title)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
