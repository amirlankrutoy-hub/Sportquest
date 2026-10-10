"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Pencil, Zap } from "lucide-react";
import Avatar from "@/components/Avatar";
import { GoogleLogo } from "@/components/GoogleButton";
import Icon, { SportThumb } from "@/components/Icon";
import XPBar, { StreakBadge } from "@/components/XPBar";
import ProfileStats from "@/components/ProfileStats";
import AchievementCard from "@/components/AchievementCard";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/AppProvider";
import { achievements } from "@/data/achievements";
import { questMeta, quests } from "@/data/quests";
import { getSport } from "@/data/sports";
import { profileStats } from "@/lib/scoring";

const DEMO_STATS = [
  { id: "strength", value: 4 },
  { id: "speed", value: 3 },
  { id: "endurance", value: 5 },
  { id: "team", value: 4 },
  { id: "discipline", value: 3 },
];

function Card({ title, children, className = "", extra }) {
  return (
    <Reveal className={`card rounded-[2rem] p-6 sm:p-8 ${className}`}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold uppercase text-ink">{title}</h2>
        {extra}
      </div>
      {children}
    </Reveal>
  );
}

export default function ProfilePage() {
  const app = useApp();
  const { t, L } = app;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  if (!app.ready) return <main className="min-h-[60vh]" />;

  const hasQuiz = app.results.length > 0;
  const stats = hasQuiz ? profileStats(app.answers) : DEMO_STATS;
  const favorites = (hasQuiz ? app.results.slice(0, 3) : [{ id: "boxing" }, { id: "football" }, { id: "running" }]).map((r) => ({ ...getSport(r.id), score: r.score }));
  const history = Object.entries(app.quests).filter(([, q]) => q.completed.length > 0);
  const progressOf = (a) => a.progress?.(app);

  const saveName = () => {
    if (name.trim()) app.setName(name.trim());
    setEditing(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      {/* шапка профиля */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-line"
      >
        <Image src="/images/hero-athlete.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void/50" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />

        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">
              <div className="absolute -inset-1 overflow-hidden rounded-[2.25rem]">
                <motion.div
                  className="absolute -inset-1/2 bg-[conic-gradient(from_0deg,#29ffc3,#00e5a0,transparent_40%,transparent_60%,#29ffc3)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-void p-1">
                <Avatar user={app.user} className="h-full w-full rounded-[1.75rem] text-5xl" />
              </div>
              <span className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-xl border-4 border-void bg-accent font-display text-sm font-bold text-void">
                {app.level.index}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{t("profile.kicker")}</p>
              {editing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveName();
                  }}
                  className="mt-2 flex items-center gap-2"
                >
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={24}
                    className="w-56 rounded-xl border border-accent/40 bg-void/70 px-3 py-2 font-display text-3xl font-bold uppercase text-ink outline-none"
                  />
                  <button type="submit" aria-label={t("profile.saveName")} className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-void">
                    <Check size={18} strokeWidth={3} />
                  </button>
                </form>
              ) : (
                <h1 className="group mt-2 flex items-center gap-3 font-display text-5xl font-bold uppercase leading-none text-ink sm:text-6xl">
                  {app.user.name}
                  <button
                    onClick={() => {
                      setName(app.user.name);
                      setEditing(true);
                    }}
                    aria-label={t("profile.edit")}
                    className="grid h-9 w-9 place-items-center rounded-lg text-mute ring-1 ring-line transition hover:text-accent"
                  >
                    <Pencil size={15} />
                  </button>
                </h1>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent-3 ring-1 ring-accent/25">
                  <Zap size={14} fill="currentColor" /> {app.level.name}
                </span>
                <StreakBadge streak={app.streak} />
                <span className="rounded-xl bg-white/[0.05] px-3 py-1.5 text-sm text-ink-2 ring-1 ring-line">
                  {t("profile.achCount", { a: app.unlocked.length, b: achievements.length })}
                </span>
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-mute">
                {app.user.provider === "google" && <GoogleLogo size={14} />}
                {app.user.provider === "google" ? t("profile.viaGoogle") : t("profile.viaEmail")}
                {app.user.email && <span className="text-ink-2">· {app.user.email}</span>}
              </p>
            </div>
          </div>
          <XPBar />
        </div>
      </motion.section>


      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Card
          title={t("profile.stats")}
          extra={
            !hasQuiz && (
              <Link href="/quiz" className="text-xs font-bold text-accent hover:underline">
                {t("profile.refine")}
              </Link>
            )
          }
        >
          <ProfileStats stats={stats} />
        </Card>

        <Card title={t("profile.favorites")}>
          <div className="grid gap-3 sm:grid-cols-3">
            {favorites.map((s, i) => (
              <Link key={s.id} href={`/sports?open=${s.id}`} className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line sm:aspect-[3/4.4]">
                <Image src={s.image} alt={L(s.name)} fill sizes="(max-width: 640px) 100vw, 20vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                {i === 0 && <span className="absolute left-3 top-3 rounded-lg bg-accent px-2 py-1 text-[10px] font-black uppercase text-void">{t("profile.top1")}</span>}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-2xl font-bold uppercase text-ink">{L(s.name)}</p>
                  {s.score != null && <p className="text-sm font-bold text-accent-3">{t("results.match", { n: s.score })}</p>}
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <Card
        title={t("profile.achievements")}
        className="mt-5"
        extra={
          <span className="rounded-lg bg-white/[0.05] px-3 py-1 text-sm font-bold text-ink-2">
            {app.unlocked.length} / {achievements.length}
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} achievement={a} index={i} unlocked={app.unlocked.includes(a.id)} progress={progressOf(a)} />
          ))}
        </div>
      </Card>

      <Card title={t("profile.history")} className="mt-5">
        {history.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-mute">{t("profile.emptyHistory")}</p>
            <Button href={app.activeQuest ? "/quest" : "/quiz"} size="md">
              {app.activeQuest ? t("profile.toQuest") : t("hero.cta")}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {history.filter(([id]) => quests[id]).map(([id, q]) => {
              const s = questMeta(id);
              const total = quests[id].days.length;
              return (
                <Link key={id} href="/quest" onClick={() => app.startQuest(id)} className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-line transition hover:ring-accent/30">
                  <SportThumb src={s.image} className="h-12 w-12 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="font-display text-xl font-bold uppercase text-ink">{t("quest.title")} {L(s.name)}</p>
                      <p className="text-sm font-bold text-ink-2">
                        {q.completed.length}/{total}
                      </p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full bg-gradient-to-r from-accent-2 to-accent-3" style={{ width: `${(q.completed.length / total) * 100}%` }} />
                    </div>
                  </div>
                  {q.completed.length === total && <Icon name="Trophy" size={24} className="text-accent" />}
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </main>
  );
}
