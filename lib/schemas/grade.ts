import { z } from "zod";

export const verdictSchema = z.enum(["correct", "correct_different", "incorrect"]);

export const aiGradeSchema = z.object({
  verdict: verdictSchema,
  explanationEn: z.string().min(1).describe("One or two short sentences in plain English."),
  explanationEs: z.string().min(1).describe("The same explanation in Spanish (Colombia)."),
});

export const gradeRequestSchema = z.object({
  lessonId: z.string().min(1).max(80),
  kind: z.enum(["check", "predict"]),
  index: z.number().int().min(0).max(20),
  answer: z.string().trim().min(1).max(500),
});

export type Verdict = z.infer<typeof verdictSchema>;
export type AiGrade = z.infer<typeof aiGradeSchema>;
export type GradeRequest = z.infer<typeof gradeRequestSchema>;
