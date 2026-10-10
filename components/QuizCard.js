"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useApp } from "./AppProvider";
import Icon from "./Icon";

export default function QuizCard({ option, selected, onSelect, index, hotkey }) {
  const { L } = useApp();
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={`group relative flex min-h-40 flex-col items-start overflow-hidden rounded-[1.75rem] border p-6 text-left transition-[border-color,background-color,box-shadow] duration-300 sm:min-h-52 sm:p-7 ${
        selected
          ? "border-accent/70 bg-accent/[0.08] shadow-glow-lg"
          : "card hover:border-accent/30"
      }`}
    >
      <motion.span
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/30 blur-3xl"
        animate={{ opacity: selected ? 1 : 0 }}
      />
      <span className="flex w-full items-start justify-between">
        <span className={`grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${selected ? "bg-accent/15 text-accent-3" : "bg-white/[0.04] text-ink-2"}`}>
          <Icon name={option.icon} size={30} strokeWidth={1.8} />
        </span>
        <span
          className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-bold transition ${
            selected ? "border-accent bg-accent text-void" : "border-line text-mute"
          }`}
        >
          {selected ? <Check size={16} strokeWidth={3} /> : hotkey}
        </span>
      </span>
      <span className="mt-auto pt-6">
        <span className="block font-display text-2xl font-bold uppercase text-ink sm:text-3xl">{L(option.title)}</span>
        <span className={`mt-1 block text-sm transition ${selected ? "text-accent-3" : "text-mute"}`}>{L(option.subtitle)}</span>
      </span>
    </motion.button>
  );
}
