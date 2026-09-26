import { HoySession } from "@/components/hoy-session";
import { LessonPlayer } from "@/components/lesson/lesson-player";
import { verbToBeLesson } from "@/lib/lesson";
import { isLessonPassed, nextLessonExists } from "@/lib/lesson-status";
import { weekPack } from "@/lib/pack";

export default async function HoyPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const params = await searchParams;
  const passed = await isLessonPassed(verbToBeLesson.id);
  const hasNext = nextLessonExists(verbToBeLesson.id);
  const openPack = params.session === "pack" || (passed && !hasNext);

  if (openPack) return <HoySession pack={weekPack} />;
  return <LessonPlayer lesson={verbToBeLesson} canSkip={passed} />;
}
