"use server";

import { createEmptyCard, fsrs, Rating, type Card, type CardInput } from "ts-fsrs";
import { createServerSupabase } from "@/lib/supabase/server";

const MINUTES_FOR_STREAK = 25;
const scheduler = fsrs();

const RATING = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
} as const;

export type ReviewRating = keyof typeof RATING;

export async function saveSession(input: { minutes: number; logro: string; semana: string }) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return { ok: false as const, message: "Falta la configuración de Supabase en el entorno." };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false as const, message: "Inicia sesión con el enlace del correo para guardar." };
  }

  const userId = userData.user.id;
  const { data: session, error } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      minutes: input.minutes,
      pack_semana: input.semana,
      logro: input.logro,
    })
    .select("id")
    .single();

  if (error || !session) {
    return { ok: false as const, message: "No se pudo guardar la sesión. Revisa la conexión y vuelve a intentar." };
  }

  await supabase.from("achievements").insert({
    user_id: userId,
    session_id: session.id,
    line: input.logro,
  });

  return { ok: true as const, streakCounted: input.minutes >= MINUTES_FOR_STREAK };
}

export async function saveLessonSession(input: { minutes: number; lessonId: string; logro: string }) {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return { ok: false as const, message: "Falta la configuración de Supabase en el entorno." };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false as const, message: "Inicia sesión con el enlace del correo para guardar." };
  }

  const userId = userData.user.id;
  const { data: session, error } = await supabase
    .from("sessions")
    .insert({ user_id: userId, minutes: input.minutes, lesson_id: input.lessonId, logro: input.logro })
    .select("id")
    .single();

  if (error?.code === "PGRST204" || error?.code === "42703" || error?.code === "23502") {
    return {
      ok: false as const,
      message: "No se pudo guardar el tiempo: falta la migración 003 en Supabase. Córrela en el SQL Editor y vuelve a guardar.",
    };
  }
  if (error || !session) {
    return { ok: false as const, message: "No se pudo guardar el tiempo. Revisa la conexión y vuelve a intentar." };
  }

  await supabase.from("achievements").insert({ user_id: userId, session_id: session.id, line: input.logro });

  return { ok: true as const, streakCounted: input.minutes >= MINUTES_FOR_STREAK };
}

export async function reviewCard(input: {
  frente: string;
  atras: string;
  pronunciacion: string;
  rating: ReviewRating;
}) {
  const supabase = await createServerSupabase();
  if (!supabase) return { ok: false as const };

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { ok: false as const };

  const existing = await supabase
    .from("fsrs_cards")
    .select("id, card")
    .eq("user_id", userData.user.id)
    .eq("frente", input.frente)
    .maybeSingle();

  const stored = existing.data?.card as CardInput | undefined;
  const current: Card | CardInput = stored ?? createEmptyCard();
  const next = scheduler.next(current, new Date(), RATING[input.rating]).card;

  if (existing.data?.id) {
    await supabase.from("fsrs_cards").update({ card: next, updated_at: new Date().toISOString() }).eq("id", existing.data.id);
  } else {
    await supabase.from("fsrs_cards").insert({
      user_id: userData.user.id,
      frente: input.frente,
      atras: input.atras,
      pronunciacion: input.pronunciacion,
      card: next,
    });
  }

  return { ok: true as const };
}
