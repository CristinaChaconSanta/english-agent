import { expect } from "@playwright/test";
import { BasePage } from "../base-page";

const CORRECT = [
  "I am 30 years old and I am cold in this room.",
  "It is not easy to redesign a checkout flow.",
  "I agree that the onboarding is too long.",
];

export class LessonPage extends BasePage {
  next() {
    return this.page.getByRole("button", { name: "Next", exact: true }).click();
  }

  async start() {
    await this.open("/hoy");
    await this.page.getByRole("button", { name: "Start" }).click();
  }

  async assertBothModes() {
    const toggle = this.page.getByRole("button", { name: /Noche|Día/ });
    const read = () =>
      this.page.locator("article").evaluate((el) => {
        const style = getComputedStyle(el);
        return { bg: style.backgroundColor, color: style.color };
      });
    if ((await toggle.innerText()) === "Noche") await toggle.click();
    await expect.poll(read).toEqual({ bg: "rgb(43, 39, 51)", color: "rgb(243, 234, 217)" });
    await this.page.getByRole("button", { name: "Día" }).click();
    await expect.poll(read).toMatchObject({ color: "rgb(17, 17, 17)" });
  }

  async assertSpanishStartsClosed() {
    await expect(this.page.getByRole("button", { name: "Ver en español" }).first()).toBeVisible();
    await expect(this.page.getByText("Ya usas be todos los días")).toHaveCount(0);
  }

  async reachPredict() {
    for (let step = 0; step < 4; step += 1) await this.next();
  }

  async answer(text: string) {
    await this.page.getByLabel("Your answer").fill(text);
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  verdict() {
    return this.page.getByRole("status");
  }

  async reachCheckFromPredict() {
    await this.answer("it");
    await expect(this.verdict()).toHaveText("Correct");
    await this.next();
    await this.answer("It was a mistake to launch on Friday.");
    await expect(this.verdict()).toHaveText("Correct");
    await this.next();
    await this.next();
    for (let step = 0; step < 6; step += 1) await this.next();
    await expect(this.page.getByRole("heading", { name: "Check" })).toBeVisible();
  }

  async assertAnswerHidden() {
    await expect(this.page.getByText("I am 30 years old and I am cold in this room.")).toHaveCount(0);
  }

  async answerCheckRound(wrongOnFirst: boolean) {
    if (wrongOnFirst) {
      await this.answer("I have 30 years and I am cold in this room.");
      await expect(this.verdict()).toHaveText("Not quite");
      await expect(this.page.getByText("Expected", { exact: true })).toBeVisible();
      await expect(this.page.locator("mark").first()).toBeVisible();
    } else {
      await this.answer(CORRECT[0]!);
      await expect(this.verdict()).toHaveText("Correct");
    }
    await expect(this.page.getByText(/^Score: \d of 5\.$/)).toBeVisible();
    await this.next();
    for (const text of CORRECT.slice(1)) {
      await this.answer(text);
      await this.next();
    }
    await this.page.getByRole("button", { name: "bored", exact: true }).click();
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.next();
    await this.answer("Two versions happened.");
    await expect(this.verdict()).toHaveText("Not quite");
    await this.next();
  }

  async assertScore(text: string) {
    await expect(this.page.getByText(text, { exact: true })).toBeVisible();
  }
}
