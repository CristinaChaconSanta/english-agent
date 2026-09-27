import type { GradedItem } from "@/lib/schemas/lesson";

const GAP = /_{2,}/g;

export interface Grade {
  correct: boolean;
  yours: string;
  expected: string;
}

export interface DiffWord {
  text: string;
  changed: boolean;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^a-z0-9']+/g, " ")
    .replace(/'/g, "")
    .trim();
}

function gapSentence(prompt: string) {
  const quoted = prompt.match(/"([^"]*_{2,}[^"]*)"/)?.[1];
  if (!quoted) return null;
  return quoted.replace(/\s*\([^)]*\)/g, "").replace(/\s+([,.!?])/g, "$1").trim();
}

function fillGaps(sentence: string, given: string) {
  const gaps = sentence.match(GAP)?.length ?? 0;
  const parts = gaps > 1 ? given.split(",").map((part) => part.trim()) : [given.trim()];
  if (parts.length !== gaps) return null;
  let index = 0;
  return sentence.replace(GAP, () => parts[index++] ?? "");
}

export function gradeAnswer(item: GradedItem, given: string): Grade {
  const keys = [item.answer, ...(item.acceptedAnswers ?? [])];
  if (item.choices) {
    return { correct: keys.some((key) => normalize(key) === normalize(given)), yours: given, expected: item.answer };
  }

  const sentence = gapSentence(item.promptEn);
  const expanded = (value: string) => {
    if (!sentence) return value;
    const filled = fillGaps(sentence, value);
    return filled && normalize(filled) !== normalize(value) && normalize(value).split(" ").length < normalize(sentence).split(" ").length
      ? filled
      : value;
  };

  const expectedFull = keys.map(expanded);
  const yours = expanded(given);
  const pool = new Set([...keys, ...expectedFull].map(normalize));
  const correct = pool.has(normalize(given)) || pool.has(normalize(yours));
  return { correct, yours, expected: expectedFull[0] ?? item.answer };
}

export function diffWords(from: string, against: string): DiffWord[] {
  const words = from.split(/\s+/).filter(Boolean);
  const target = against.split(/\s+/).filter(Boolean).map(normalize);
  const source = words.map(normalize);
  const table = Array.from({ length: source.length + 1 }, () => new Array<number>(target.length + 1).fill(0));
  for (let i = source.length - 1; i >= 0; i -= 1) {
    for (let j = target.length - 1; j >= 0; j -= 1) {
      table[i]![j] = source[i] === target[j] ? table[i + 1]![j + 1]! + 1 : Math.max(table[i + 1]![j]!, table[i]![j + 1]!);
    }
  }
  const kept = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < source.length && j < target.length) {
    if (source[i] === target[j]) {
      kept.add(i);
      i += 1;
      j += 1;
    } else if (table[i + 1]![j]! >= table[i]![j + 1]!) {
      i += 1;
    } else {
      j += 1;
    }
  }
  return words.map((text, index) => ({ text, changed: !kept.has(index) }));
}
