"use client";

import { useState } from "react";
import { SpanishToggle } from "@/components/lesson/spanish-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { diffWords, gradeAnswer, type Grade } from "@/lib/grading";
import type { GradedItem } from "@/lib/schemas/lesson";

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

export function GradedPrompt({
  item,
  onResult,
}: {
  item: GradedItem;
  onResult: (correct: boolean) => void;
}) {
  const [draft, setDraft] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);

  function submit() {
    const given = item.choices ? (choice ?? "") : draft;
    if (!given.trim()) return;
    const result = gradeAnswer(item, given);
    setGrade(result);
    onResult(result.correct);
  }

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
              disabled={Boolean(grade)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          aria-label="Your answer"
          value={draft}
          disabled={Boolean(grade)}
          onChange={(event) => setDraft(event.target.value)}
          className="mt-3 min-h-12 w-full rounded-2xl border-[3px] border-current bg-transparent px-3"
        />
      )}
      {grade ? (
        <div className="mt-4" data-testid="verdict">
          <p
            role="status"
            className={cn(
              "inline-block rounded-[10px] border-[3px] border-ink px-4 py-2 font-display text-2xl text-ink",
              grade.correct ? "bg-biblio" : "bg-alerta",
            )}
          >
            {grade.correct ? "Correct" : "Not quite"}
          </p>
          <p className="mt-3 text-sm uppercase tracking-wide">Your answer</p>
          {grade.correct ? <p className="text-[17px]">{grade.yours}</p> : <Marked text={grade.yours} against={grade.expected} />}
          <p className="mt-2 text-sm uppercase tracking-wide">Expected</p>
          {grade.correct ? <p className="text-[17px]">{grade.expected}</p> : <Marked text={grade.expected} against={grade.yours} />}
          <p className="mt-3 text-sm uppercase tracking-wide">Why</p>
          <p className="text-[17px]">{item.why}</p>
          <SpanishToggle es={item.whyEs} />
        </div>
      ) : (
        <Button className="mt-3" onClick={submit}>
          Submit
        </Button>
      )}
    </div>
  );
}
