"use server";

import { reviewCard } from "@/lib/actions/session";
import { createServerSupabase } from "@/lib/supabase/server";

export async function saveLessonCheck(input: {
  lessonId: string;
  score: number;
  outOf: number;
  passed: boolean;
  missed: { frente: string; atras: string; pronunciacion: string }[];
}) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return { ok: false as const, message: "Falta la configuración de Supabase en el entorno." };
  }
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { ok: false as const, message: "Inicia sesión con el enlace del correo para guardar." };
  }

  const { data, error } = await supabase
    .from("lesson_results")
    .insert({
      user_id: userData.user.id,
      lesson_id: input.lessonId,
      score: input.score,
      out_of: input.outOf,
      passed: input.passed,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false as const, message: "No se pudo guardar la nota. Revisa la conexión y vuelve a intentar." };
  }

  for (const card of input.missed) {
    await reviewCard({ ...card, rating: "again" });
  }

  return { ok: true as const, id: data.id as string };
}

export async function saveWrapUp(input: { resultId: string; line: string }) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return { ok: false as const, message: "Falta la configuración de Supabase en el entorno." };
  }
  const { error } = await supabase.from("lesson_results").update({ wrap_up: input.line }).eq("id", input.resultId);
  if (error) {
    return { ok: false as const, message: "No se pudo guardar la línea. Revisa la conexión y vuelve a intentar." };
  }
  return { ok: true as const };
}
