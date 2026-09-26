"use client";

import { useEffect, useState } from "react";
import { Loop } from "@/components/characters/loop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { reviewCard, type ReviewRating } from "@/lib/actions/session";
import type { Dinamica } from "@/lib/schemas/pack";
import { useSessionStore } from "@/lib/stores/session";

type Repaso = Extract<Dinamica, { tipo: "repaso" }>;

const RATINGS: { id: ReviewRating; label: string }[] = [
  { id: "again", label: "Otra vez" },
  { id: "hard", label: "Difícil" },
  { id: "good", label: "Bien" },
  { id: "easy", label: "Fácil" },
];

export function RepasoPlay({ dinamica }: { dinamica: Repaso }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [demo, setDemo] = useState(true);
  const next = useSessionStore((state) => state.next);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setOpen(false);
      setDemo(false);
    }, 5000);
    return () => window.clearTimeout(id);
  }, []);
  const card = dinamica.cartas[index];

  async function rate(rating: ReviewRating) {
    if (!card) return;
    await reviewCard({
      frente: card.frente,
      atras: card.atras,
      pronunciacion: card.pronunciacion,
      rating,
    });
    if (index + 1 >= dinamica.cartas.length) {
      next();
      return;
    }
    setIndex(index + 1);
    setOpen(false);
  }

  if (!card) return null;

  return (
    <Card>
      <p className="font-display text-2xl tracking-tight">Recuerda la frase en inglés</p>
      <p className="mt-2 text-[17px]">Carta {index + 1} de {dinamica.cartas.length}</p>
      <p className="text-[17px]">Toca la tarjeta y elige qué tan bien la sabías.</p>
      <div className="mb-2 flex justify-center">
        <Loop state="idle" />
      </div>
      <button type="button" className="min-h-28 w-full text-left" onClick={() => setOpen(true)} disabled={demo}>
        <p className="font-display text-3xl tracking-tight">{open ? card.atras : card.frente}</p>
        {open ? <p className="mt-2 font-marker text-xl">{card.pronunciacion}</p> : null}
      </button>
      {open ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {RATINGS.map((rating) => (
            <Button key={rating.id} tone="paper" onClick={() => rate(rating.id)}>
              {rating.label}
            </Button>
          ))}
        </div>
      ) : (
        <Button className="mt-4" tone="paper" onClick={() => setOpen(true)}>
          Ver inglés
        </Button>
      )}
    </Card>
  );
}
