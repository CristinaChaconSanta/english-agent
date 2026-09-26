"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sunny } from "@/components/characters/sunny";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { saveSession } from "@/lib/actions/session";
import type { Dinamica } from "@/lib/schemas/pack";
import { useSessionStore } from "@/lib/stores/session";

type Logro = Extract<Dinamica, { tipo: "logro" }>;

export function LogroPlay({ dinamica, semana }: { dinamica: Logro; semana: string }) {
  const logro = useSessionStore((state) => state.logro);
  const setLogro = useSessionStore((state) => state.setLogro);
  const elapsedSec = useSessionStore((state) => state.elapsedSec);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [demo, setDemo] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLogro("Today I named the direction.");
    const id = window.setTimeout(() => {
      setLogro("");
      setDemo(false);
    }, 5000);
    return () => window.clearTimeout(id);
  }, [setLogro]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const line = logro.trim();
    if (!line) {
      setMessage("Escribe una línea para guardar.");
      return;
    }
    setPending(true);
    const result = await saveSession({
      minutes: Math.max(1, Math.round(elapsedSec / 60)),
      logro: line,
      semana,
    });
    setPending(false);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    router.push("/progreso");
  }

  return (
    <Card className="character-celebra">
      <div className="mb-2 flex justify-center">
        <Sunny state="celebra" />
      </div>
      <form onSubmit={onSubmit}>
        <p className="font-display text-2xl tracking-tight">Escribe lo que lograste hoy</p>
        <p className="mt-2 mb-3 text-[17px]">Escribe una línea en inglés.</p>
        <label className="mb-2 block font-display text-3xl tracking-tight" htmlFor="logro">
          {dinamica.pista}
        </label>
          <input
            id="logro"
            value={logro}
            disabled={demo}
            onChange={(event) => setLogro(event.target.value)}
          className="mb-3 min-h-12 w-full rounded-2xl border-[3px] border-current bg-transparent px-3"
        />
        <Button type="submit" disabled={pending}>
          Guardar
        </Button>
      </form>
      {message ? <p className="mt-3">{message}</p> : null}
    </Card>
  );
}
