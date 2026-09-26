-- Nota del Check, wrap-up y vínculo con las tarjetas FSRS de lo fallado.

create table if not exists public.lesson_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  score integer not null check (score >= 0),
  out_of integer not null check (out_of > 0),
  passed boolean not null,
  wrap_up text,
  created_at timestamptz not null default now()
);

alter table public.lesson_results enable row level security;

create policy "own lesson results" on public.lesson_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
