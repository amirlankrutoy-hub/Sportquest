"use client";

import { motion } from "framer-motion";

// Плавное появление при прокрутке
export default function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ kicker, title, text, center = false }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
        <span className="h-px w-8 bg-accent/60" />
        {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-ink sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-mute">{text}</p>}
    </Reveal>
  );
}
