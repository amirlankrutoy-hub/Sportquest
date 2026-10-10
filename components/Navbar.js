"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Globe, LogOut, Menu, UserRound, X, Zap } from "lucide-react";
import { useApp } from "./AppProvider";
import Avatar from "./Avatar";
import Icon from "./Icon";
import { GoogleLogo } from "./GoogleButton";
import { getSport } from "@/data/sports";
import { quests } from "@/data/quests";
import { LANGS } from "@/lib/i18n";

const LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/#how", key: "nav.how" },
  { href: "/sports", key: "nav.sports" },
  { href: "/quest", key: "nav.quest" },
  { href: "/map", key: "nav.map" },
  { href: "/profile", key: "nav.profile" },
];

export function Logo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-3 to-accent-2 text-void shadow-glow transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
        <Zap size={20} fill="currentColor" strokeWidth={1.5} />
      </span>
      <span className="font-display text-xl font-bold uppercase leading-none tracking-wide text-ink">
        Sport<span className="neon">Quest</span>
      </span>
    </Link>
  );
}

function useClickOutside(onOutside) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && onOutside();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onOutside]);
  return ref;
}

function useNotifications() {
  const { results, activeQuest, quests: progress, streak, unlocked, t, L, plural, dayTitle } = useApp();
  const list = [];
  if (!results.length) list.push({ icon: "Target", text: t("notif.quiz"), href: "/quiz" });
  if (activeQuest && quests[activeQuest]) {
    const done = progress[activeQuest]?.completed.length ?? 0;
    const day = quests[activeQuest].days[done];
    if (day) list.push({ icon: "CalendarDays", text: t("notif.today", { n: done + 1, title: dayTitle(day), xp: day.xp }), href: "/quest" });
  } else if (results.length) {
    list.push({ icon: "Rocket", text: t("notif.startQuest", { name: L(getSport(results[0].id).name) }), href: "/results" });
  }
  if (results.length) list.push({ icon: "MapPin", text: t("notif.map"), href: `/map?sport=${results[0].id}` });
  if (streak > 0) list.push({ icon: "Flame", text: t("notif.streak", { n: `${streak} ${plural(streak, "xp.days")}` }), href: "/quest" });
  if (unlocked.length) list.push({ icon: "Trophy", text: t("notif.achievements", { n: unlocked.length }), href: "/profile" });
  return list;
}

const dropdown = {
  initial: { opacity: 0, y: 8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.97 },
  transition: { duration: 0.18 },
};

export default function Navbar() {
  const pathname = usePathname();
  const app = useApp();
  const { t } = app;
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(null); // "bell" | "menu" | "lang"
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const notifications = useNotifications();
  const close = () => setOpen(null);
  const bellRef = useClickOutside(() => setOpen((o) => (o === "bell" ? null : o)));
  const menuRef = useClickOutside(() => setOpen((o) => (o === "menu" ? null : o)));
  const langRef = useClickOutside(() => setOpen((o) => (o === "lang" ? null : o)));
  const toggle = (name) => setOpen((o) => (o === name ? null : name));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onHash = () => setHash(window.location.hash);
    onScroll();
    onHash();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    setMobile(false);
    setHash(window.location.hash);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/#how") return pathname === "/" && hash === "#how";
    if (href === "/") return pathname === "/" && hash !== "#how";
    return pathname.startsWith(href) || (href === "/quest" && pathname === "/results");
  };

  const current = LANGS.find((l) => l.id === app.lang);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || mobile ? "border-b border-line bg-void/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setHash(l.href.includes("#") ? "#how" : "")}
                className={`relative isolate block whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive(l.href) ? "text-ink" : "text-mute hover:text-ink"
                }`}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/[0.06] ring-1 ring-accent/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* язык */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => toggle("lang")}
              aria-label={t("nav.language")}
              className="flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-ink-2 ring-1 ring-line transition hover:text-accent hover:ring-accent/40"
            >
              <Globe size={16} /> {current.label}
            </button>
            <AnimatePresence>
              {open === "lang" && (
                <motion.div {...dropdown} className="absolute right-0 mt-2 w-44 rounded-2xl border border-line bg-deep/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  {LANGS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        app.setLang(l.id);
                        close();
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/5 ${
                        l.id === app.lang ? "font-bold text-accent" : "text-ink-2"
                      }`}
                    >
                      {l.name}
                      <span className="text-xs text-mute">{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* уведомления */}
          <div ref={bellRef} className="relative">
            <button
              onClick={() => toggle("bell")}
              aria-label={t("nav.notifications")}
              className="relative grid h-11 w-11 place-items-center rounded-xl text-ink-2 ring-1 ring-line transition hover:text-accent hover:ring-accent/40"
            >
              <Bell size={19} />
              {notifications.length > 0 && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#18f5b5]" />}
            </button>
            <AnimatePresence>
              {open === "bell" && (
                <motion.div {...dropdown} className="absolute -right-14 mt-2 w-[min(340px,calc(100vw-2rem))] rounded-2xl border border-line bg-deep/95 p-2 shadow-2xl backdrop-blur-xl sm:right-0">
                  <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-mute">{t("nav.notifications")}</p>
                  {notifications.length === 0 && <p className="px-3 py-4 text-sm text-mute">{t("nav.allRead")}</p>}
                  {notifications.map((n, i) => (
                    <Link key={i} href={n.href} onClick={close} className="flex items-start gap-3 rounded-xl px-3 py-3 text-sm text-ink-2 transition hover:bg-white/5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon name={n.icon} size={16} /></span>
                      {n.text}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* аккаунт */}
          <div ref={menuRef} className="relative hidden sm:block">
            <button
              onClick={() => toggle("menu")}
              aria-label={t("nav.account")}
              className="overflow-hidden rounded-xl ring-2 ring-accent/30 transition hover:ring-accent/80"
            >
              <Avatar user={app.user} />
            </button>
            <AnimatePresence>
              {open === "menu" && (
                <motion.div {...dropdown} className="absolute right-0 mt-2 w-64 rounded-2xl border border-line bg-deep/95 p-2 shadow-2xl backdrop-blur-xl">
                  <AccountMenu app={app} onDone={close} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobile((v) => !v)}
            aria-label={t("nav.menu")}
            className="grid h-11 w-11 place-items-center rounded-xl text-ink ring-1 ring-line xl:hidden"
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="space-y-1 px-4 pb-4 pt-2">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={l.href}
                    onClick={() => {
                      setMobile(false);
                      setHash(l.href.includes("#") ? "#how" : "");
                    }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold uppercase ${
                      isActive(l.href) ? "bg-white/[0.05] text-accent-3" : "text-ink"
                    }`}
                  >
                    {t(l.key)}
                    <span className="text-mute">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mx-4 mb-5 rounded-2xl border border-line p-2 sm:hidden">
              <AccountMenu app={app} onDone={() => setMobile(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AccountMenu({ app, onDone }) {
  const { t } = app;
  return (
    <>
      <div className="flex items-center gap-3 px-3 py-3">
        <Avatar user={app.user} className="h-12 w-12 shrink-0 rounded-full text-lg" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{app.user.name}</p>
          <p className="truncate text-xs text-mute">{app.user.email}</p>
        </div>
      </div>
      <div className="px-3 pb-2">
        <p className="flex items-center gap-1.5 text-xs text-mute">
          {app.user.provider === "google" && <GoogleLogo size={12} />}
          {app.user.provider === "google" ? t("profile.viaGoogle") : t("profile.viaEmail")}
        </p>
        <p className="mt-1 text-xs font-bold text-accent">
          {app.level.name} · {app.xp} XP
        </p>
      </div>
      <Link href="/profile" onClick={onDone} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-2 hover:bg-white/5">
        <UserRound size={16} /> {t("nav.profile")}
      </Link>
      <button
        onClick={() => {
          app.logout();
          onDone();
        }}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-2 hover:bg-white/5"
      >
        <LogOut size={16} /> {t("nav.logout")}
      </button>
    </>
  );
}
