"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Dinamica } from "@/lib/schemas/pack";
import { useSessionStore } from "@/lib/stores/session";

type Upgrade = Extract<Dinamica, { tipo: "upgrade" }>;

export function UpgradePlay({ dinamica }: { dinamica: Upgrade }) {
  const next = useSessionStore((state) => state.next);
  const [step, setStep] = useState<1 | 2>(1);
  const [demo, setDemo] = useState(true);
  const [choice, setChoice] = useState<number | null>(dinamica.correcta);
  const [own, setOwn] = useState("");
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setChoice(null);
      setDemo(false);
    }, 5000);
    return () => window.clearTimeout(id);
  }, []);

  function pick(index: number) {
    if (demo || step !== 1) return;
    setChoice(index);
    if (index === dinamica.correcta) {
      setHint(null);
      window.setTimeout(() => setStep(2), 450);
      return;
    }
    setHint("Esa no es la versión C1.");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!own.trim()) {
      setHint("Escribe una línea para seguir.");
      return;
    }
    next();
  }

  return (
    <Card className={cn(!demo && choice === dinamica.correcta && step === 1 && "card-jump", hint && choice !== dinamica.correcta && "shake")}>
      {step === 1 ? (
        <>
          <p className="font-display text-2xl tracking-tight">Elige la versión C1</p>
          <p className="mt-2 text-[17px]">Paso 1 de 2</p>
          <p className="text-[17px]">Toca la frase más precisa.</p>
          <p className="mt-3 text-[17px]">{dinamica.b1}</p>
          <div className="mt-4 flex flex-col gap-3">
            {dinamica.opciones.map((option, index) => (
              <Button key={option} tone={choice === index ? "accent" : "paper"} onClick={() => pick(index)}>
                {option}
              </Button>
            ))}
          </div>
          {demo ? <p className="mt-3 text-[17px]">Esta es la C1.</p> : null}
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <p className="font-display text-2xl tracking-tight">Ahora escribe la tuya</p>
          <p className="mt-2 text-[17px]">Paso 2 de 2</p>
          <p className="mb-3 text-[17px]">Escribe tu versión en el campo.</p>
          <input
            id="own-line"
            value={own}
            onChange={(event) => setOwn(event.target.value)}
            className="mb-3 min-h-12 w-full rounded-2xl border-[3px] border-current bg-transparent px-3 text-ink"
          />
          <Button type="submit">Siguiente</Button>
        </form>
      )}
      {hint ? <p className="mt-3 text-[17px]">{hint}</p> : null}
    </Card>
  );
}
