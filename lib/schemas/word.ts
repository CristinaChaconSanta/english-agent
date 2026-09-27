import { z } from "zod";

const PHONETIC_SYMBOLS = /[ɐ-ʯθðəæŋʃʒʊɪɔɛˈˌː/[\]]/;

export const wordSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z]+(?:['-][a-z]+)*$/, "Solo una palabra en inglés, sin espacios.")
  .max(40);

export const wordEntrySchema = z.object({
  word: z.string().min(1),
  partOfSpeech: z.string().min(1).describe("verb, noun, adjective, adverb, preposition, pronoun, conjunction, determiner"),
  meaningEn: z.string().min(1).describe("One short sentence in plain English."),
  meaningEs: z.string().min(1).describe("The same meaning in Spanish (Colombia)."),
  examples: z.array(z.string().min(1)).length(2).describe("Two short everyday English sentences."),
  pronunciation: z
    .string()
    .min(1)
    .refine((value) => !PHONETIC_SYMBOLS.test(value), "Pronunciation must use Spanish letters only.")
    .describe("Spanish letters only, stressed syllable in capitals with an accent mark, e.g. PÁIP-lain."),
  pronunciationNote: z
    .string()
    .describe("Empty string, or a short note in Spanish for a sound Spanish does not have, e.g. lengua entre los dientes."),
});

export type WordEntry = z.infer<typeof wordEntrySchema>;
