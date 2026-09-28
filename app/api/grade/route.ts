import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { generateObject, type LanguageModel } from "ai";
import { NextResponse } from "next/server";
import { gradeAnswer } from "@/lib/grading";
import { loadLesson } from "@/lib/lesson-store";
import { aiGradeSchema, gradeRequestSchema } from "@/lib/schemas/grade";
import { createServerSupabase } from "@/lib/supabase/server";

const SYSTEM = `You grade one written answer from a Spanish speaker (Colombia) learning English for IELTS.
Judge the lesson point first. If the answer avoids the structure being practiced (for example it drops the dummy subject "it", or uses a different tense than the one the item tests), the verdict is "incorrect" even if it is a valid English sentence.
Verdicts:
- "correct": same structure and same meaning as the expected answer; small wording or spelling differences are fine.
- "correct_different": uses the lesson point correctly but the meaning changes slightly. Say how, for example: "on Friday" = one specific Friday, "on a Friday" = any Friday.
- "incorrect": say exactly which part is wrong and why, in terms of the lesson point.
Ignore capital letters and final punctuation. Only mark serious mistakes, the ones that change the meaning or lower an IELTS score.
explanationEn: one or two short sentences, plain English, no dashes. explanationEs: the same in Spanish.`;

function models(): { name: string; model: LanguageModel }[] {
  const list: { name: string; model: LanguageModel }[] = [];
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) list.push({ name: "groq", model: createGroq({ apiKey: groqKey })("openai/gpt-oss-20b") });
  const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (googleKey) list.push({ name: "gemini", model: createGoogleGenerativeAI({ apiKey: googleKey })("gemini-flash-lite-latest") });
  return list;
}

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  const parsed = gradeRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "La respuesta no llegó completa. Vuelve a enviarla.");
  const { lessonId, kind, index, answer } = parsed.data;

  const lesson = loadLesson(lessonId);
  const item = lesson ? (kind === "check" ? lesson.check.items[index] : lesson.whyChain.predict[index]) : undefined;
  if (!lesson || !item) return fail(404, "No se encontró ese ítem de la lección.");
  if (item.choices) return fail(400, "Los ítems de opción múltiple se califican sin IA.");

  if (gradeAnswer(item, answer).correct) {
    return NextResponse.json({ ok: true, verdict: "correct", explanationEn: "", explanationEs: "", source: "key" });
  }

  const supabase = await createServerSupabase();
  if (!supabase) return fail(503, "Falta la configuración de Supabase en el entorno.");
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return fail(401, "Inicia sesión con el enlace del correo para evaluar con IA.");

  const prompt = [
    `Lesson topic: ${lesson.goal.what.en}`,
    `Item: ${item.promptEn}`,
    `Expected answer: ${item.answer}`,
    `Why the expected answer is right: ${item.why}`,
    `Learner's answer: ${answer}`,
  ].join("\n");

  for (const { name, model } of models()) {
    try {
      const { object } = await generateObject({ model, schema: aiGradeSchema, system: SYSTEM, prompt, maxRetries: 1 });
      return NextResponse.json({ ok: true, ...object, source: name });
    } catch {
      continue;
    }
  }
  return fail(502, "No se pudo evaluar con IA; se comparó con la respuesta esperada.");
}
