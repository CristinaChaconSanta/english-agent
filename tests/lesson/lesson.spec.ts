import { expect, test } from "@playwright/test";
import { LessonPage } from "./lesson-page";

test("lesson 01 hides Spanish and Check answers, and 4 of 5 passes", async ({ page }) => {
  const lesson = new LessonPage(page);
  await lesson.start();
  await lesson.assertBothModes();
  await lesson.assertSpanishStartsClosed();
  await lesson.reachPredict();
  await lesson.reachCheckFromPredict();
  await lesson.assertAnswerHidden();
  await lesson.answerCheckRound(false);
  await lesson.assertScore("Score: 4 of 5. Passed.");
});

test("a failed Check shows the misses and retries only those items", async ({ page }) => {
  const lesson = new LessonPage(page);
  await lesson.start();
  await lesson.reachPredict();
  await lesson.reachCheckFromPredict();
  await lesson.answerCheckRound(true);
  await lesson.assertScore("Score: 3 of 5. Not passed: you need 4.");
  await page.getByRole("button", { name: "Try the Check again" }).click();
  await expect(page.getByText("Item 1 of 2.", { exact: false })).toBeVisible();
  await lesson.answer("I am 30 years old and I am cold in this room.");
  await expect(lesson.verdict()).toHaveText("Correct");
  await lesson.next();
  await lesson.answer("There were two versions of the prototype before this one.");
  await lesson.next();
  await lesson.assertScore("Score: 5 of 5. Passed.");
});
