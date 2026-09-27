import raw from "@/content/lecciones/01-verb-to-be.json";
import { lessonSchema, type Lesson } from "@/lib/schemas/lesson";

export const verbToBeLesson: Lesson = lessonSchema.parse(raw);
