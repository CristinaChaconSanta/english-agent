"use client";

import { useEffect, useState } from "react";
import { Sunny } from "@/components/characters/sunny";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Dinamica } from "@/lib/schemas/pack";
import { useSessionStore } from "@/lib/stores/session";

type Flecha = Extract<Dinamica, { tipo: "flecha" }>;
type Mission = Flecha["misiones"][number];

const VERBOS = ["jump", "run", "float"] as const;
const FLECHAS = ["into", "out of", "over"] as const;

const MANERA_ES: Record<(typeof VERBOS)[number], string> = {
  jump: "de un salto",
  run: "corriendo",
  float: "flotando",
};

const DIRECCION_ES: Record<(typeof FLECHAS)[number], string> = {
  "out of": "salió",
  into: "entró",
  over: "por encima",
};

const MOVIMIENTO: Record<string, string> = {
  "jump|out of": "translate(-8px, -40px)",
  "jump|into": "translate(78px, 36px)",
  "jump|over": "translate(86px, -52px)",
  "run|out of": "translate(-18px, 6px)",
  "run|into": "translate(108px, 42px)",
  "run|over": "translate(96px, -16px)",
  "float|out of": "translate(-12px, -24px)",
  "float|into": "translate(64px, 16px)",
  "float|over": "translate(78px, -64px)",
};

function MissionText({ mission }: { mission: Mission }) {
  const manera = MANERA_ES[mission.verbo];
  const direccion = DIRECCION_ES[mission.flecha];
  const hits = [
    { word: manera, kind: "manera" as const, at: mission.es.indexOf(manera) },
    { word: direccion, kind: "direccion" as const, at: mission.es.indexOf(direccion) },
  ]
    .filter((hit) => hit.at >= 0)
    .sort((a, b) => a.at - b.at);

  const parts: { text: string; kind: "plain" | "manera" | "direccion" }[] = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.at < cursor) continue;
    if (hit.at > cursor) parts.push({ text: mission.es.slice(cursor, hit.at), kind: "plain" });
    parts.push({ text: hit.word, kind: hit.kind });
    cursor = hit.at + hit.word.length;
  }
  if (cursor < mission.es.length) parts.push({ text: mission.es.slice(cursor), kind: "plain" });

  return (
    <p className="font-display text-2xl leading-tight tracking-tight text-ink">
      {parts.map((part) =>
        part.kind === "plain" ? (
          <span key={`${part.kind}-${part.text}`}>{part.text}</span>
        ) : (
          <mark
            key={`${part.kind}-${part.text}`}
            className={cn(
              "rounded px-1 text-ink",
              part.kind === "manera" ? "bg-ielts" : "bg-repaso",
            )}
          >
            {part.text}
          </mark>
        ),
      )}
    </p>
  );
}

function StickerBox() {
  return (
    <svg viewBox="0 0 130 110" className="h-28 w-32" role="img" aria-label="THE BOX">
      <path d="M24 46 H108 V100 H24 Z" fill="#fff" stroke="#fff" strokeWidth="10" />
      <path d="M24 46 L10 30 H62 L76 46" fill="#FFD23F" stroke="#fff" strokeWidth="8" />
      <path d="M76 46 L90 30 H122 L108 46" fill="#FFD23F" stroke="#fff" strokeWidth="8" />
      <path d="M24 46 H108 V100 H24 Z" fill="#FFF8EC" stroke="#111" strokeWidth="3" />
      <path d="M24 46 L10 30 H62 L76 46 Z" fill="#FFD23F" stroke="#111" strokeWidth="3" />
      <path d="M76 46 L90 30 H122 L108 46 Z" fill="#FFD23F" stroke="#111" strokeWidth="3" />
      <text x="66" y="80" textAnchor="middle" fill="#111" fontSize="13" fontFamily="var(--font-marker), cursive">
        THE BOX
      </text>
    </svg>
  );
}

export function FlechaPlay({ dinamica }: { dinamica: Flecha }) {
  const next = useSessionStore((state) => state.next);
  const [index, setIndex] = useState(0);
  const [demo, setDemo] = useState(true);
  const [verbo, setVerbo] = useState<string | null>(null);
  const [flecha, setFlecha] = useState<string | null>(null);
  const mission = dinamica.misiones[index];

  useEffect(() => {
    const first = dinamica.misiones[0];
    if (!first) return;
    setVerbo(first.verbo);
    setFlecha(first.flecha);
    const id = window.setTimeout(() => {
      setVerbo(null);
      setFlecha(null);
      setDemo(false);
    }, 5000);
    return () => window.clearTimeout(id);
  }, [dinamica.misiones]);

  useEffect(() => {
    if (demo || !mission || !verbo || !flecha) return;
    const correct = verbo === mission.verbo && flecha === mission.flecha;
    if (!correct) return;
    const id = window.setTimeout(() => {
      if (index + 1 >= dinamica.misiones.length) {
        next();
        return;
      }
      setIndex(index + 1);
      setVerbo(null);
      setFlecha(null);
    }, 800);
    return () => window.clearTimeout(id);
  }, [demo, verbo, flecha, mission, index, dinamica.misiones.length, next]);

  if (!mission) return null;

  const chosen = Boolean(verbo && flecha);
  const correct = chosen && verbo === mission.verbo && flecha === mission.flecha;
  const sentence =
    chosen && verbo && flecha
      ? `Sunny ${{ jump: "jumped", run: "ran", float: "floated" }[verbo] ?? verbo} ${flecha} the box.`
      : "";
  const hint = !demo && chosen && !correct ? "La manera o la dirección no es la de la misión." : null;
  const transform = chosen && verbo && flecha ? (MOVIMIENTO[`${verbo}|${flecha}`] ?? "none") : "none";

  function pick(kind: "verbo" | "flecha", value: string) {
    if (demo) return;
    if (kind === "verbo") setVerbo(value);
    if (kind === "flecha") setFlecha(value);
  }

  return (
    <Card className={cn(!demo && correct && "card-jump", !demo && chosen && !correct && "shake")}>
      <MissionText mission={mission} />
      <p className="mt-2 text-[17px]">Misión {index + 1} de {dinamica.misiones.length}</p>
      <p className="text-[17px]">Elige cómo se mueve y hacia dónde.</p>
      <div className="relative mt-3 h-52 overflow-hidden rounded-2xl border-[3px] border-current">
        <div className="sunny-move absolute top-4 left-2" style={{ transform }}>
          <div className="origin-top scale-75">
            <Sunny state={chosen ? "hop" : "idle"} />
          </div>
          <div className="mx-auto -mt-2 h-2 w-16 rounded-full bg-ink/25" />
        </div>
        <div className="absolute right-3 bottom-3">
          <StickerBox />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <div>
          <p className="mb-1 text-[17px]">¿Cómo se mueve?</p>
          <div className="flex flex-wrap gap-2">
            {VERBOS.map((item) => (
              <button
                key={item}
                type="button"
                className={cn("btn w-auto bg-ielts px-3 text-ink", verbo === item && "translate-x-1 translate-y-1 shadow-none")}
                onClick={() => pick("verbo", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-[17px]">¿Hacia dónde?</p>
          <div className="flex flex-wrap gap-2">
            {FLECHAS.map((item) => (
              <button
                key={item}
                type="button"
                className={cn("btn w-auto bg-repaso px-3 text-ink", flecha === item && "translate-x-1 translate-y-1 shadow-none")}
                onClick={() => pick("flecha", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      {chosen ? <p className="mt-3 text-[17px] text-ink">{demo ? mission.en : sentence}</p> : null}
      {hint ? <p className="mt-2 text-[17px]">{hint}</p> : null}
    </Card>
  );
}
