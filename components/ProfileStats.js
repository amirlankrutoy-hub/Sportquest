"use client";

import { motion } from "framer-motion";
import { useApp } from "./AppProvider";

export default function ProfileStats({ stats }) {
  const { t } = useApp();
  return (
    <div className="space-y-5">
      {stats.map((s, i) => (
        <div key={s.id}>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-semibold text-ink">{t(`stat.${s.id}`)}</span>
            <span className="font-display text-lg font-bold text-ink">
              {s.value}
              <span className="text-mute">/5</span>
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[0, 1, 2, 3, 4].map((n) => (
              <div key={n} className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-2 to-accent-3 shadow-[0_0_10px_rgba(24,245,181,.5)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: n < s.value ? "100%" : 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 + n * 0.08 }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
