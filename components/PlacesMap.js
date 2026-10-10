"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Карта с местами для тренировок. places уже отсортированы по расстоянию.
export default function PlacesMap({ origin, originLabel, places, image, selectedId, onSelect, nameOf }) {
  const box = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);
  const markers = useRef({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const m = L.map(box.current, { zoomControl: false, attributionControl: true }).setView([41.3111, 69.2797], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: "map-tiles",
    }).addTo(m);
    L.control.zoom({ position: "bottomright" }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    map.current = m;
    const ro = new ResizeObserver(() => m.invalidateSize());
    ro.observe(box.current);
    return () => {
      ro.disconnect();
      m.remove();
    };
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m || !origin) return;
    layer.current.clearLayers();
    markers.current = {};

    L.marker([origin.lat, origin.lng], {
      icon: L.divIcon({ className: "", html: '<div class="me-pin"><span></span><b></b></div>', iconSize: [22, 22], iconAnchor: [11, 11] }),
      zIndexOffset: 1000,
    })
      .bindTooltip(escape(originLabel), { direction: "top", offset: [0, -10] })
      .addTo(layer.current);

    places.forEach((p, i) => {
      const marker = L.marker([p.lat, p.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div class="place-pin${i === 0 ? " nearest" : ""}"><img src="${image}" alt="" /></div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        }),
        zIndexOffset: i === 0 ? 500 : 0,
      })
        .bindPopup(`<b>${escape(nameOf(p))}</b>`, { closeButton: false, offset: [0, -14] })
        .on("click", () => onSelectRef.current?.(p.id))
        .addTo(layer.current);
      markers.current[p.id] = marker;
    });

    const bounds = L.latLngBounds([[origin.lat, origin.lng], ...places.slice(0, 8).map((p) => [p.lat, p.lng])]);
    m.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    // nameOf меняется вместе с языком, перерисовываем подписи
  }, [origin, places, image, originLabel, nameOf]);

  useEffect(() => {
    const marker = markers.current[selectedId];
    if (!marker || !map.current) return;
    map.current.flyTo(marker.getLatLng(), Math.max(map.current.getZoom(), 15), { duration: 0.7 });
    marker.openPopup();
    document.querySelectorAll(".place-pin.active").forEach((el) => el.classList.remove("active"));
    marker.getElement()?.querySelector(".place-pin")?.classList.add("active");
  }, [selectedId]);

  return <div ref={box} className="h-full w-full" />;
}
