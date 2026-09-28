"use client";

import { useState } from "react";
import { SpanishToggle } from "@/components/lesson/spanish-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { diffWords, gradeAnswer } from "@/lib/grading";
import type { AiGrade, Verdict } from "@/lib/schemas/grade";
import type { GradedItem } from "@/lib/schemas/lesson";

const FALLBACK_NOTICE = "No se pudo evaluar con IA; se comparó con la respuesta esperada.";

const STAMP: Record<Verdict, { label: string; tone: string }> = {
  correct: { label: "Correct", tone: "bg-biblio" },
  correct_different: { label: "Correct, but different", tone: "bg-hoy" },
  incorrect: { label: "Not quite", tone: "bg-alerta" },
};

export interface GradedRef {
  lessonId: string;
  kind: "check" | "predict";
  index: number;
}

interface Shown {
  verdict: Verdict;
  yours: string;
  expected: string;
  keyMatch: boolean;
  explanation?: { en: string; es: string };
  notice?: string;
}

function Marked({ text, against }: { text: string; against: string }) {
  return (
    <p className="text-[17px]">
      {diffWords(text, against).map((word, index) => (
        <span key={`${word.text}-${index}`}>
          {index > 0 ? " " : null}
          {word.changed ? <mark className="rounded bg-repaso px-1 text-ink">{word.text}</mark> : word.text}
        </span>
      ))}
    </p>
  );
}

async function askGrader(ref: GradedRef, answer: string): Promise<AiGrade | null> {
  try {
    const response = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...ref, answer }),
    });
    const data = (await response.json()) as ({ ok: true } & AiGrade) | { ok: false };
    return data.ok ? { verdict: data.verdict, explanationEn: data.explanationEn, explanationEs: data.explanationEs } : null;
  } catch {
    return null;
  }
}

export function GradedPrompt({
  item,
  gradedRef,
  onResult,
}: {
  item: GradedItem;
  gradedRef: GradedRef;
  onResult: (correct: boolean) => void;
}) {
  const [draft, setDraft] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [shown, setShown] = useState<Shown | null>(null);

  function finish(result: Shown) {
    setShown(result);
    onResult(result.verdict !== "incorrect");
  }

  async function submit() {
    const given = item.choices ? (choice ?? "") : draft;
    if (!given.trim() || checking) return;
    const local = gradeAnswer(item, given);
    const base = { yours: local.yours, expected: local.expected, keyMatch: local.correct };
    if (item.choices || local.correct) {
      finish({ ...base, verdict: local.correct ? "correct" : "incorrect" });
      return;
    }
    setChecking(true);
    const ai = await askGrader(gradedRef, given);
    setChecking(false);
    if (!ai) {
      finish({ ...base, verdict: "incorrect", notice: FALLBACK_NOTICE });
      return;
    }
    finish({ ...base, verdict: ai.verdict, explanation: { en: ai.explanationEn, es: ai.explanationEs } });
  }

  const locked = Boolean(shown) || checking;

  return (
    <div>
      <p className="text-[17px]">{item.promptEn}</p>
      {item.choices ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.choices.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={choice === option}
              className={cn("btn w-auto px-3 text-ink", choice === option ? "bg-hoy" : "bg-paper")}
              onClick={() => setChoice(option)}
              disabled={locked}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          aria-label="Your answer"
          value={draft}
          disabled={locked}
          onChange={(event) => setDraft(event.target.value)}
          className="mt-3 min-h-12 w-full rounded-2xl border-[3px] border-current bg-transparent px-3"
        />
      )}
      {shown ? (
        <div className="mt-4" data-testid="verdict">
          <p
            role="status"
            className={cn(
              "inline-block rounded-[10px] border-[3px] border-ink px-4 py-2 font-display text-2xl text-ink",
              STAMP[shown.verdict].tone,
            )}
          >
            {STAMP[shown.verdict].label}
          </p>
          {shown.explanation?.en ? (
            <div className="mt-3">
              <p className="text-[17px]">{shown.explanation.en}</p>
              <SpanishToggle es={shown.explanation.es} />
            </div>
          ) : null}
          {shown.notice ? <p className="mt-3 text-[17px]">{shown.notice}</p> : null}
          <p className="mt-3 text-sm uppercase tracking-wide">Your answer</p>
          {shown.keyMatch ? <p className="text-[17px]">{shown.yours}</p> : <Marked text={shown.yours} against={shown.expected} />}
          <p className="mt-2 text-sm uppercase tracking-wide">Expected</p>
          {shown.keyMatch ? <p className="text-[17px]">{shown.expected}</p> : <Marked text={shown.expected} against={shown.yours} />}
          <p className="mt-3 text-sm uppercase tracking-wide">Why</p>
          <p className="text-[17px]">{item.why}</p>
          <SpanishToggle es={item.whyEs} />
        </div>
      ) : (
        <Button className="mt-3" onClick={() => void submit()} disabled={checking}>
          {checking ? "Checking…" : "Submit"}
        </Button>
      )}
    </div>
  );
}
