# English Agent

A personal IELTS coach that runs as an installable web app. One primary action per screen. Lessons explain the grammar, then grade the answer.

## Problem

A Spanish speaker at B1 needs a daily path to IELTS 6.5–7.0 without a tutor on call. Generic apps drill rules. They do not grade the structure the lesson just taught, and they do not keep progress off the device.

## What it does

1. Magic-link login through Supabase.
2. **Today**: a guided lesson (minimum 25 minutes; a full session is 45 minutes, three blocks of 15).
3. Each lesson follows a fixed shape: why it works, a check, and a written answer.
4. Multiple-choice is graded on device. Free text is graded by the answer key first, then by an LLM if the key does not match.
5. Progress (streak, minutes, lesson result) is stored in Supabase, not only in the browser.
6. Word lookup, a visible timer, and a Spanish toggle sit on the lesson. Pronunciation is written with Spanish letters (`pipeline` → `PÁIP-lain`), not phonetic symbols.

The syllabus in `docs/syllabus.md` maps 31 units from B1 toward C1. Lesson 01 (verb to be) is the one wired into Today: 13 steps. Later modules in `AGENTS.md` (spaced review, full IELTS mock, motivation letter, library) are specified and not all built.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind 4
- Zod 4 for lesson packs and API payloads
- Zustand 5 for session state
- Supabase Auth and Postgres (`supabase/migrations`)
- Vercel AI SDK 5: Groq first, Gemini Flash-Lite as fallback
- Playwright for the lesson flow
- `ts-fsrs` is installed for spaced review

## Architecture

1. `middleware.ts` refreshes the Supabase session.
2. `app/hoy/page.tsx` loads the lesson and renders `components/lesson/lesson-player.tsx`.
3. Choice items call `lib/grading.ts` locally.
4. Written items `POST /api/grade`. The route checks the body with Zod, loads the lesson item, and returns `source: "key"` when the answer already matches.
5. If the key fails, the route requires a signed-in user, then calls Groq (`openai/gpt-oss-20b`). On failure it tries Gemini. The model must return `correct`, `correct_different`, or `incorrect` plus a short explanation in English and Spanish.
6. `lib/actions/session.ts` writes the lesson result. Migrations `001`–`004` create users, results, sessions, and word lookups.

## Error handling

- Invalid grade payload: **400**, "the answer did not arrive complete."
- Unknown lesson item: **404**.
- Multiple-choice sent to the AI route: **400** (those items never call the model).
- Supabase env missing: **503**.
- No session: **401**.
- Both models fail: **502**. The UI still has the expected answer from the key comparison.
- Voice, when used, is transcribed and not kept. The Gemini free tier is specified to receive practice text only, never audio.

## Results

No IELTS score is stored in this repo. What is specified and built:

- Session floor **25 minutes**. Full session **45 minutes**.
- **15 sentences** per phrase topic. **7 examples** per word or verb.
- **31** syllabus units. Lesson 01 ships with **13** steps.
- **6** color themes and **5** characters.
- Runtime budget written for this stack: **USD 0–5 per month** (Groq and Gemini free tiers, browser speech synthesis).

## Run it

```bash
cd "English Agent"
npm install
cp .env.example .env.local
```

Fill `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`, and `GOOGLE_GENERATIVE_AI_API_KEY`. Apply `supabase/migrations` in order on the Supabase project.

```bash
npm run dev
npm run test:e2e
```

Open `http://localhost:3000`. This folder is not on GitHub yet.
