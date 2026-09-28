"use client";

import { useState } from "react";
import { GradedPrompt } from "@/components/lesson/graded-prompt";
import { SpanishToggle } from "@/components/lesson/spanish-toggle";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/lib/schemas/lesson";

export function scoreLine(score: number, check: Lesson["check"], finished: boolean) {
  const base = `Score: ${score} of ${check.outOf}`;
  if (!finished) return `${base}.`;
  return score >= check.passThreshold ? `${base}. Passed.` : `${base}. Not passed: you need ${check.passThreshold}.`;
}

export function CheckStep({
  lessonId,
  check,
  onRoundEnd,
  onDone,
}: {
  lessonId: string;
  check: Lesson["check"];
  onRoundEnd: (results: boolean[], missedIndexes: number[]) => void;
  onDone: (score: number) => void;
}) {
  const [round, setRound] = useState(1);
  const [queue, setQueue] = useState(() => check.items.map((_, index) => index));
  const [pos, setPos] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState(() => check.items.map(() => false));
  const [summary, setSummary] = useState(false);

  const score = results.filter(Boolean).length;
  const failed = check.items.flatMap((item, index) => (results[index] ? [] : [{ item, index }]));
  const itemIndex = queue[pos] ?? 0;
  const item = check.items[itemIndex]!;

  function onResult(correct: boolean) {
    setResults((current) => current.map((value, index) => (index === itemIndex ? correct : value)));
    setAnswered(true);
  }

  function next() {
    setAnswered(false);
    if (pos + 1 < queue.length) {
      setPos(pos + 1);
      return;
    }
    setSummary(true);
    onRoundEnd(results, queue.filter((index) => !results[index]));
  }

  function retry() {
    setQueue(failed.map(({ index }) => index));
    setPos(0);
    setRound(round + 1);
    setSummary(false);
  }

  if (summary) {
    const passed = score >= check.passThreshold;
    return (
      <div className="mt-3">
        <p className="font-display text-2xl">{scoreLine(score, check, true)}</p>
        {passed ? (
          <Button className="mt-4" onClick={() => onDone(score)}>
            Next
          </Button>
        ) : (
          <>
            <p className="mt-3 text-[17px]">Read the items you missed.</p>
            {failed.map(({ item: missed }) => (
              <div key={missed.promptEn} className="mt-4 text-[17px]">
                <p>{missed.promptEn}</p>
                <p className="mt-1 text-sm uppercase tracking-wide">Expected</p>
                <p>{missed.answer}</p>
                <p className="mt-1 text-sm uppercase tracking-wide">Why</p>
                <p>{missed.why}</p>
                <SpanishToggle es={missed.whyEs} />
              </div>
            ))}
            <Button className="mt-4" onClick={retry}>
              Try the Check again
            </Button>
            <button type="button" className="mt-3 min-h-12 w-full text-sm underline" onClick={() => onDone(score)}>
              Go to wrap-up
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <p className="text-[17px]">
        Write or choose before you see the answer. Item {pos + 1} of {queue.length}.
      </p>
      <div className="mt-3">
        <GradedPrompt
          key={`${round}-${itemIndex}`}
          item={item}
          gradedRef={{ lessonId, kind: "check", index: itemIndex }}
          onResult={onResult}
        />
      </div>
      {answered ? (
        <>
          <p className="mt-4 font-display text-2xl">{scoreLine(score, check, false)}</p>
          <Button className="mt-4" onClick={next}>
            Next
          </Button>
        </>
      ) : null}
    </div>
  );
}
