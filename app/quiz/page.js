"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { useApp } from "@/components/AppProvider";
import { questions } from "@/data/questions";
import { sports } from "@/data/sports";
import { SportThumb } from "@/components/Icon";

const GRID = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

function Analyzing() {
  const { t } = useApp();
  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-void/95 px-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative h-40 w-40">
          <motion.div className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute inset-4 rounded-full border-2 border-accent/10 border-b-accent-3" animate={{ rotate: -360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
          <div className="absolute inset-0 grid place-items-center text-5xl">
            <EmojiCycler />
          </div>
        </div>
        <p className="mt-8 font-display text-3xl font-bold uppercase text-ink">{t("quiz.analyzing")}</p>
        <p className="mt-2 text-mute">{t("quiz.analyzingText", { n: sports.length })}</p>
      </div>
    </motion.div>
  );
}

function EmojiCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % sports.length), 180);
    return () => clearInterval(t);
  }, []);
  return <SportThumb key={i} src={sports[i].image} className="h-20 w-20 rounded-full" />;
}

export default function QuizPage() {
  const router = useRouter();
  const { finishQuiz, answers: saved, ready, t, L } = useApp();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({});
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (ready && Object.keys(saved).length) setAnswers(saved);
  }, [ready, saved]);

  const q = questions[step];
  const selected = answers[q.id];
  const last = step === questions.length - 1;

  const go = useCallback(
    (delta) => {
      if (delta > 0 && !answers[questions[step].id]) return;
      if (delta > 0 && step === questions.length - 1) {
        setAnalyzing(true);
        setTimeout(() => {
          finishQuiz(answers);
          router.push("/results");
        }, 1900);
        return;
      }
      setDir(delta);
      setStep((s) => Math.max(0, Math.min(questions.length - 1, s + delta)));
    },
    [answers, step, finishQuiz, router]
  );

  const choose = (id) => {
    setAnswers((a) => ({ ...a, [q.id]: id }));
  };

  useEffect(() => {
    const onKey = (e) => {
      if (analyzing) return;
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) setAnswers((a) => ({ ...a, [q.id]: q.options[n - 1].id }));
      if (e.key === "Enter" || e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft" || e.key === "Backspace") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, go, analyzing]);

  return (
    <main className="relative mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-96 w-[70%] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      {/* шапка */}
      <div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-accent">
            <Sparkles size={16} /> {t("quiz.kicker")}
          </span>
          <span className="shrink-0 whitespace-nowrap font-display text-lg font-semibold text-ink">
            {t("quiz.counter", { n: step + 1, total: questions.length })}
          </span>
        </div>
        <ProgressBar value={(step + (selected ? 1 : 0.4)) / questions.length} className="mt-4" height="h-2" />
        <div className="mt-3 flex gap-1.5">
          {questions.map((qq, i) => (
            <span key={qq.id} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < step || (i === step && selected) ? "bg-accent/70" : i === step ? "bg-white/25" : "bg-white/[0.06]"}`} />
          ))}
        </div>
      </div>

      {/* вопрос */}
      <div className="relative flex flex-1 flex-col">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={q.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col"
          >
            <h1 className="mt-10 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] text-ink sm:mt-14 sm:text-6xl">{L(q.title)}</h1>
            <p className="mt-3 text-sm text-mute">
              {t("quiz.pick")} <span className="hidden sm:inline">· {t("quiz.keys", { n: q.options.length })}</span>
            </p>
            <div className={`mt-8 grid gap-4 sm:mt-10 ${GRID[q.options.length]}`}>
              {q.options.map((o, i) => (
                <QuizCard key={o.id} option={o} index={i} hotkey={i + 1} selected={selected === o.id} onSelect={() => choose(o.id)} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* навигация */}
      <div className="sticky bottom-0 -mx-4 mt-10 flex items-center justify-between gap-3 border-t border-line bg-void/80 px-4 py-4 backdrop-blur-xl sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <Button variant="dark" onClick={() => go(-1)} disabled={step === 0}>
          <ArrowLeft size={18} /> {t("quiz.back")}
        </Button>
        <Button onClick={() => go(1)} disabled={!selected}>
          {last ? t("quiz.finish") : t("quiz.next")} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <AnimatePresence>{analyzing && <Analyzing />}</AnimatePresence>
    </main>
  );
}
