import { expect, test, type Page, type Route } from "@playwright/test";
import { LessonPage } from "./lesson-page";

type Reply = { status: number; json: Record<string, unknown> };

async function mockGrader(page: Page, reply: Reply) {
  const calls: Record<string, unknown>[] = [];
  await page.route("**/api/grade", async (route: Route) => {
    calls.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill(reply);
  });
  return calls;
}

async function openPredict(page: Page, which: 1 | 2) {
  const lesson = new LessonPage(page);
  await lesson.start();
  await lesson.reachPredict();
  if (which === 2) {
    await lesson.answer("it");
    await lesson.next();
  }
  return lesson;
}

test("a key match is Correct without calling the grader", async ({ page }) => {
  const calls = await mockGrader(page, { status: 500, json: { ok: false } });
  const lesson = await openPredict(page, 1);
  await lesson.answer("It is raining outside");
  await expect(lesson.verdict()).toHaveText("Correct");
  expect(calls).toHaveLength(0);
});

test("the grader can mark a new wording as correct", async ({ page }) => {
  const calls = await mockGrader(page, {
    status: 200,
    json: {
      ok: true,
      verdict: "correct",
      explanationEn: "It's is the contraction of it is, so the dummy subject is there.",
      explanationEs: "It's es la contracción de it is, así que el sujeto vacío está.",
    },
  });
  const lesson = await openPredict(page, 1);
  await lesson.answer("It's raining outside.");
  await expect(lesson.verdict()).toHaveText("Correct");
  await expect(page.getByText("It's is the contraction of it is")).toBeVisible();
  expect(calls[0]).toMatchObject({ lessonId: "01-verb-to-be", kind: "predict", index: 0, answer: "It's raining outside." });
});

test("the grader shows Correct, but different with a Spanish explanation", async ({ page }) => {
  await mockGrader(page, {
    status: 200,
    json: {
      ok: true,
      verdict: "correct_different",
      explanationEn: "Right structure. On Friday means one specific Friday; on a Friday means any Friday.",
      explanationEs: "Estructura correcta. On Friday es un viernes concreto; on a Friday es cualquier viernes.",
    },
  });
  const lesson = await openPredict(page, 2);
  await lesson.answer("It was a mistake to launch the app on Friday.");
  await expect(lesson.verdict()).toHaveText("Correct, but different");
  await expect(page.getByText("On Friday means one specific Friday")).toBeVisible();
  await expect(page.getByText("Estructura correcta.")).toHaveCount(0);
  await page.getByTestId("verdict").getByRole("button", { name: "Ver en español" }).first().click();
  await expect(page.getByText("Estructura correcta.")).toBeVisible();
});

test("the grader marks an answer without the lesson point as Not quite", async ({ page }) => {
  await mockGrader(page, {
    status: 200,
    json: {
      ok: true,
      verdict: "incorrect",
      explanationEn: "The sentence still has no subject: English needs it before was.",
      explanationEs: "La oración sigue sin sujeto: el inglés necesita it antes de was.",
    },
  });
  const lesson = await openPredict(page, 2);
  await lesson.answer("Was a mistake to launch on a Friday.");
  await expect(lesson.verdict()).toHaveText("Not quite");
  await expect(page.getByText("English needs it before was")).toBeVisible();
});

test("when both models fail, the answer is compared with the key", async ({ page }) => {
  await mockGrader(page, {
    status: 502,
    json: { ok: false, message: "No se pudo evaluar con IA; se comparó con la respuesta esperada." },
  });
  const lesson = await openPredict(page, 1);
  await lesson.answer("It's raining outside.");
  await expect(lesson.verdict()).toHaveText("Not quite");
  await expect(page.getByText("No se pudo evaluar con IA; se comparó con la respuesta esperada.")).toBeVisible();
});
