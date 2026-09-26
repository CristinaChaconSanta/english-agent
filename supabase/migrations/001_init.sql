-- Sesiones, minutos, tarjetas FSRS y logros.
-- La racha se calcula desde sessions (día en America/Bogota con 25 min o más).

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz not null default now(),
  minutes integer not null check (minutes >= 0),
  pack_semana text not null,
  logro text not null
);

create table if not exists public.fsrs_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  frente text not null,
  atras text not null,
  pronunciacion text not null,
  card jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid references public.sessions (id) on delete set null,
  line text not null,
  created_at timestamptz not null default now()
);

alter table public.sessions enable row level security;
alter table public.fsrs_cards enable row level security;
alter table public.achievements enable row level security;

create policy "own sessions" on public.sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own cards" on public.fsrs_cards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own achievements" on public.achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
