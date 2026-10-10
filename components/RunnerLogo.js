"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Логотип-бегун из 4 слоёв (public/logo): когда мышка подходит близко, он начинает бежать —
// руки машут в противофазе, тело подпрыгивает в ритме шагов, сзади появляются линии скорости.
const STEP = 0.34; // длительность одного шага, с
const run = (values, duration = STEP * 2) => ({ ...values, transition: { duration, repeat: Infinity, ease: "easeInOut" } });
const rest = { rotate: 0, y: 0, x: 0, transition: { duration: 0.45, ease: "easeOut" } };

const LAYERS = [
  { src: "/logo/arm-back.png", origin: "55% 22%", run: run({ rotate: [-24, 26, -24] }) },
  { src: "/logo/body.png", origin: "42% 62%", run: run({ rotate: [-5, 5, -5], x: ["-2%", "2%", "-2%"] }) },
  { src: "/logo/head.png", origin: "70% 15%", run: run({ y: ["0%", "-3%", "0%"] }, STEP) },
  { src: "/logo/arm-front.png", origin: "70% 32%", run: run({ rotate: [24, -26, 24] }) },
];

export default function RunnerLogo({ size = 40, radius = 90, className = "", always = false }) {
  const ref = useRef(null);
  const [near, setRunning] = useState(false);
  const running = always || near;
  const touchTimer = useRef(null);

  // бег начинается, когда курсор ближе radius пикселей к центру логотипа
  useEffect(() => {
    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        setRunning(d < radius);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [radius]);

  // на телефоне — касание запускает короткую пробежку
  const onTouch = () => {
    setRunning(true);
    clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setRunning(false), 1600);
  };

  const height = Math.round((size * 449) / 512);

  return (
    <span ref={ref} onTouchStart={onTouch} className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height }} aria-hidden="true">
      {/* линии скорости позади бегуна */}
      {[0.32, 0.55, 0.78].map((top, i) => (
        <motion.span
          key={top}
          className="absolute right-[78%] h-[2px] rounded-full bg-accent"
          style={{ top: `${top * 100}%`, width: size * (0.45 - i * 0.08) }}
          initial={false}
          animate={running ? { opacity: [0, 0.9, 0], x: [size * 0.15, -size * 0.25] } : { opacity: 0, x: 0 }}
          transition={running ? { duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: "easeOut" } : { duration: 0.2 }}
        />
      ))}

      {/* весь бегун: подпрыгивает на каждом шаге и наклоняется вперёд */}
      <motion.span
        className="absolute inset-0 block"
        initial={false}
        animate={running ? { y: ["0%", "-9%", "0%"], rotate: 6, transition: { y: { duration: STEP, repeat: Infinity, ease: "easeOut" }, rotate: { duration: 0.3 } } } : rest}
        style={{ filter: "drop-shadow(0 0 10px rgba(24,245,181,.45))" }}
      >
        {LAYERS.map((l) => (
          <motion.img
            key={l.src}
            src={l.src}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none"
            style={{ transformOrigin: l.origin }}
            initial={false}
            animate={running ? l.run : rest}
          />
        ))}
      </motion.span>
    </span>
  );
}
