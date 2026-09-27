-- Caché de palabras buscadas en la lección: cada palabra llama a Groq una sola vez.
-- Cualquier cuenta con sesión lee. Solo el servidor escribe (service role, que salta RLS).

create table if not exists public.word_lookups (
  word text primary key check (word = lower(word) and char_length(word) between 1 and 40),
  entry jsonb not null,
  model text not null,
  created_at timestamptz not null default now()
);

alter table public.word_lookups enable row level security;

create policy "read word lookups" on public.word_lookups
  for select to authenticated using (true);

revoke insert, update, delete, truncate on public.word_lookups from anon, authenticated;
