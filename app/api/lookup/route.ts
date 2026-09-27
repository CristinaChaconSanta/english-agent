import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { wordEntrySchema, wordSchema } from "@/lib/schemas/word";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";

const MODEL = "openai/gpt-oss-20b";

const SYSTEM = `You write dictionary cards for a Spanish speaker (Colombia) learning English at B1 to C1 level.
Rules:
- meaningEn: the most common meaning, one short sentence in plain English.
- meaningEs: the same meaning in Spanish.
- examples: two short, natural sentences. Topics can be art, design, books, cities or daily life.
- pronunciation: Spanish letters only, syllables joined with "-", the stressed syllable in CAPITALS with a written accent. Examples: pipeline -> PÁIP-lain, agree -> a-GRÍ, comfortable -> KÓMF-ter-bol.
- Never use phonetic symbols (no θ, ð, ə, æ, ʃ, ː, slashes or brackets).
- pronunciationNote: empty string, unless a sound does not exist in Spanish; then say it in Spanish words, e.g. "th: lengua entre los dientes".`;

const requestSchema = z.object({ word: wordSchema });

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return fail(400, "Esa selección no es una sola palabra en inglés. Toca una palabra sin espacios.");
  const { word } = parsed.data;

  const supabase = await createServerSupabase();
  if (!supabase) return fail(503, "Falta la configuración de Supabase en el entorno.");
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return fail(401, "Inicia sesión con el enlace del correo para buscar palabras.");

  const cached = await supabase.from("word_lookups").select("entry").eq("word", word).maybeSingle();
  if (cached.error?.code === "42P01" || cached.error?.code === "PGRST205") {
    return fail(503, "No se pudo buscar la palabra: falta la migración 004 en Supabase. Córrela en el SQL Editor.");
  }
  const hit = wordEntrySchema.safeParse(cached.data?.entry);
  if (hit.success) return NextResponse.json({ ok: true, entry: hit.data, cached: true });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return fail(503, "No se pudo buscar la palabra: falta GROQ_API_KEY en .env.local. Agrégala y reinicia el servidor.");
  const admin = createAdminSupabase();
  if (!admin) {
    return fail(503, "No se pudo guardar la palabra: falta SUPABASE_SERVICE_ROLE_KEY en .env.local. Agrégala y reinicia el servidor.");
  }

  try {
    const { object } = await generateObject({
      model: createGroq({ apiKey })(MODEL),
      schema: wordEntrySchema,
      system: SYSTEM,
      prompt: `Word: ${word}`,
    });
    const entry = { ...object, word };
    await admin.from("word_lookups").upsert({ word, entry, model: MODEL }, { onConflict: "word", ignoreDuplicates: true });
    return NextResponse.json({ ok: true, entry, cached: false });
  } catch {
    return fail(502, "Groq no respondió con una tarjeta válida. Espera unos segundos y vuelve a intentar.");
  }
}
