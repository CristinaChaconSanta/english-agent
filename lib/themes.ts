import { TEMA_COLOR, type TemaColor } from "@/lib/schemas/pack";

export interface LessonPalette {
  day: string;
  accent: string;
  night: string;
}

export const LESSON_THEMES: Record<TemaColor, LessonPalette> = {
  [TEMA_COLOR.LIMONADA]: { day: "#FFD23F", accent: "#FF8FC8", night: "#2A2208" },
  [TEMA_COLOR.CHICLE]: { day: "#FF8FC8", accent: "#2F6BFF", night: "#2B1224" },
  [TEMA_COLOR.PISCINA]: { day: "#8FD8FF", accent: "#FF7A2F", night: "#0E2230" },
  [TEMA_COLOR.SELVA]: { day: "#4CCB8E", accent: "#FFD23F", night: "#0C2419" },
  [TEMA_COLOR.UVA]: { day: "#B98CF0", accent: "#FFD23F", night: "#1B1230" },
  [TEMA_COLOR.TOMATE]: { day: "#FF7A5C", accent: "#FFF8EC", night: "#2A0F0C" },
};

export const NIGHT_CARD = "#2B2733";
export const NIGHT_LINE = "#F3EAD9";
export const NIGHT_MUTED = "#B8AFC6";
export const DAY_CARD = "#FFF8EC";
export const DAY_LINE = "#111111";
export const DAY_MUTED = "#5A5448";

export interface LessonVars {
  "--lesson-bg": string;
  "--lesson-accent": string;
  "--lesson-card": string;
  "--lesson-line": string;
  "--lesson-shadow": string;
  "--lesson-muted": string;
}

export function lessonVars(tema: TemaColor, night: boolean): LessonVars {
  const palette = LESSON_THEMES[tema];
  if (night) {
    return {
      "--lesson-bg": palette.night,
      "--lesson-accent": palette.accent,
      "--lesson-card": NIGHT_CARD,
      "--lesson-line": NIGHT_LINE,
      "--lesson-shadow": palette.day,
      "--lesson-muted": NIGHT_MUTED,
    };
  }
  return {
    "--lesson-bg": palette.day,
    "--lesson-accent": palette.accent,
    "--lesson-card": DAY_CARD,
    "--lesson-line": DAY_LINE,
    "--lesson-shadow": DAY_LINE,
    "--lesson-muted": DAY_MUTED,
  };
}
