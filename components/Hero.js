"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame, PlayCircle, Zap } from "lucide-react";
import Button from "./Button";
import { useApp } from "./AppProvider";
import { getSport, sports } from "@/data/sports";
import { quests } from "@/data/quests";
import Icon, { SportThumb } from "./Icon";

const ATHLETES = [
  { src: "/images/boxing.jpg", alt: "Боксёр", sport: "boxing", cls: "left-[27%] top-[8%] h-[78%] w-[46%] z-20", rotate: 0, delay: 0.1, main: true },
  { src: "/images/hero-runner.jpg", alt: "Бегунья на закате", sport: "running", cls: "left-0 top-[3%] h-[38%] w-[30%] z-10", rotate: -5, delay: 0.25 },
  { src: "/images/swimming.jpg", alt: "Пловец", sport: "swimming", cls: "left-[2%] bottom-[8%] h-[38%] w-[32%] z-10", rotate: 4, delay: 0.35 },
  { src: "/images/hero-football.jpg", alt: "Футбольный мяч и бутса", sport: "football", cls: "right-0 top-[6%] h-[38%] w-[30%] z-10", rotate: 5, delay: 0.3 },
  { src: "/images/hero-athlete.jpg", alt: "Тренировка с канатами", sport: "fitness", cls: "right-[2%] bottom-[4%] h-[38%] w-[32%] z-10", rotate: -4, delay: 0.4 },
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  duration: 5 + (i % 5),
  delay: (i % 7) * 0.6,
}));

const ADVANTAGES = [
  { icon: "Target", n: 1 },
  { icon: "Gamepad2", n: 2 },
  { icon: "Star", n: 3 },
  { icon: "MapPin", n: 4 },
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

function Collage() {
  const { t, L } = useApp();
  return (
    <div className="relative mx-auto aspect-[1/1] w-full max-w-[620px] lg:aspect-[5/6]">
      {/* свечение и фон */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[90px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-[6%] rounded-full border border-accent/10" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-accent/10" />

      {/* линии движения */}
      {[18, 34, 62, 80].map((top, i) => (
        <div key={top} className="pointer-events-none absolute inset-x-0 z-30 h-px overflow-hidden" style={{ top: `${top}%` }}>
          <span
            className="motion-line block h-px w-1/2 bg-gradient-to-r from-transparent via-accent-3 to-transparent"
            style={{ animationDelay: `${i * 0.8}s`, opacity: 0.7 }}
          />
        </div>
      ))}

      {/* частицы */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute z-30 rounded-full bg-accent-3"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, boxShadow: "0 0 8px #29ffc3" }}
          animate={{ y: [0, -24, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {ATHLETES.map((a, i) => (
        <motion.div
          key={a.src}
          className={`absolute ${a.cls}`}
          initial={{ opacity: 0, scale: 0.85, rotate: a.rotate * 2, y: 40 }}
          animate={{ opacity: 1, scale: 1, rotate: a.rotate, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: a.delay }}
        >
          <motion.div
            className={`group relative h-full w-full overflow-hidden rounded-[1.75rem] border ${
              a.main ? "border-accent/40 shadow-glow-lg" : "border-white/10 shadow-2xl"
            }`}
            animate={{ y: [0, a.main ? -10 : i % 2 ? 8 : -8, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.04 }}
          >
            <Image src={a.src} alt={L(getSport(a.sport).name)} fill sizes="(max-width: 1024px) 50vw, 30vw" priority={a.main} className="object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
            <div className="absolute inset-0 bg-accent/10 mix-blend-color" />
            <span className="absolute bottom-3 left-3 rounded-lg bg-void/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-ink backdrop-blur">
              {L(getSport(a.sport).name)}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* плавающие виджеты */}
      <motion.div
        className="glass absolute -bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl"
        {...fadeUp(0.9)}
      >
        <SportThumb src="/images/boxing.jpg" className="h-10 w-10 rounded-xl" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-mute">{t("hero.best")}</p>
          <p className="font-display text-lg font-bold uppercase text-ink">
            {L(getSport("boxing").name)} <span className="neon">92%</span>
          </p>
        </div>
      </motion.div>
      <motion.div
        className="glass absolute -left-2 top-[46%] z-40 hidden items-center gap-2 rounded-2xl px-3.5 py-2.5 sm:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 1.1 }, x: { delay: 1.1 }, y: { duration: 4, repeat: Infinity, delay: 1.1 } }}
      >
        <Zap size={16} className="text-accent" fill="currentColor" />
        <span className="font-display text-base font-bold text-ink">+100 XP</span>
      </motion.div>
      <motion.div
        className="glass absolute -right-2 top-[48%] z-40 hidden items-center gap-2 rounded-2xl px-3.5 py-2.5 sm:flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.25 }, x: { delay: 1.25 }, y: { duration: 4.5, repeat: Infinity, delay: 1.25 } }}
      >
        <Flame size={16} className="text-flame" fill="currentColor" />
        <span className="font-display text-base font-bold text-ink">{t("hero.streak")}</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { t, plural } = useApp();
  return (
    <section className="relative overflow-hidden">
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0" />
      <p className="text-outline pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold uppercase leading-none opacity-[0.12]">
        Sport Quest
      </p>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pt-16">
        <div>
          <motion.span
            {...fadeUp(0)}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("hero.badge")}
          </motion.span>

          <motion.h1 {...fadeUp(0.1)} className="mt-7 font-display font-bold uppercase leading-[0.9] text-ink">
            <span className="block text-[clamp(2.6rem,6vw,4.5rem)]">{t("hero.find")}</span>
            <span className="neon neon-glow block text-[clamp(5.5rem,15vw,11.5rem)] tracking-tight">{t("hero.sport")}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2/80">
            {t("hero.text")}
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap gap-3">
            <Button href="/quiz" className="shimmer">
              {t("hero.cta")}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/#how" variant="ghost">
              <PlayCircle size={20} /> {t("nav.how")}
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-10 flex items-center gap-6 text-sm text-mute">
            <div>
              <p className="font-display text-3xl font-bold text-ink">{sports.length}</p>
              <p>{plural(sports.length, "hero.stat1")}</p>
            </div>
            <span className="h-10 w-px bg-line" />
            <div>
              <p className="font-display text-3xl font-bold text-ink">{Object.keys(quests).length}</p>
              <p>{plural(Object.keys(quests).length, "hero.stat2")}</p>
            </div>
            <span className="h-10 w-px bg-line" />
            <div>
              <p className="font-display text-3xl font-bold text-ink">0 ₽</p>
              <p>{t("hero.stat3")}</p>
            </div>
          </motion.div>
        </div>

        <Collage />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-3 px-4 pb-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {ADVANTAGES.map((a, i) => (
          <motion.div
            key={a.n}
            {...fadeUp(0.5 + i * 0.08)}
            whileHover={{ y: -4 }}
            className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent/30"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition group-hover:scale-110">
              <Icon name={a.icon} size={22} />
            </span>
            <div>
              <p className="font-semibold leading-tight text-ink">{t(`adv.${a.n}.t`)}</p>
              <p className="mt-0.5 text-xs text-mute">{t(`adv.${a.n}.d`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
