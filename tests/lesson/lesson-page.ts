import { expect } from "@playwright/test";
import { BasePage } from "../base-page";

const CORRECT = [
  "I am 30 years old and I am cold in this room.",
  "It is not easy to redesign a checkout flow.",
  "I agree that the onboarding is too long.",
];

export class LessonPage extends BasePage {
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

  async reachCheck() {
    for (let step = 0; step < 4; step += 1) {
      await this.page.getByRole("button", { name: "Next", exact: true }).click();
    }
    await this.answerPredict("It is raining outside.");
    await this.answerPredict("It was a mistake to launch on a Friday.");
    await this.page.getByRole("button", { name: "Next", exact: true }).click();
    for (let step = 0; step < 6; step += 1) {
      await this.page.getByRole("button", { name: "Next", exact: true }).click();
    }
    await expect(this.page.getByRole("heading", { name: "Check" })).toBeVisible();
  }

  async answerPredict(answer: string) {
    await this.page.getByLabel("Your answer").fill(answer);
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.getByRole("button", { name: "Next", exact: true }).click();
  }

  async assertAnswerHidden() {
    await expect(this.page.getByText("I am 30 years old and I am cold in this room.")).toHaveCount(0);
  }

  async passWithFourOfFive() {
    for (const answer of CORRECT) {
      await this.page.getByLabel("Your answer").fill(answer);
      await this.page.getByRole("button", { name: "Submit" }).click();
      await this.page.getByRole("button", { name: "Next", exact: true }).click();
    }
    await this.page.getByRole("button", { name: "bored" }).click();
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.getByRole("button", { name: "Next", exact: true }).click();
    await this.page.getByLabel("Your answer").fill("Two versions happened.");
    await this.page.getByRole("button", { name: "Submit" }).click();
    await expect(this.page.getByText("4 of 5. Passed.")).toBeVisible();
  }
}
