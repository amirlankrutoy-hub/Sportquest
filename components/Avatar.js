"use client";

import { useState } from "react";

// Аватар пользователя: фото из Google или первая буква имени
export default function Avatar({ user, className = "h-11 w-11 rounded-xl text-lg" }) {
  const [broken, setBroken] = useState(false);
  const initial = user?.name?.[0]?.toUpperCase() ?? "?";

  if (user?.picture && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.picture}
        alt={user.name ?? ""}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <span className={`grid place-items-center bg-gradient-to-br from-panel-2 to-deep font-display font-bold text-accent-3 ${className}`}>{initial}</span>
  );
}
