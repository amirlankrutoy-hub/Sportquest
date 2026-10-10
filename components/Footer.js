"use client";

import Link from "next/link";
import { Logo } from "./Navbar";
import { useApp } from "./AppProvider";

export default function Footer() {
  const { t } = useApp();
  const link = "transition hover:text-accent";
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink">{t("footer.platform")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-mute">
            <li><Link className={link} href="/quiz">{t("home.how.cta")}</Link></li>
            <li><Link className={link} href="/sports">{t("nav.sports")}</Link></li>
            <li><Link className={link} href="/quest">{t("nav.quest")}</Link></li>
            <li><Link className={link} href="/map">{t("nav.map")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink">{t("footer.account")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-mute">
            <li><Link className={link} href="/profile">{t("nav.profile")}</Link></li>
            <li><Link className={link} href="/results">{t("footer.results")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-mute sm:px-6">{t("footer.copy")}</p>
      </div>
    </footer>
  );
}
