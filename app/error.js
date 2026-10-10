"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Trash2 } from "lucide-react";

// Если на странице произошла ошибка, показываем понятный экран вместо «Application error»
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[SPORT QUEST] ошибка страницы:", error);
  }, [error]);

  const clearData = () => {
    try {
      localStorage.removeItem("sport-quest-v1");
    } catch {}
    window.location.href = "/";
  };

  return (
    <main className="grid min-h-[70vh] place-items-center px-5">
      <div className="w-full max-w-lg rounded-[2rem] border border-line bg-deep p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-flame/15 text-flame">
          <AlertTriangle size={26} />
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold uppercase text-ink">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-mute">Something went wrong · Nimadir xato ketdi</p>
        <pre className="mt-5 max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-void p-3 text-left text-xs text-flame">{String(error?.message || error)}</pre>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button onClick={reset} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent font-bold text-void">
            <RotateCcw size={16} /> Попробовать снова
          </button>
          <button onClick={clearData} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl font-bold text-ink-2 ring-1 ring-line hover:text-accent">
            <Trash2 size={16} /> Сбросить данные сайта
          </button>
        </div>
      </div>
    </main>
  );
}
