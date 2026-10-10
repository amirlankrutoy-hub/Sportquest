"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const VARIANTS = {
  primary:
    "relative overflow-hidden bg-gradient-to-r from-accent-3 via-accent to-accent-2 text-void shadow-glow hover:shadow-glow-lg",
  ghost: "glass text-ink hover:border-accent/40 hover:text-accent-3",
  dark: "bg-white/[0.04] text-ink ring-1 ring-white/10 hover:bg-white/[0.08]",
};

const SIZES = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const MotionLink = motion.create(Link);

export default function Button({ href, variant = "primary", size = "lg", className = "", children, ...props }) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-2xl font-bold tracking-wide transition-[box-shadow,background-color,color,border-color] duration-300 disabled:pointer-events-none disabled:opacity-40 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 }, transition: { type: "spring", stiffness: 400, damping: 22 } };

  if (href) {
    return (
      <MotionLink href={href} className={cls} {...motionProps} {...props}>
        {children}
      </MotionLink>
    );
  }
  return (
    <motion.button className={cls} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
