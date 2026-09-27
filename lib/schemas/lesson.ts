import { z } from "zod";
import { temaColorSchema } from "@/lib/schemas/pack";

const textPairSchema = z.object({
  en: z.string().min(1),
  es: z.string(),
});

const contrastSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

const gradedSchema = z.object({
  promptEn: z.string().min(1),
  answer: z.string().min(1),
  acceptedAnswers: z.array(z.string().min(1)).min(1).optional(),
  why: z.string().min(1),
  whyEs: z.string().min(1),
  choices: z.array(z.string().min(1)).min(2).optional(),
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  unitNumber: z.number().int().positive(),
  level: z.string().min(1),
  ieltsCriteria: z.array(z.string().min(1)).min(1),
  temaColor: temaColorSchema,
  goal: z.object({
    what: textPairSchema,
    whyNow: textPairSchema,
    successMeasure: textPairSchema,
  }),
  glossary: z.array(
    z.object({
      term: textPairSchema,
      what: textPairSchema,
      why: textPairSchema,
    }),
  ).min(1),
  uses: z.object({
    intro: textPairSchema,
    items: z.array(textPairSchema).min(1),
    contrastPairs: z.array(contrastSchema).length(3),
  }),
  form: z.object({
    formula: textPairSchema,
    rows: z.array(
      z.object({
        who: z.string().min(1),
        affirmative: z.string().min(1),
        negative: z.string().min(1),
        question: z.string().min(1),
      }),
    ).min(1),
    contrastPairs: z.array(contrastSchema).length(3),
  }),
  whyChain: z.object({
    bigIdeaIds: z.array(z.string().min(1)).min(1),
    intro: textPairSchema,
    links: z.object({
      bigPicture: textPairSchema,
      whereItComesFrom: textPairSchema.extend({ skipped: z.boolean() }),
      problemItCreates: textPairSchema,
      englishsSolution: textPairSchema,
      howNativeSpeakersSeeIt: textPairSchema.extend({ isMentalModel: z.literal(true) }),
      spanishVsEnglish: contrastSchema,
    }),
    predict: z.array(gradedSchema).min(1),
    also: z.array(
      z.object({
        title: textPairSchema,
        body: textPairSchema,
        isMentalModel: z.boolean(),
      }),
    ),
    sources: z.array(z.object({ url: z.url(), fetchedOk: z.literal(true) })).min(1),
  }),
  traps: z.array(
    z.object({
      wrongEn: z.string().min(1),
      rightEn: z.string().min(1),
      why: textPairSchema,
    }),
  ).min(1),
  hack: textPairSchema,
  verbList: z.array(
    z.object({
      verb: z.string().min(1),
      base: z.string().min(1),
      past: z.string().min(1),
      pastParticiple: z.string().min(1),
      ing: z.string().min(1),
      thirdPerson: z.string().min(1),
      usesEn: z.string().min(1),
    }),
  ).min(1),
  read: z.object({
    themeEn: z.string().min(1),
    text: textPairSchema,
    wordCount: z.number().int().positive(),
    markedForms: z.array(z.string().min(1)).min(1),
  }),
  summary: z.object({
    lines: z.array(textPairSchema).length(3),
  }),
  practice: textPairSchema,
  check: z.object({
    items: z.array(gradedSchema).length(5),
    passThreshold: z.literal(4),
    outOf: z.literal(5),
  }),
  wrapUp: textPairSchema,
  pronunciationNotes: z.array(z.object({ wordEn: z.string().min(1), guideEs: z.string().min(1) })),
});

export type Lesson = z.infer<typeof lessonSchema>;
export type GradedItem = z.infer<typeof gradedSchema>;
