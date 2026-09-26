"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { answersMatch } from "@/lib/lesson";
import type { GradedItem } from "@/lib/schemas/lesson";

export function GradedPrompt({
  item,
  onResult,
}: {
  item: GradedItem;
  onResult: (correct: boolean) => void;
}) {
  const [draft, setDraft] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [correct, setCorrect] = useState(false);

  function submit() {
    const given = item.choices ? (choice ?? "") : draft;
    if (!given.trim()) return;
    const ok = answersMatch(given, item.answer);
    setCorrect(ok);
    setSent(true);
    onResult(ok);
  }

  return (
    <div>
      <p className="text-[17px]">{item.promptEn}</p>
      {item.choices ? (
        <div className="mt-3 flex gap-2">
          {item.choices.map((option) => (
            <button
              key={option}
              type="button"
              className="btn w-auto bg-paper px-3 text-ink"
              onClick={() => setChoice(option)}
              disabled={sent}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          aria-label="Your answer"
          value={draft}
          disabled={sent}
          onChange={(event) => setDraft(event.target.value)}
          className="mt-3 min-h-12 w-full rounded-2xl border-[3px] border-current bg-transparent px-3"
        />
      )}
      {sent ? (
        <div className="mt-3 text-[17px]">
          <p>{correct ? "Correct." : "Not this one."}</p>
          <p>{item.answer}</p>
          <p>{item.why}</p>
        </div>
      ) : (
        <Button className="mt-3" onClick={submit}>
          Submit
        </Button>
      )}
    </div>
  );
}
