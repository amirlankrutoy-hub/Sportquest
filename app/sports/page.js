"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Dumbbell, Flame, Gauge, MapPin } from "lucide-react";
import SportCard, { Difficulty } from "@/components/SportCard";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useApp } from "@/components/AppProvider";
import { FILTERS, getSport, sports } from "@/data/sports";

export default function SportsPage() {
  return (
    <Suspense>
      <Catalog />
    </Suspense>
  );
}

function Catalog() {
  const app = useApp();
  const { t, L } = app;
  const router = useRouter();
  const params = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const id = params.get("open");
    if (id && getSport(id)) setOpenId(id);
  }, [params]);

  useEffect(() => {
    if (openId) app.viewSport(openId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const list = useMemo(() => (filter === "all" ? sports : sports.filter((s) => s.categories.includes(filter))), [filter]);
  const scoreOf = (id) => app.results.find((r) => r.id === id)?.score;
  // последний открытый вид остаётся в модалке, пока она закрывается с анимацией
  const lastOpen = useRef(null);
  if (openId) lastOpen.current = getSport(openId);
  const open = lastOpen.current;

  const close = () => {
    setOpenId(null);
    if (params.get("open")) router.replace("/sports", { scroll: false });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
        {t("home.catalog.kicker")}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-3 font-display text-5xl font-bold uppercase leading-none text-ink sm:text-7xl"
      >
        {t("sports.title1")} <span className="neon neon-glow">{t("sports.title2")}</span>
      </motion.h1>
      <p className="mt-4 max-w-xl text-mute">
        {app.results.length ? t("sports.withQuiz") : t("sports.noQuiz")}
      </p>

      <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {FILTERS.map((id) => ({ id, label: t(`filter.${id}`) })).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`relative isolate shrink-0 rounded-2xl px-5 py-2.5 text-sm font-bold transition-colors ${filter === f.id ? "text-void" : "text-mute ring-1 ring-line hover:text-ink"}`}
          >
            {filter === f.id && (
              <motion.span layoutId="sport-filter" className="absolute inset-0 -z-10 rounded-2xl bg-accent shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <SportCard key={s.id} sport={s} index={i} match={scoreOf(s.id)} onClick={() => setOpenId(s.id)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal open={!!openId} onClose={close} className="max-w-3xl">
        {open && (
          <div>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-[2rem]">
              <Image src={open.image} alt={L(open.name)} fill sizes="768px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
              <div className="absolute bottom-5 left-6 sm:left-8">
                <h2 className="font-display text-5xl font-bold uppercase text-ink">{L(open.name)}</h2>
              </div>
              {scoreOf(open.id) != null && (
                <span className="absolute bottom-6 right-6 rounded-2xl bg-void/70 px-4 py-2 font-display text-2xl font-bold text-accent-3 ring-1 ring-accent/40 backdrop-blur sm:right-8">
                  {scoreOf(open.id)}%
                </span>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <p className="leading-relaxed text-ink-2/85">{L(open.description)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {L(open.traits).map((tr) => (
                  <span key={tr} className="rounded-xl bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-3 ring-1 ring-accent/20">
                    {tr}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-line">
                  <Gauge size={18} className="text-accent" />
                  <p className="mt-2 text-xs uppercase tracking-wider text-mute">{t("common.difficulty")}</p>
                  <p className="mt-1 font-semibold text-ink">{t(`diff.${open.difficulty}`)}</p>
                  <div className="mt-2">
                    <Difficulty value={open.difficulty} />
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-line">
                  <Dumbbell size={18} className="text-accent" />
                  <p className="mt-2 text-xs uppercase tracking-wider text-mute">{t("sports.equipment")}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{L(open.equipment).join(", ")}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-line">
                  <Flame size={18} className="text-flame" />
                  <p className="mt-2 text-xs uppercase tracking-wider text-mute">{t("sports.energy")}</p>
                  <p className="mt-1 font-semibold text-ink">{t("sports.kcal", { kcal: open.kcal })}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    app.startQuest(open.id);
                    router.push("/quest");
                  }}
                >
                  {t("sports.start", { name: L(open.name) })} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="ghost" className="w-full" href={`/map?sport=${open.id}`}>
                  <MapPin size={18} /> {t("sports.map")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
