# Prompts para las lecciones 05 a 10 (Cursor)

Un chat nuevo por lección, en modo Agent, con búsqueda web activada. Pega el bloque completo.
Hazlas en orden: cada lección se apoya en las anteriores.

## Lección 05: Present perfect simple vs past simple

```
Write lesson 05 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Present perfect simple vs past simple (syllabus unit 2, B1).
File: docs/lecciones/05-present-perfect-vs-past-simple.md

WHY questions the lesson must answer:
1. Why English has a form that connects the past to now (have + past participle), and where it
   comes from: the "have" perfect grew out of a possession construction ("I have the letter
   written"). Verify this with a source; if you can't, label it as a mental model.
2. Why "yesterday", "in 2019" or "last week" can't go with the present perfect: finished time
   vs time still connected to now.
3. How Spanish "he comido" vs "comí" compares, and why a Colombian speaker may find the English
   use strange: in much of Latin America the pretérito perfecto is used less than in Spain.
   Verify this dialect point with a source before stating it.
4. Why for / since, ever / never, already / yet / just go with the present perfect.

Traps to include: "I have seen him yesterday", "I live here since 2020" (calque of "vivo aquí
desde"), "I am here for two years", mixing "for" and "since".

When the lesson passes the self-check: convert it to
content/lecciones/05-present-perfect-vs-past-simple.json, validated with the lesson schema in
lib/schemas/lesson.ts, without summarizing or rewriting. Run typecheck.
Commit with "feat(content): add lesson 05 present perfect vs past simple".
```

## Lección 06: Present perfect continuous

```
Write lesson 06 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Present perfect continuous (syllabus unit 3, B1).
File: docs/lecciones/06-present-perfect-continuous.md

WHY questions the lesson must answer:
1. Why English stacks two tool verbs (have + been + -ing): "have" connects to now and "be + -ing"
   shows the action in progress. Connect to Big Idea 4 and to lessons 04 and 05.
2. How Spanish says the same idea with "llevar" ("llevo tres años trabajando aquí") or with
   "hace... que", and why English needs a different structure.
3. Why "I've been painting the room" (the activity, maybe unfinished) and "I've painted the room"
   (the result, finished) mean different things.
4. Why state verbs still refuse -ing here ("I've known her for years", not "I've been knowing").

Traps to include: "I am working here since three years", "I've been knowing her",
"How long are you living here?", using the continuous for a counted result
("I've been writing three emails").

When the lesson passes the self-check: convert it to
content/lecciones/06-present-perfect-continuous.json, validated with the lesson schema in
lib/schemas/lesson.ts, without summarizing or rewriting. Run typecheck.
Commit with "feat(content): add lesson 06 present perfect continuous".
```

## Lección 07: Used to / would

```
Write lesson 07 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Used to / would for past habits (syllabus unit 4, B1).
File: docs/lecciones/07-used-to-would.md

WHY questions the lesson must answer:
1. Why English has special forms for past habits when Spanish just uses the imperfecto
   ("cuando era niña, jugaba en el parque"). Connect to lesson 04: the past continuous is NOT
   for habits.
2. Why "used to" works for states and actions, but "would" only for repeated actions
   ("I used to live in Cali", never "I would live in Cali" with that meaning).
3. Why "used to" exists only in the past: for present habits English says "I usually...",
   not "I use to..." (calque of "suelo").
4. Why "be used to + -ing" (estar acostumbrada a) is a different structure, and why it takes -ing.
Include pronunciation: `used to (IÚS-tu)`, with the "s" sounding like "s", not "z".

Traps to include: "I use to wake up early" (present), "I would live in Bogotá" (state),
"I'm used to wake up early", "I didn't used to" (spelling).

When the lesson passes the self-check: convert it to content/lecciones/07-used-to-would.json,
validated with the lesson schema in lib/schemas/lesson.ts, without summarizing or rewriting.
Run typecheck. Commit with "feat(content): add lesson 07 used to would".
```

## Lección 08: Past perfect

```
Write lesson 08 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Past perfect simple (syllabus unit 5, B1).
File: docs/lecciones/08-past-perfect.md

WHY questions the lesson must answer:
1. Why English needs "the past before the past" (had + past participle): it moves the camera
   back one step so the listener knows which event happened first. Connect to Big Idea 4.
2. How it matches Spanish "había hecho" (a close match) and why the real difficulty is WHEN
   English requires it and when it can be skipped (with "before" / "after" the order is already
   clear).
3. Why "by the time", "already" and "never... before" often call for the past perfect.
4. Preview only: why reported speech moves tenses back ("She said she had finished"),
   linking to a later lesson.

Traps to include: "I had gone to Paris in 2019" (single past event, no earlier reference point),
"When I arrived, the class started" vs "had started" (different meanings), overusing the past
perfect in a simple sequence of events.

When the lesson passes the self-check: convert it to content/lecciones/08-past-perfect.json,
validated with the lesson schema in lib/schemas/lesson.ts, without summarizing or rewriting.
Run typecheck. Commit with "feat(content): add lesson 08 past perfect".
```

## Lección 09: Zero and first conditional

```
Write lesson 09 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Zero and first conditional (syllabus unit 6, B1).
File: docs/lecciones/09-zero-first-conditional.md

WHY questions the lesson must answer:
1. Why the "if" part uses the present even when it talks about the future
   ("If it rains, I'll stay home"), and why Spanish does the same ("Si llueve, me quedo").
   This is a case where Spanish helps: show it.
2. Why "when", "as soon as", "before" and "until" also take the present for the future, while
   Spanish uses the subjunctive there ("cuando llegue" → "when I arrive"). This is the real trap.
3. The difference between zero (always true: "If you heat ice, it melts") and first (a real,
   possible future).
4. Why "unless" means "if not", and why it doesn't take a negative.

Traps to include: "If it will rain, I will stay", "When I will arrive, I call you",
"Unless you don't study...", "If I will have time".

When the lesson passes the self-check: convert it to
content/lecciones/09-zero-first-conditional.json, validated with the lesson schema in
lib/schemas/lesson.ts, without summarizing or rewriting. Run typecheck.
Commit with "feat(content): add lesson 09 zero and first conditional".
```

## Lección 10: Second and third conditional

```
Write lesson 10 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Second and third conditional (syllabus unit 7, B1).
File: docs/lecciones/10-second-third-conditional.md

WHY questions the lesson must answer:
1. Why English uses past forms to talk about an unreal present ("If I had more time, I would
   read more"): the past tense marks distance from reality, not only distance in time.
   Search for the linguistic account of this ("remoteness" or "modal past"); if you can't verify
   it, label it as a mental model.
2. How Spanish does it with the imperfect subjunctive ("si tuviera") and the conditional
   ("leería"), and why English has no separate subjunctive form except "were".
3. Why "If I were you" and not "If I was you" in formal English, and when "was" is accepted.
4. Why the third conditional stacks tool verbs (had + participle, would have + participle) to
   talk about an unreal past, compared with Spanish "si hubiera sabido, habría ido".

Traps to include: "If I would have known", "If I would have more money", "would of" instead of
"would have", mixing second and third ("If I had studied, I would pass").

When the lesson passes the self-check: convert it to
content/lecciones/10-second-third-conditional.json, validated with the lesson schema in
lib/schemas/lesson.ts, without summarizing or rewriting. Run typecheck.
Commit with "feat(content): add lesson 10 second and third conditional".
```
