# Prompts para las lecciones 02 a 04 (Cursor)

Un chat nuevo por lección, en modo Agent, con búsqueda web activada. Pega el bloque completo.

## Lección 02: Present simple

```
Write lesson 02 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Present simple (syllabus unit 0.2: habits, routines, facts, 3rd person -s).
File: docs/lecciones/02-present-simple.md

WHY questions the lesson must answer:
1. Why the 3rd person -s survived when the other person endings of English verbs disappeared.
2. Why questions and negatives need do/does, while "be" doesn't (connect to lesson 01).
3. Why English uses present simple for habits and facts but not for things happening right now,
   while Spanish uses the same present for both ("¿Qué haces?" can mean both).
4. Why the -s moves to "does" in questions ("Does she work?", never "Does she works?").

Traps to include: "She work", "Does she works?", "I am work here" (calque of "estoy trabajando"
used for habits), "What do you do?" vs "What are you doing?".

When the lesson passes the self-check: convert it to content/lecciones/02-present-simple.json,
validated with the lesson schema in lib/schemas/lesson.ts, without summarizing or rewriting.
Run typecheck. Commit with "feat(content): add lesson 02 present simple".
```

## Lección 03: In / on / at

```
Write lesson 03 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Basic prepositions of place and time: in / on / at (syllabus unit 0.3).
File: docs/lecciones/03-in-on-at.md

WHY questions the lesson must answer:
1. Why English splits into three words (in, on, at) what Spanish covers with one ("en").
   Use the scene method: at = a point, on = a surface or line, in = a container or area.
2. Why the same three images move from place to time: at 5 pm (a point), on Monday (a day as a
   surface), in July / in 2027 (a container of time). Label as "a useful mental model" unless a
   source backs it (cognitive linguistics, trajector and landmark).
3. Why some expressions break the pattern ("at night" but "in the morning", "on the bus" but
   "in the car"). Explain what is known and say honestly where it is convention.

Traps to include: "in Monday", "on the morning", "in the weekend" (and British "at the weekend"
vs American "on the weekend"), "arrive to" instead of "arrive in / arrive at".

When the lesson passes the self-check: convert it to content/lecciones/03-in-on-at.json,
validated with the lesson schema in lib/schemas/lesson.ts, without summarizing or rewriting.
Run typecheck. Commit with "feat(content): add lesson 03 in on at".
```

## Lección 04: Past simple vs past continuous

```
Write lesson 04 following docs/prompt-leccion.md (read it first and follow every rule).

Topic: Past simple vs past continuous for storytelling (syllabus unit 1, B1).
File: docs/lecciones/04-past-simple-vs-continuous.md

WHY questions the lesson must answer:
1. Why English needs two past forms: the past simple is a finished event (a photo) and the past
   continuous is an action in progress around it (the film running in the background).
   Connect to Big Idea 4 (tool verbs: was/were + -ing).
2. How this maps to Spanish pretérito vs imperfecto ("llegué" vs "estaba llegando / llegaba"),
   and where the match fails: the Spanish imperfecto also covers past habits, and English does
   NOT use past continuous for habits (it uses past simple or "used to").
3. Why some verbs almost never take -ing (know, want, like, believe): they describe states, not
   actions in progress. Define "state verb" in plain words.
4. Why "when" and "while" usually go with different forms ("I was cooking when she called";
   "While I was cooking, she called").

Traps to include: "I was knowing the answer", "When I was a child I was going to school by bus"
(habit), "While she called, I cooked" (no background), using past continuous for a finished,
short event.

When the lesson passes the self-check: convert it to
content/lecciones/04-past-simple-vs-continuous.json, validated with the lesson schema in
lib/schemas/lesson.ts, without summarizing or rewriting. Run typecheck.
Commit with "feat(content): add lesson 04 past simple vs continuous".
```
