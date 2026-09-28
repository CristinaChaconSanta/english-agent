import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { lessonSchema, type Lesson } from "@/lib/schemas/lesson";

const cache = new Map<string, Lesson>();

export function loadLesson(lessonId: string): Lesson | null {
  if (!/^\d{2}-[a-z0-9-]+$/.test(lessonId)) return null;
  const hit = cache.get(lessonId);
  if (hit) return hit;
  const file = path.join(process.cwd(), "content/lecciones", `${lessonId}.json`);
  if (!existsSync(file)) return null;
  const lesson = lessonSchema.parse(JSON.parse(readFileSync(file, "utf8")));
  cache.set(lessonId, lesson);
  return lesson;
}
