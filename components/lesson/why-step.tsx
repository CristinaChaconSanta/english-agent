"use client";

import { useState } from "react";
import { ContrastPair } from "@/components/lesson/contrast-pair";
import { GradedPrompt } from "@/components/lesson/graded-prompt";
import { SpanishToggle } from "@/components/lesson/spanish-toggle";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/lib/schemas/lesson";

type WhyChain = Lesson["whyChain"];

type Part =
  | { kind: "link"; title: string; en: string; es: string; lead?: { en: string; es: string }; mentalModel?: boolean }
  | { kind: "predict"; index: number }
  | { kind: "pair" }
  | { kind: "also"; note: WhyChain["also"][number] };

function buildParts(chain: WhyChain): Part[] {
  const { links } = chain;
  return [
    { kind: "link", title: "1. The big picture", lead: chain.intro, ...links.bigPicture },
    { kind: "link", title: "2. Where it comes from", ...links.whereItComesFrom },
    { kind: "link", title: "3. The problem it creates", ...links.problemItCreates },
    { kind: "link", title: "4. English's solution", ...links.englishsSolution },
    { kind: "link", title: "5. How native speakers see it", mentalModel: true, ...links.howNativeSpeakersSeeIt },
    ...chain.predict.map((_, index): Part => ({ kind: "predict", index })),
    { kind: "pair" },
    ...chain.also.map((note): Part => ({ kind: "also", note })),
  ];
}

export function WhyStep({ lessonId, chain, onDone }: { lessonId: string; chain: WhyChain; onDone: () => void }) {
  const parts = buildParts(chain);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const part = parts[index]!;

  function next() {
    setAnswered(false);
    if (index + 1 < parts.length) setIndex(index + 1);
    else onDone();
  }

  const nextButton = (
    <Button className="mt-4" onClick={next}>
      Next
    </Button>
  );

  return (
    <div className="mt-2" key={index}>
      <p className="text-sm">Part {index + 1} of {parts.length}</p>
      {part.kind === "link" ? (
        <>
          <p className="mt-2 font-display text-2xl">{part.title}</p>
          {part.mentalModel ? <p className="mt-1 text-sm uppercase tracking-wide">A useful mental model</p> : null}
          {part.lead ? <p className="mt-3 text-[17px]">{part.lead.en}</p> : null}
          <p className="mt-3 text-[17px]">{part.en}</p>
          <SpanishToggle es={[part.lead?.es, part.es].filter(Boolean).join(" ")} />
          {nextButton}
        </>
      ) : null}
      {part.kind === "predict" ? (
        <>
          <p className="mt-2 font-display text-2xl">
            Predict it {part.index + 1} of {chain.predict.length}
          </p>
          <div className="mt-3">
            <GradedPrompt
              key={part.index}
              item={chain.predict[part.index]!}
              gradedRef={{ lessonId, kind: "predict", index: part.index }}
              onResult={() => setAnswered(true)}
            />
          </div>
          {answered ? nextButton : null}
        </>
      ) : null}
      {part.kind === "pair" ? (
        <>
          <p className="mt-2 font-display text-2xl">7. Spanish vs English in one line</p>
          <ContrastPair es={chain.links.spanishVsEnglish.es} en={chain.links.spanishVsEnglish.en} />
          {nextButton}
        </>
      ) : null}
      {part.kind === "also" ? (
        <>
          <p className="mt-2 font-display text-2xl">{part.note.title.en}</p>
          {part.note.isMentalModel ? <p className="mt-1 text-sm uppercase tracking-wide">A useful mental model</p> : null}
          <p className="mt-3 text-[17px]">{part.note.body.en}</p>
          <SpanishToggle es={`${part.note.title.es} ${part.note.body.es}`} />
          {nextButton}
        </>
      ) : null}
    </div>
  );
}
