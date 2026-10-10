"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import SportRecommendation from "@/components/SportRecommendation";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/AppProvider";
import { getSport } from "@/data/sports";
import Icon, { SportThumb } from "@/components/Icon";
import { explain } from "@/lib/scoring";

export default function ResultsPage() {
  const router = useRouter();
  const { results, answers, startQuest, ready, t, L } = useApp();

  if (!ready) return <main className="min-h-[60vh]" />;

  if (!results.length) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-accent/10 text-accent ring-1 ring-accent/30"><Icon name="Target" size={40} /></span>
        <h1 className="mt-6 font-display text-4xl font-bold uppercase text-ink">{t("results.emptyTitle")}</h1>
        <p className="mt-3 text-mute">{t("results.emptyText")}</p>
        <Button href="/quiz" className="mt-8">
          {t("home.how.cta")}
        </Button>
      </main>
    );
  }

  const top = results.slice(0, 3);
  const rest = results.slice(3);
  const reasons = explain(answers);

  const start = (id) => {
    startQuest(id);
    router.push("/quest");
  };

  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[70%] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            <Sparkles size={16} /> {t("results.kicker")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-3 font-display text-5xl font-bold uppercase leading-none text-ink sm:text-7xl"
          >
            {t("results.title1")} <span className="neon neon-glow">{t("results.title2")}</span>
          </motion.h1>
        </div>
        <Button href="/quiz" variant="ghost" size="md">
          <RotateCcw size={16} /> {t("results.retake")}
        </Button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-mute">{t("results.answers")}</span>
        {reasons.map((r) => (
          <span key={r.id + L(r.title)} className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-ink-2 ring-1 ring-line">
            <Icon name={r.icon} size={14} className="mb-0.5 mr-1 inline text-accent" />{L(r.title)}
          </span>
        ))}
      </motion.div>

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {top.map((r, i) => (
          <SportRecommendation key={r.id} sport={getSport(r.id)} score={r.score} rank={i} onStart={() => start(r.id)} />
        ))}
      </div>

      <Reveal className="mt-20">
        <h2 className="font-display text-3xl font-bold uppercase text-ink">{t("results.others")}</h2>
        <p className="mt-2 text-mute">{t("results.othersText")}</p>
      </Reveal>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {rest.map((r, i) => {
          const s = getSport(r.id);
          return (
            <Reveal key={r.id} delay={i * 0.05}>
              <Link
                href={`/map?sport=${r.id}`}
                className="card group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition hover:border-accent/30"
              >
                <SportThumb src={s.image} className="h-12 w-12 rounded-xl transition group-hover:scale-110" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xl font-bold uppercase text-ink">{L(s.name)}</span>
                    <span className="font-display text-lg font-bold text-ink-2">{r.score}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-2/60 to-accent/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.05 }}
                    />
                  </div>
                </div>
                <MapPin size={18} className="shrink-0 text-mute transition group-hover:text-accent" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </main>
  );
}
