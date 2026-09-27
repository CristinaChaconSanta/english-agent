Cristina did lesson 01 end to end. These are the problems she found. Fix them in this order and show me
the plan before changing code. Read AGENTS.md and docs/estructura-leccion.md first.

## A. Grading (the most important)
1. Answers are compared too strictly. "it" was marked wrong for "___ is raining outside", and
   "It was a mistake to launch on Friday" was marked wrong because the key says "on a Friday".
   Grading must ignore capital letters, extra spaces and final punctuation. For fill-in-the-gap items,
   accept just the missing word ("it") or the full sentence. Add an optional `acceptedAnswers` array to
   Check and Predict it items in lib/schemas/lesson.ts, and add "It was a mistake to launch on Friday."
   to that item in lessons 01 (json and md).
2. After she submits, show a clear verdict first: "Correct" (green) or "Not quite" (red), then her
   answer next to the expected one with the difference highlighted, then the why. Right now she can't
   tell whether she was corrected or just shown the explanation again.
3. The score line must say "Score: 3 of 5" (and "Passed" or "Not passed: you need 4"), not "3 of 5".
4. Every "why" in Check and Predict it needs a Spanish version behind "Ver en español". Add `whyEs`
   to the schema and fill it for lessons 01 to 07.
5. When the Check is not passed, show which items failed with their why, and a button "Try the Check
   again" with the failed items. Failed items still go to FSRS.

## B. Timer and progress
6. The session timer shows 0:00 during the whole lesson and Progreso shows 0 minutes and 0 days after
   finishing. The lesson must start the session timer on "Start", keep counting, and save the minutes
   to Supabase so Progreso and the streak update. Add a Playwright test for this.

## C. Layout
7. Step 5 (Why it works this way) is one long wall of text. Split it into sub-steps: one screen per
   link of the Why chain, one per "Also" note, and each "Predict it" on its own screen labeled
   "Predict it 1 of 2". She thought the same question was repeating.
8. Verb list: show a real table, not lines of text. Columns: Verb | Base | Past | Past participle |
   -ing | 3rd person | Tenses it appears in (named: present simple, past simple...) | Example. When a
   verb has several meanings, one row per meaning. Horizontal scroll on mobile is fine for this table
   only. Update the template in docs/estructura-leccion.md so every lesson lists all verbs from the
   explanation, not only 3 or 4.

## D. Word lookup
9. Double-click (or long press on iPhone) on any English word opens a small card: meaning in plain
   English, part of speech (verb, adjective...), 2 short examples, and pronunciation in Spanish letters
   (AGENTS.md rule 2), with "Ver en español". Use Groq through the AI SDK with a short prompt, and
   cache each word in Supabase so the same word never calls the API twice. If Groq fails, show the
   error in neutral tone (cause + fix).

## E. Content fix in lesson 01 (json and md)
10. Add this term to "Words you need", with its Spanish version behind the toggle:
    "Adjective: a word that describes a person or thing (sure, tired, easy, tall). An adjective
    never changes with time: sure stays sure, and the time goes in be (I am sure, I was sure). A verb
    does change with time: agree, agreed, agrees. Quick test: if you can put 'very' before it, it's an
    adjective (very sure, never very agree). This is why 'I am agree' is wrong: agree is a verb that
    already carries the time by itself, so it doesn't need be. Sure can't carry time, so it needs be."
11. In the "Also: why I agree is a full verb" note, add a pointer to that term.
12. In the Predict it item "Was a mistake to launch on a Friday", add to the why: "Both 'on Friday'
    (one specific Friday) and 'on a Friday' (any Friday, a Friday in general) are correct; they mean
    slightly different things."

## F. Coach chat (plan only, do not build yet)
13. She wants the Coach chat (AGENTS.md module 6) available next to the lesson to ask questions.
    Include in your plan how it would open from any lesson step with the current step as context, and
    estimate the work. Don't build it in this round.

## Checks
Typecheck, lint, build, Playwright (add tests for points 1, 2, 3 and 6). One commit per block (A to E)
with conventional messages.
