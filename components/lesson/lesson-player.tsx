"use client";

import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Sunny } from "@/components/characters/sunny";
import { CheckStep, scoreLine } from "@/components/lesson/check-step";
import { ContrastPair } from "@/components/lesson/contrast-pair";
import { SpanishToggle } from "@/components/lesson/spanish-toggle";
import { VerbTable } from "@/components/lesson/verb-table";
import { WhyStep } from "@/components/lesson/why-step";
import { BottomBar } from "@/components/ui/bottom-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer } from "@/components/ui/timer";
import { WavyDivider } from "@/components/ui/wavy-divider";
import { saveLessonCheck, saveWrapUp } from "@/lib/actions/lesson";
import { saveLessonSession } from "@/lib/actions/session";
import { useNightMode } from "@/lib/night";
import type { Lesson } from "@/lib/schemas/lesson";
import { lessonVars } from "@/lib/themes";

const STEP_COUNT = 13;

export function LessonPlayer({ lesson, canSkip }: { lesson: Lesson; canSkip: boolean }) {
  const router = useRouter();
  const { night, toggle } = useNightMode();
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [step, setStep] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [resultId, setResultId] = useState<string | null>(null);
  const [wrapLine, setWrapLine] = useState("");
  const [note, setNote] = useState<string | null>(null);

  const started = startedAt !== null;
  const elapsedSec = startedAt === null ? 0 : Math.max(0, Math.floor((now - startedAt) / 1000));

  useEffect(() => {
    if (startedAt === null) return;
    const tick = () => setNow(Date.now());
    const id = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [startedAt]);

  function start() {
    const at = Date.now();
    setStartedAt(at);
    setNow(at);
  }

  async function saveRound(results: boolean[], missedIndexes: number[]) {
    const score = results.filter(Boolean).length;
    const missed = missedIndexes.flatMap((index) => {
      const item = lesson.check.items[index];
      return item ? [{ frente: item.promptEn, atras: item.answer, pronunciacion: item.answer }] : [];
    });
    const saved = await saveLessonCheck({
      lessonId: lesson.id,
      score,
      outOf: lesson.check.outOf,
      passed: score >= lesson.check.passThreshold,
      missed,
    });
    if (saved.ok) setResultId(saved.id);
    else setNote(saved.message);
  }

  async function onWrap(event: FormEvent) {
    event.preventDefault();
    const line = wrapLine.trim();
    if (!line) {
      setNote("Write one line to save.");
      return;
    }
    const session = await saveLessonSession({ minutes: Math.round(elapsedSec / 60), lessonId: lesson.id, logro: line });
    if (!session.ok) {
      setNote(session.message);
      return;
    }
    if (resultId) {
      const saved = await saveWrapUp({ resultId, line });
      if (!saved.ok) {
        setNote(saved.message);
        return;
      }
    }
    router.push("/progreso");
    router.refresh();
  }

  const shell = (child: ReactNode) => (
    <main className="lesson px-4 pb-28 pt-6" style={lessonVars(lesson.temaColor, night) as CSSProperties}>
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-4">
        <button type="button" className="btn w-auto self-end bg-paper px-4 text-ink" onClick={toggle}>
          {night ? "Día" : "Noche"}
        </button>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl leading-none tracking-tight">Hoy</h1>
          <Sunny state={started ? "idle" : "hop"} />
        </div>
        {started ? <Timer elapsedSec={elapsedSec} /> : null}
        <WavyDivider />
        {child}
      </div>
      <BottomBar />
    </main>
  );

  if (!started) {
    return shell(
      <Card>
        <p className="mb-4 text-[17px]">Lesson 01. Verb to be.</p>
        <Button onClick={start}>Start</Button>
        {canSkip ? (
          <button type="button" className="mt-3 min-h-12 w-full text-sm underline" onClick={() => router.push("/hoy?session=pack")}>
            Skip
          </button>
        ) : null}
      </Card>,
    );
  }

  const next = () => setStep((value) => value + 1);

  return shell(
    <Card>
      <p className="text-[17px]">Step {step + 1} of {STEP_COUNT}</p>
      {step === 0 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Goal</h2>
          <p className="mt-3 text-[17px]">{lesson.goal.what.en}</p>
          <p className="mt-3 text-[17px]">{lesson.goal.whyNow.en}</p>
          <p className="mt-3 text-[17px]">{lesson.goal.successMeasure.en}</p>
          <SpanishToggle es={`${lesson.goal.what.es} ${lesson.goal.whyNow.es} ${lesson.goal.successMeasure.es}`} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Words you need</h2>
          <p className="mt-2 text-[17px]">Read each word before the lesson uses it.</p>
          {lesson.glossary.map((entry) => (
            <div key={entry.term.en} className="mt-4">
              <p className="font-display text-2xl">{entry.term.en}</p>
              <p className="text-[17px]">{entry.what.en} {entry.why.en}</p>
              <SpanishToggle es={`${entry.term.es}: ${entry.what.es} ${entry.why.es}`} />
            </div>
          ))}
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 2 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">What it is for</h2>
          <p className="mt-2 text-[17px]">Read the four jobs.</p>
          <p className="mt-3 text-[17px]">{lesson.uses.intro.en}</p>
          <ul className="mt-3 list-disc pl-5 text-[17px]">
            {lesson.uses.items.map((item) => <li key={item.en}>{item.en}</li>)}
          </ul>
          {lesson.uses.contrastPairs.map((pair) => <ContrastPair key={pair.en} es={pair.es} en={pair.en} />)}
          <SpanishToggle es={lesson.uses.intro.es} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 3 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">How to build it</h2>
          <p className="mt-2 text-[17px]">Read the scene, then the table.</p>
          <p className="mt-3 text-[17px]">{lesson.form.formula.en}</p>
          <div className="mt-3 overflow-x-auto text-[17px]">
            {lesson.form.rows.map((row) => (
              <p key={row.who}>{row.who}: {row.affirmative} / {row.negative} / {row.question}</p>
            ))}
          </div>
          {lesson.form.contrastPairs.map((pair) => <ContrastPair key={pair.en} es={pair.es} en={pair.en} />)}
          <SpanishToggle es={lesson.form.formula.es} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 4 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Why it works this way</h2>
          <p className="mt-2 text-[17px]">Read one link at a time.</p>
          <WhyStep chain={lesson.whyChain} onDone={next} />
        </>
      ) : null}
      {step === 5 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">When not to use it</h2>
          <p className="mt-2 text-[17px]">Read each wrong line, then the right one.</p>
          {lesson.traps.map((trap) => (
            <div key={trap.wrongEn} className="mt-4 text-[17px]">
              <p>{trap.wrongEn}</p>
              <p>{trap.rightEn}</p>
              <p>{trap.why.en}</p>
              <SpanishToggle es={trap.why.es} />
            </div>
          ))}
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 6 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Hack</h2>
          <p className="mt-2 text-[17px]">Read this once, then say it back.</p>
          <p className="mt-3 text-[17px]">{lesson.hack.en}</p>
          <SpanishToggle es={lesson.hack.es} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 7 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Verb list</h2>
          <p className="mt-2 text-[17px]">Read the forms used in this lesson. Swipe the table sideways.</p>
          <VerbTable verbs={lesson.verbList} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 8 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Read</h2>
          <p className="mt-2 text-[17px]">Read this. Notice be.</p>
          <p className="mt-3 text-[17px]">{lesson.read.text.en}</p>
          <SpanishToggle es={lesson.read.text.es} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 9 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Summary</h2>
          <p className="mt-2 text-[17px]">Read the three lines.</p>
          <ol className="mt-3 list-decimal pl-5 text-[17px]">
            {lesson.summary.lines.map((line) => <li key={line.en}>{line.en}</li>)}
          </ol>
          <SpanishToggle es={lesson.summary.lines.map((line) => line.es).join(" ")} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 10 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Practice</h2>
          <p className="mt-2 text-[17px]">Read what to practice.</p>
          <p className="mt-3 text-[17px]">{lesson.practice.en}</p>
          <SpanishToggle es={lesson.practice.es} />
          <Button className="mt-4" onClick={next}>Next</Button>
        </>
      ) : null}
      {step === 11 ? (
        <>
          <h2 className="font-display text-3xl tracking-tight">Check</h2>
          <CheckStep
            check={lesson.check}
            onRoundEnd={(results, missed) => void saveRound(results, missed)}
            onDone={(score) => {
              setFinalScore(score);
              next();
            }}
          />
          {note ? <p className="mt-3 text-[17px]">{note}</p> : null}
        </>
      ) : null}
      {step === 12 ? (
        <form onSubmit={onWrap}>
          <h2 className="font-display text-3xl tracking-tight">Wrap-up</h2>
          <p className="mt-2 text-[17px]">{scoreLine(finalScore, lesson.check, true)}</p>
          <p className="mt-3 text-[17px]">{lesson.wrapUp.en}</p>
          <label className="mt-3 block text-[17px]" htmlFor="wrap-line">Your line</label>
          <input id="wrap-line" value={wrapLine} onChange={(event) => setWrapLine(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border-[3px] border-current bg-transparent px-3" />
          <Button className="mt-4" type="submit">Save</Button>
          {note ? <p className="mt-3 text-[17px]">{note}</p> : null}
        </form>
      ) : null}
    </Card>,
  );
}
