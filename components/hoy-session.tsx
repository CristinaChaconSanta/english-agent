"use client";

import { useEffect, type CSSProperties } from "react";
import { Sunny } from "@/components/characters/sunny";
import { FlechaPlay } from "@/components/dynamics/flecha";
import { LogroPlay } from "@/components/dynamics/logro";
import { RepasoPlay } from "@/components/dynamics/repaso";
import { UpgradePlay } from "@/components/dynamics/upgrade";
import { BottomBar } from "@/components/ui/bottom-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sticker } from "@/components/ui/sticker";
import { Timer } from "@/components/ui/timer";
import { WavyDivider } from "@/components/ui/wavy-divider";
import { useNightMode } from "@/lib/night";
import type { Pack } from "@/lib/schemas/pack";
import { useSessionStore } from "@/lib/stores/session";
import { lessonVars } from "@/lib/themes";

export function HoySession({ pack }: { pack: Pack }) {
  const session = pack.sesiones[0];
  const { night, toggle } = useNightMode();
  const started = useSessionStore((state) => state.started);
  const step = useSessionStore((state) => state.step);
  const elapsedSec = useSessionStore((state) => state.elapsedSec);
  const shake = useSessionStore((state) => state.shake);
  const start = useSessionStore((state) => state.start);
  const tick = useSessionStore((state) => state.tick);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [started, tick]);

  if (!session) return null;
  const dinamica = session.dinamicas[step];

  return (
    <main className="lesson px-4 pb-28 pt-6" style={lessonVars(session.tema_color, night) as CSSProperties}>
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <Sticker>{`#${pack.tema_cultural.toUpperCase()}`}</Sticker>
          <button type="button" className="btn bg-paper px-4 text-ink" onClick={toggle}>
            {night ? "Día" : "Noche"}
          </button>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl leading-none tracking-tight">Hoy</h1>
          <Sunny state={started ? "idle" : "hop"} />
        </div>
        {started ? <Timer elapsedSec={elapsedSec} /> : null}
        <WavyDivider />
        <div className={shake ? "shake" : undefined}>
          {!started ? (
            <Card>
              <p className="mb-4 text-[17px]">Una sesión. Empieza por la flecha.</p>
              <Button onClick={start}>Empezar</Button>
            </Card>
          ) : null}
          {started && dinamica?.tipo === "flecha" ? <FlechaPlay dinamica={dinamica} /> : null}
          {started && dinamica?.tipo === "upgrade" ? <UpgradePlay dinamica={dinamica} /> : null}
          {started && dinamica?.tipo === "repaso" ? <RepasoPlay dinamica={dinamica} /> : null}
          {started && dinamica?.tipo === "logro" ? <LogroPlay dinamica={dinamica} semana={pack.semana} /> : null}
        </div>
      </div>
      <BottomBar />
    </main>
  );
}
