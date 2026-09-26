import { createServerSupabase } from "@/lib/supabase/server";

export interface ProgressSnapshot {
  streak: number;
  weekMinutes: number;
  logros: string[];
  configured: boolean;
}

function bogotaDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date(iso));
}

export async function loadProgress(): Promise<ProgressSnapshot> {
  const supabase = await createServerSupabase();
  if (!supabase) {
    return { streak: 0, weekMinutes: 0, logros: [], configured: false };
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { streak: 0, weekMinutes: 0, logros: [], configured: true };
  }

  const { data: sessions } = await supabase
    .from("sessions")
    .select("ended_at, minutes, logro")
    .eq("user_id", userData.user.id)
    .order("ended_at", { ascending: false });

  const rows = sessions ?? [];
  const qualifying = new Set(rows.filter((row) => row.minutes >= 25).map((row) => bogotaDate(row.ended_at)));
  let streak = 0;
  const cursor = new Date();
  for (;;) {
    const key = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(cursor);
    if (!qualifying.has(key)) break;
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekMinutes = rows
    .filter((row) => new Date(row.ended_at).getTime() >= weekAgo)
    .reduce((sum, row) => sum + row.minutes, 0);

  return {
    streak,
    weekMinutes,
    logros: rows.map((row) => row.logro).filter(Boolean).slice(0, 12),
    configured: true,
  };
}
