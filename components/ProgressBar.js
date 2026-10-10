"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ value, height = "h-2.5", className = "", glow = true, delay = 0 }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className={`relative overflow-hidden rounded-full bg-white/[0.06] ${height} ${className}`}>
      <motion.div
        className={`shimmer relative h-full overflow-hidden rounded-full bg-gradient-to-r from-accent-2 via-accent to-accent-3 ${
          glow ? "shadow-[0_0_18px_rgba(24,245,181,.55)]" : ""
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </div>
  );
}
