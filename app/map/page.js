"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Info, LocateFixed, MapPin, Navigation } from "lucide-react";
import { SportThumb } from "@/components/Icon";
import { useApp } from "@/components/AppProvider";
import { getSport, sports } from "@/data/sports";

const PlacesMap = dynamic(() => import("@/components/PlacesMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-deep">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
    </div>
  ),
});

const KIND_KEY = {
  pool: "place.pool",
  park: "place.park",
  fitness: "place.fitness",
  stadium: "place.stadium",
  track: "place.track",
  centre: "place.centre",
  bike: "place.bike",
  dojo: "place.dojo",
  pitch: "place.pitch",
};

export default function MapPage() {
  return (
    <Suspense>
      <MapView />
    </Suspense>
  );
}

function MapView() {
  const app = useApp();
  const { t, L, lang, results, markMapOpened } = app;
  const params = useSearchParams();
  const router = useRouter();
  const sportId = getSport(params.get("sport"))?.id ?? results[0]?.id ?? "swimming";
  const sport = getSport(sportId);

  const [coords, setCoords] = useState(null); // позиция пользователя
  const [geo, setGeo] = useState("locating"); // locating | ok | denied
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [limit, setLimit] = useState(20);
  const listRef = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    if (!counted.current) {
      counted.current = true;
      markMapOpened();
    }
  }, [markMapOpened]);

  const locate = useCallback(() => {
    if (!navigator.geolocation) return setGeo("denied");
    setGeo("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeo("ok");
      },
      () => setGeo("denied"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    locate();
  }, [locate]);

  useEffect(() => {
    if (geo === "locating") return;
    const q = new URLSearchParams({ sport: sportId, limit: "60" });
    if (coords) {
      q.set("lat", coords.lat);
      q.set("lng", coords.lng);
    }
    let cancelled = false;
    setData(null);
    setSelected(null);
    setLimit(20);
    fetch(`/api/places?${q}`)
      .then((r) => r.json())
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setData({ places: [], total: 0, mode: "center" }));
    return () => {
      cancelled = true;
    };
  }, [sportId, coords, geo]);

  const nameOf = useCallback((p) => p.n?.[lang] || p.n?.d || p.n?.ru || p.n?.en || t(KIND_KEY[p.k]), [lang, t]);
  const shown = useMemo(() => data?.places.slice(0, limit) ?? [], [data, limit]);
  const mapPlaces = useMemo(() => data?.places ?? [], [data]);

  const fmtDist = (m) => (m < 1000 ? t("map.m", { d: Math.round(m / 10) * 10 }) : t("map.km", { d: (m / 1000).toFixed(1) }));
  // если точка приблизительная — строим маршрут по названию и адресу, а не по координатам
  const routeUrl = (p) => {
    const dest = p.approx ? encodeURIComponent(`${nameOf(p)}, ${p.a}, Ташкент`) : `${p.lat},${p.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${data.origin.lat},${data.origin.lng}&destination=${dest}&travelmode=walking`;
  };

  const status =
    geo === "locating" ? t("map.locating") : !data ? t("common.loading") : data.mode === "user" ? t("map.located") : data.mode === "far" ? t("map.far") : t("map.fallback");

  const select = (id) => {
    setSelected(id);
    const idx = data?.places.findIndex((p) => p.id === id) ?? -1;
    if (idx >= limit) setLimit(idx + 5);
    requestAnimationFrame(() => listRef.current?.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
        <MapPin size={14} className="mb-0.5 inline" /> {t("map.kicker")}
      </motion.p>
      <motion.h1
        key={sportId + lang}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 font-display text-4xl font-bold uppercase leading-none text-ink sm:text-6xl"
      >
        {t("map.title")} <span className="neon neon-glow">{L(sport.name)}</span>
      </motion.h1>
      <p className="mt-3 text-mute">{t("map.text")}</p>

      {/* выбор вида спорта */}
      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {sports.map((s) => (
          <button
            key={s.id}
            onClick={() => router.replace(`/map?sport=${s.id}`, { scroll: false })}
            className={`relative isolate flex shrink-0 items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-3.5 text-sm font-semibold transition-colors ${
              s.id === sportId ? "text-void" : "text-mute ring-1 ring-line hover:text-ink"
            }`}
          >
            {s.id === sportId && <motion.span layoutId="map-sport" className="absolute inset-0 -z-10 rounded-xl bg-accent shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <SportThumb src={s.image} className="h-6 w-6 rounded-full" ring={false} /> {L(s.name)}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-ink-2">
          <span className={`h-2 w-2 rounded-full ${geo === "ok" ? "bg-accent shadow-[0_0_8px_#18f5b5]" : geo === "locating" ? "animate-pulse bg-mute" : "bg-flame"}`} />
          {status}
          {data && <span className="text-mute">· {t("map.found", { n: data.total })}</span>}
        </p>
        <button
          onClick={locate}
          className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-ink-2 ring-1 ring-line transition hover:text-accent hover:ring-accent/40"
        >
          <LocateFixed size={16} /> {t("map.findMe")}
        </button>
      </div>

      {data?.verified && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-accent/[0.06] px-4 py-3 text-sm text-ink-2 ring-1 ring-accent/20">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" /> {t("map.verified")}
        </p>
      )}

      <div className="mt-6 grid gap-4 lg:h-[640px] lg:grid-cols-[400px_1fr]">
        {/* список */}
        <div ref={listRef} className="order-2 space-y-2.5 lg:order-1 lg:overflow-y-auto lg:pr-1">
          {!data &&
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/[0.03] ring-1 ring-line" />)}
          {data && data.places.length === 0 && <p className="rounded-2xl p-6 text-center text-mute ring-1 ring-line">{t("map.none")}</p>}
          {shown.map((p, i) => (
            <motion.div
              key={p.id}
              data-id={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 10) * 0.03 }}
              onClick={() => select(p.id)}
              className={`cursor-pointer rounded-2xl p-4 transition ${
                selected === p.id ? "bg-accent/[0.08] ring-1 ring-accent/60" : "card hover:border-accent/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <SportThumb src={sport.image} className={`h-11 w-11 rounded-xl ${i === 0 ? "ring-2 ring-accent" : ""}`} ring={i !== 0} />
                <div className="min-w-0 flex-1">
                  {i === 0 && <p className="text-[10px] font-black uppercase tracking-widest text-accent">{t("map.nearest")}</p>}
                  <p className="font-semibold leading-snug text-ink">{nameOf(p)}</p>
                  <p className="mt-0.5 text-xs text-mute">
                    {p.n && KIND_KEY[p.k] ? t(KIND_KEY[p.k]) : ""}
                    {p.n && KIND_KEY[p.k] && p.a ? " · " : ""}
                    {p.a}
                  </p>
                  {p.approx && <p className="mt-1 text-[11px] font-semibold text-flame/90">≈ {t("map.approx")}</p>}
                  {p.h && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-2/70">
                      <Clock size={12} /> {p.h}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-display text-lg font-bold text-ink">{fmtDist(p.dist)}</span>
              </div>
              <a
                href={routeUrl(p)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-3 inline-flex h-9 items-center gap-2 rounded-xl bg-white/[0.05] px-3 text-xs font-bold text-accent ring-1 ring-line transition hover:ring-accent/40"
              >
                <Navigation size={14} /> {t("map.route")}
              </a>
            </motion.div>
          ))}
          {data && data.places.length > limit && (
            <button onClick={() => setLimit((l) => l + 20)} className="w-full rounded-2xl py-3 text-sm font-semibold text-accent ring-1 ring-line hover:ring-accent/40">
              {t("map.showMore")}
            </button>
          )}
        </div>

        {/* карта */}
        <div className="relative order-1 h-[55vh] overflow-hidden rounded-[2rem] border border-line lg:order-2 lg:h-full">
          <PlacesMap
            origin={data?.origin}
            originLabel={data?.mode === "user" ? t("map.you") : t("map.center")}
            places={mapPlaces}
            image={sport.image}
            selectedId={selected}
            onSelect={select}
            nameOf={nameOf}
          />
          <div className="glass pointer-events-none absolute left-3 top-3 z-[500] flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink-2">
            <MapPin size={14} className="text-accent" /> Toshkent
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-mute">{t("map.source")}</p>
    </main>
  );
}
