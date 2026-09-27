"use client";

import { useRef, useState, type ReactNode, type TouchEvent } from "react";
import { SpanishToggle } from "@/components/lesson/spanish-toggle";
import { Button } from "@/components/ui/button";
import type { WordEntry } from "@/lib/schemas/word";

const LONG_PRESS_MS = 500;
const WORD = /^[A-Za-z]+(?:['’-][A-Za-z]+)*$/;
const SKIP = "input, textarea, button, a, [data-no-lookup]";

type LookupState =
  | { status: "closed" }
  | { status: "loading"; word: string }
  | { status: "ready"; entry: WordEntry }
  | { status: "error"; word: string; message: string };

function cleanWord(raw: string) {
  const word = raw.trim().replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "").replace(/’/g, "'");
  return WORD.test(word) ? word.toLowerCase() : null;
}

function wordAtPoint(x: number, y: number) {
  const range = document.caretRangeFromPoint?.(x, y);
  const node = range?.startContainer;
  if (!range || !node || node.nodeType !== Node.TEXT_NODE) return null;
  const text = node.textContent ?? "";
  let start = range.startOffset;
  let end = range.startOffset;
  while (start > 0 && /[A-Za-z'’-]/.test(text[start - 1]!)) start -= 1;
  while (end < text.length && /[A-Za-z'’-]/.test(text[end]!)) end += 1;
  return cleanWord(text.slice(start, end));
}

export function WordLookup({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LookupState>({ status: "closed" });
  const press = useRef<{ timer: number; x: number; y: number } | null>(null);

  async function lookUp(word: string) {
    setState({ status: "loading", word });
    try {
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });
      const data = (await response.json()) as { ok: true; entry: WordEntry } | { ok: false; message: string };
      setState(data.ok ? { status: "ready", entry: data.entry } : { status: "error", word, message: data.message });
    } catch {
      setState({ status: "error", word, message: "No se pudo conectar con el servidor. Revisa la conexión y vuelve a intentar." });
    }
  }

  function skip(target: EventTarget | null) {
    if (!(target instanceof Element)) return true;
    return Boolean(target.closest(SKIP)) || target.closest("[lang]")?.getAttribute("lang") !== "en";
  }

  function onDoubleClick(event: React.MouseEvent) {
    if (skip(event.target)) return;
    const word = cleanWord(window.getSelection()?.toString() ?? "") ?? wordAtPoint(event.clientX, event.clientY);
    if (word) void lookUp(word);
  }

  function cancelPress() {
    if (press.current) window.clearTimeout(press.current.timer);
    press.current = null;
  }

  function onTouchStart(event: TouchEvent) {
    if (skip(event.target) || event.touches.length !== 1) return;
    const touch = event.touches[0]!;
    const { clientX: x, clientY: y } = touch;
    cancelPress();
    press.current = {
      x,
      y,
      timer: window.setTimeout(() => {
        press.current = null;
        const word = wordAtPoint(x, y);
        if (word) void lookUp(word);
      }, LONG_PRESS_MS),
    };
  }

  function onTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    if (!press.current || !touch) return;
    if (Math.abs(touch.clientX - press.current.x) > 10 || Math.abs(touch.clientY - press.current.y) > 10) cancelPress();
  }

  return (
    <div lang="en" onDoubleClick={onDoubleClick} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={cancelPress} onTouchCancel={cancelPress}>
      {children}
      {state.status !== "closed" ? (
        <div className="fixed inset-x-0 bottom-24 z-40 px-4" data-no-lookup>
          <section role="dialog" aria-label="Word card" className="card mx-auto w-full max-w-[390px] p-4">
            {state.status === "loading" ? <p className="text-[17px]">Looking up {state.word}…</p> : null}
            {state.status === "error" ? (
              <>
                <p className="font-display text-2xl">{state.word}</p>
                <p className="mt-2 text-[17px]">{state.message}</p>
              </>
            ) : null}
            {state.status === "ready" ? (
              <>
                <p className="font-display text-3xl tracking-tight">{state.entry.word}</p>
                <p className="text-[17px]">
                  ({state.entry.pronunciation}
                  {state.entry.pronunciationNote ? `: ${state.entry.pronunciationNote}` : ""})
                </p>
                <p className="mt-1 text-sm uppercase tracking-wide">{state.entry.partOfSpeech}</p>
                <p className="mt-2 text-[17px]">{state.entry.meaningEn}</p>
                <ul className="mt-2 list-disc pl-5 text-[17px]">
                  {state.entry.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
                <SpanishToggle es={state.entry.meaningEs} />
              </>
            ) : null}
            <Button tone="paper" className="mt-3" onClick={() => setState({ status: "closed" })}>
              Close
            </Button>
          </section>
        </div>
      ) : null}
    </div>
  );
}
