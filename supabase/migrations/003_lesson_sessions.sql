-- Las lecciones también cuentan como sesión: minutos para Progreso y la racha.
-- Solo toca public.sessions de English Agent.

alter table public.sessions alter column pack_semana drop not null;

alter table public.sessions add column if not exists lesson_id text;

alter table public.sessions
  add constraint sessions_pack_or_lesson check (pack_semana is not null or lesson_id is not null);
