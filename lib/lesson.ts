import raw from "@/content/lecciones/01-verb-to-be.json";
import { lessonSchema, type Lesson } from "@/lib/schemas/lesson";

export const verbToBeLesson: Lesson = lessonSchema.parse(raw);

export function answersMatch(given: string, expected: string) {
  const clean = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return clean(given) === clean(expected);
}
