import { expect, test } from "@playwright/test";
import { LessonPage } from "./lesson-page";

test("the lesson timer counts from Start and the wrap-up sends the minutes", async ({ page }) => {
  await page.clock.install();
  const lesson = new LessonPage(page);
  await lesson.start();
  await expect(page.getByTestId("timer")).toHaveText("0:00");

  await page.clock.fastForward("26:00");
  await expect(page.getByTestId("timer")).toHaveText("26:00");
  await expect(page.getByText("Goal reached")).toBeVisible();

  await lesson.reachPredict();
  await lesson.reachCheckFromPredict();
  await lesson.answerCheckRound(false);
  await lesson.next();
  await expect(page.getByRole("heading", { name: "Wrap-up" })).toBeVisible();

  await page.getByLabel("Your line").fill("Today I used the dummy subject it.");
  const saved = page.waitForRequest(
    (request) => request.method() === "POST" && (request.postData() ?? "").includes('"minutes":26'),
  );
  await page.getByRole("button", { name: "Save" }).click();
  expect((await saved).postData()).toContain('"lessonId":"01-verb-to-be"');
});
