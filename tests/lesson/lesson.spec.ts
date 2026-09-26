import { test } from "@playwright/test";
import { LessonPage } from "./lesson-page";

test("lesson 01 hides Spanish and Check answers, and 4 of 5 passes", async ({ page }) => {
  const lesson = new LessonPage(page);
  await lesson.start();
  await lesson.assertBothModes();
  await lesson.assertSpanishStartsClosed();
  await lesson.reachCheck();
  await lesson.assertAnswerHidden();
  await lesson.passWithFourOfFive();
});
