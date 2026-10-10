import { NextResponse } from "next/server";
import osmPlaces from "@/data/places-tashkent.json";
import curated from "@/data/places-curated.json";

// Центр Ташкента (площадь Амира Темура)
const CENTER = { lat: 41.3111, lng: 69.2797 };
// Безымянные бассейны и клубы обычно частные (дома, отели), их не показываем
const NAMED_ONLY = new Set(["swimming", "fitness", "cycling", "boxing", "mma", "wrestling", "judo", "taekwondo", "karate", "kickboxing", "kurash", "weightlifting", "gymnastics", "climbing", "table_tennis", "badminton", "handball"]);

// Проверенный список мест (от команды) важнее данных OpenStreetMap
function curatedFor(sport) {
  const ids = curated.sports[sport];
  if (!ids) return null;
  return ids
    .map((id) => ({ id, ...curated.venues[id] }))
    .filter((v) => v.geo)
    .map((v) => ({
      id: `c_${v.id}`,
      n: { d: v.name },
      a: v.address,
      lat: v.geo.lat,
      lng: v.geo.lng,
      k: "curated",
      approx: !["exact", "house"].includes(v.geo.precision),
      verified: true,
    }));
}

function distance(a, b) {
  const R = 6371000;
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport");
  const limit = Math.min(Number(searchParams.get("limit")) || 40, 150);

  // OSM: только места, прямо отмеченные этим видом спорта (без «похожих» спортцентров)
  const list = curatedFor(sport) ?? (osmPlaces[sport] || []).filter((p) => !p.rel && (!NAMED_ONLY.has(sport) || p.n));
  if (!curated.sports[sport] && !osmPlaces[sport]) return NextResponse.json({ error: "unknown sport" }, { status: 400 });

  const hasCoords = searchParams.has("lat") && searchParams.has("lng");
  let origin = { lat: Number(searchParams.get("lat")), lng: Number(searchParams.get("lng")) };
  let mode = "user";
  if (!hasCoords || !Number.isFinite(origin.lat) || !Number.isFinite(origin.lng)) {
    origin = CENTER;
    mode = "center";
  } else if (distance(origin, CENTER) > 40000) {
    origin = CENTER;
    mode = "far";
  }

  const sorted = list.map((p) => ({ ...p, dist: distance(origin, p) })).sort((a, b) => a.dist - b.dist);

  return NextResponse.json({
    origin,
    mode,
    total: sorted.length,
    places: sorted.slice(0, limit),
    verified: Boolean(curated.sports[sport]),
  });
}
