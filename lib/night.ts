"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "english-agent-night";

function bogotaHour(date: Date) {
  const hour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone: "America/Bogota",
  }).format(date);
  return Number(hour);
}

export function useNightMode() {
  const [manual, setManual] = useState<boolean | null>(null);
  const [systemDark, setSystemDark] = useState(false);
  const [late, setLate] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "on") setManual(true);
    if (stored === "off") setManual(false);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(media.matches);
    sync();
    media.addEventListener("change", sync);
    setLate(bogotaHour(new Date()) >= 21);
    return () => media.removeEventListener("change", sync);
  }, []);

  const night = manual ?? (late || systemDark);

  function toggle() {
    const next = !night;
    setManual(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  }

  return { night, toggle };
}
