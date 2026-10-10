"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ClipboardList, Flame, MapPin, Medal, Navigation, Rocket, Target } from "lucide-react";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import Reveal, { SectionHeading } from "@/components/Reveal";
import ProgressBar from "@/components/ProgressBar";
import ExerciseFigure from "@/components/ExerciseFigure";
import { useApp } from "@/components/AppProvider";
import { sports } from "@/data/sports";
import Icon, { SportThumb } from "@/components/Icon";
import { exercises } from "@/data/exercises";

const STEPS = [ClipboardList, Target, Rocket, Medal];

export default function Home() {
  const { t, L, plural } = useApp();

  return (
    <main>
      <Hero />

      {/* ПРОБЛЕМА */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          kicker={t("home.problem.kicker")}
          title={
            <>
              {t("home.problem.title1")} <span className="text-mute">{t("home.problem.title2")}</span>
            </>
          }
          text={t("home.problem.text")}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n, i) => (
            <Reveal key={n} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="card group h-full rounded-[1.75rem] p-7 transition-colors hover:border-accent/30">
                <span className="text-outline font-display text-6xl font-bold">0{n}</span>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase text-ink">{t(`home.p${n}.t`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{t(`home.p${n}.d`)}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section id="how" className="relative scroll-mt-20 border-y border-line bg-deep/60">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60%] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <SectionHeading center kicker={t("nav.how")} title={t("home.how.title")} />
          <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              className="absolute left-[12%] right-[12%] top-10 hidden h-px origin-left bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {STEPS.map((Icon, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12} className="relative text-center">
                <motion.span
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-panel-2 to-deep text-accent ring-1 ring-accent/30"
                >
                  <Icon size={30} />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent font-display text-sm font-bold text-void">{i + 1}</span>
                </motion.span>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase text-ink">{t(`home.s${i + 1}.t`)}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-mute">{t(`home.s${i + 1}.d`, { n: sports.length })}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center" delay={0.3}>
            <Button href="/quiz">
              {t("home.how.cta")} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ВИДЫ СПОРТА */}
      <section className="py-24">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
          <SectionHeading kicker={t("home.catalog.kicker")} title={t("home.catalog.title", { n: sports.length, w: plural(sports.length, "hero.stat1") })} text={t("home.catalog.text")} />
          <Reveal>
            <Link href="/sports" className="group inline-flex items-center gap-2 font-semibold text-accent">
              {t("home.catalog.all")} <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
        <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {sports.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05} className="snap-start">
              <Link href={`/sports?open=${s.id}`} className="group relative block h-96 w-64 overflow-hidden rounded-[1.75rem] border border-line sm:w-72">
                <Image src={s.image} alt={L(s.name)} fill sizes="300px" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                <div className="absolute inset-0 bg-accent/0 transition duration-500 group-hover:bg-accent/10" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mt-2 font-display text-3xl font-bold uppercase text-ink">{L(s.name)}</h3>
                  <p className="mt-1 text-sm text-ink-2/70">{L(s.traits).join(" · ")}</p>
                </div>
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-void/50 text-ink opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* КАРТА */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-line bg-deep/60 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <SectionHeading kicker={t("home.map.kicker")} title={t("home.map.title")} text={t("home.map.text")} />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
              {["swimming", "football", "tennis", "fitness"].map((id) => {
                const s = sports.find((x) => x.id === id);
                return (
                  <Link key={id} href={`/map?sport=${id}`} className="glass flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-ink-2 transition hover:border-accent/40 hover:text-accent">
                    <SportThumb src={s.image} className="h-6 w-6 rounded-full" ring={false} /> {L(s.name)}
                  </Link>
                );
              })}
            </Reveal>
            <Reveal delay={0.3}>
              <Button href="/map" className="mt-8">
                <MapPin size={20} /> {t("home.map.cta")}
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-void">
              <div className="grid-lines absolute inset-0 opacity-70" />
              {/* стилизованная карта */}
              <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
                <path d="M-10 210 C 80 190, 140 240, 220 200 S 360 150, 420 170" stroke="#3de0ff" strokeOpacity=".35" strokeWidth="10" fill="none" />
                <path d="M40 -10 L 120 310 M 250 -10 L 210 310 M -10 90 L 410 120 M -10 260 L 410 230" stroke="#d9e4e5" strokeOpacity=".08" strokeWidth="6" />
                <motion.path
                  d="M200 150 C 230 130, 260 110, 300 90"
                  stroke="#18f5b5"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
              </svg>
              {[
                [75, 30, "/images/swimming.jpg", "1.2 km"],
                [36, 62, "/images/football.jpg", "800 m"],
                [60, 78, "/images/tennis.jpg", "2.1 km"],
                [22, 28, "/images/fitness.jpg", "1.6 km"],
              ].map(([x, y, e, d], i) => (
                <motion.div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.5 + i * 0.12 }}
                >
                  <SportThumb src={e} className={`h-11 w-11 rounded-full border-2 ${i === 0 ? "border-accent shadow-glow" : "border-white/20"}`} ring={false} />
                  <span className="mt-1 block whitespace-nowrap text-center text-[10px] font-bold text-ink-2">{d}</span>
                </motion.div>
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute -inset-3 animate-ping rounded-full bg-accent/30" />
                <span className="relative block h-4 w-4 rounded-full border-[3px] border-void bg-accent-3 shadow-[0_0_16px_#29ffc3]" />
              </div>
              <div className="glass absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl p-3 sm:right-auto">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-void">
                  <Navigation size={18} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">{t("map.nearest")}</p>
                  <p className="text-sm font-semibold text-ink">{L(sports.find((s) => s.id === "swimming").name)} · 1.2 km</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ГЕЙМИФИКАЦИЯ */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            kicker={t("home.game.kicker")}
            title={
              <>
                {t("home.game.title1")} <span className="neon">{t("home.game.title2")}</span>
              </>
            }
            text={t("home.game.text")}
          />
          <Reveal delay={0.15}>
            <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-mute">{t("xp.level", { n: 1 })}</p>
                  <p className="font-display text-3xl font-bold uppercase text-ink">{t("level.0")}</p>
                </div>
                <span className="rounded-xl bg-flame/10 px-3 py-1.5 text-sm font-bold text-flame ring-1 ring-flame/25"><Flame size={14} className="mb-0.5 inline" fill="currentColor" /> 4 {plural(4, "xp.days")}</span>
              </div>
              <p className="mt-6 font-display text-xl font-bold text-ink">350 / 500 XP</p>
              <ProgressBar value={0.7} className="mt-3" height="h-3" />
              <div className="mt-6 grid items-center gap-4 sm:grid-cols-[150px_1fr]">
                <div className="aspect-square rounded-2xl bg-void/60 ring-1 ring-line">
                  <ExerciseFigure move="pushup" className="h-full w-full" />
                </div>
                <div className="space-y-2">
                  {[
                    [t("quest.day", { n: 3 }), "pushup", true],
                    [t("quest.day", { n: 4 }), "plank", false],
                  ].map(([day, ex, done]) => (
                    <div key={day} className="flex items-center justify-between rounded-xl bg-void/50 px-4 py-3 text-sm">
                      <span className="text-ink-2">
                        {day} · {L(exercises[ex].name)}
                      </span>
                      <span className={`inline-flex items-center gap-1 ${done ? "font-bold text-accent" : "text-mute"}`}>{done && <Check size={14} strokeWidth={3} />}+100 XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/25">
            <Image src="/images/hero-runner.jpg" alt="" fill sizes="100vw" className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/30" />
            <div className="relative px-6 py-20 sm:px-14 sm:py-24">
              <h2 className="max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] text-ink sm:text-7xl">
                {t("home.cta.title1")}
                <br />
                <span className="neon neon-glow">{t("home.cta.title2")}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-ink-2/80">{t("home.cta.text")}</p>
              <Button href="/quiz" className="mt-9">
                {t("hero.cta")} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
