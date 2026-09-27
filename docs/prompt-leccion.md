# Base rules for writing a lesson

Any agent (Cursor, Grok) that writes a lesson follows this file. The per-lesson prompt only adds
the topic, the file name and the WHY questions to answer.

Learner: Cristina, a Colombian Spanish speaker (also speaks Portuguese), B1 level, with ADHD,
aiming for IELTS 6.5–7.0.

## Read first, in this order
1. AGENTS.md (content rules, non-negotiable)
2. docs/estructura-leccion.md (the fixed lesson template: follow every section and rule)
3. docs/ideas-clave.md (the 6 Big Ideas; link the lesson to the ones that apply)
4. docs/lecciones/01-verb-to-be.md (the model lesson: match its depth, format and tone)
5. docs/syllabus.md (the unit for this lesson)

Do not use numbers, percentages, tools or score claims from docs/fuentes/: they are invented.
Use their method only (grammar as a scene, trajector/landmark, Spanish vs English contrast).

## What matters most
1. **The WHY.** She does not accept "that's the rule". "Why it works this way" follows the 7-link
   Why chain from the template: big picture (Big Idea) → where it comes from → the problem it
   creates → English's solution → how native speakers see it → predict new cases → Spanish vs
   English in one line. Answer every WHY question listed in the per-lesson prompt.
2. **Never assume she knows a term.** Every grammar word goes in "Words you need", explained in
   plain English.
3. **English first, Spanish only on demand.** Every section in English, with its Spanish version
   inside `<details><summary>Ver en español</summary>...</details>`. The only Spanish visible without
   a toggle: the Spanish side of ES → EN contrast pairs and pronunciation guides.
4. **Check and "Predict it" answers are hidden** inside `<details><summary>Ver respuesta</summary>`.
5. **Verb list**: every verb used in the explanation, with base, past, past participle, -ing and
   3rd person forms, plus examples when a verb has several meanings.
6. Varied themes (art, philosophy, HCI, startups, psychology, literature), not only work.

## Hard rules
- No invented facts, numbers or studies. Every historical or linguistic claim needs a source you
  actually opened in this session, listed with its URL at the end of the lesson. If you can't find
  a source, drop the claim or label it clearly as "a useful mental model", not a fact.
- No URLs from memory.
- Pronunciation only with Spanish letters, stressed syllable in capitals with an accent mark:
  `works (UÉRKS)`. No phonetic symbols (θ, ə, ð). If a sound doesn't exist in Spanish, add a note in
  words after a colon: `three (ZRÍ: lengua entre los dientes)`.
- No em dashes (—) anywhere in the lesson.
- Do not change the template, other lessons or app code unless the per-lesson prompt says so.

## Self-check before finishing (fix anything that fails)
- [ ] All template sections present, in order
- [ ] 3 ES → EN contrast pairs for use and 3 for form
- [ ] Full 7-link Why chain, with 1–2 "Predict it" items using new sentences
- [ ] Every WHY question from the per-lesson prompt answered
- [ ] No Spanish paragraph outside a toggle (except contrast pairs and pronunciation)
- [ ] No visible answers in Check or Predict it
- [ ] No em dashes, no phonetic symbols
- [ ] Every URL opened in this session

## Report at the end (outside the lesson)
1. Each URL cited and whether it opened.
2. Any claim labeled as a mental model or dropped for lack of a source.
