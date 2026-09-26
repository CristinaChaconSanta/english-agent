import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { createServerSupabase } from "@/lib/supabase/server";

export async function isLessonPassed(lessonId: string) {
  const supabase = await createServerSupabase();
  if (!supabase) return false;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;
  const { data } = await supabase
    .from("lesson_results")
    .select("id")
    .eq("user_id", userData.user.id)
    .eq("lesson_id", lessonId)
    .eq("passed", true)
    .limit(1);
  return Boolean(data && data.length > 0);
}

export function nextLessonExists(currentId: string) {
  const match = currentId.match(/^(\d+)/);
  const current = match?.[1];
  if (!current) return false;
  const prefix = String(Number(current) + 1).padStart(2, "0");
  const dir = path.join(process.cwd(), "content/lecciones");
  if (!existsSync(dir)) return false;
  return readdirSync(dir).some((name) => name.startsWith(`${prefix}-`) && name.endsWith(".json"));
}
