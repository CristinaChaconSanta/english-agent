import { expect, test } from "@playwright/test";
import { LessonPage } from "./lesson-page";

test("double-clicking an English word opens its card", async ({ page }) => {
  let asked = "";
  await page.route("**/api/lookup", async (route) => {
    asked = (route.request().postDataJSON() as { word: string }).word;
    await route.fulfill({
      json: {
        ok: true,
        entry: {
          word: asked,
          partOfSpeech: "noun",
          meaningEn: "The person or thing a sentence is about.",
          meaningEs: "La persona o cosa de la que habla la oración.",
          examples: ["The subject of this sentence is she.", "Every English sentence needs a subject."],
          pronunciation: "SÓB-yekt",
          pronunciationNote: "",
        },
      },
    });
  });

  const lesson = new LessonPage(page);
  await lesson.start();
  await lesson.next();
  await page.getByText("Subject", { exact: true }).first().dblclick({ position: { x: 12, y: 10 } });

  const card = page.getByRole("dialog", { name: "Word card" });
  await expect(card).toContainText("SÓB-yekt");
  await expect(card).toContainText("noun");
  await expect(card).toContainText("Every English sentence needs a subject.");
  await expect(card.getByText("La persona o cosa")).toHaveCount(0);
  await card.getByRole("button", { name: "Ver en español" }).click();
  await expect(card.getByText("La persona o cosa")).toBeVisible();
  expect(asked).toBe("subject");
  await card.getByRole("button", { name: "Close" }).click();
  await expect(card).toHaveCount(0);
});

test("a failed lookup explains the cause and the fix", async ({ page }) => {
  const lesson = new LessonPage(page);
  await lesson.start();
  await lesson.next();
  await page.getByText("Subject", { exact: true }).first().dblclick({ position: { x: 12, y: 10 } });
  await expect(page.getByRole("dialog", { name: "Word card" })).toContainText("Falta la configuración de Supabase");
});
