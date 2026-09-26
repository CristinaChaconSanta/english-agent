Lee AGENTS.md, prompts/coach.md, docs/dinamicas.md y docs/biblioteca.md antes de escribir código.

Construye la versión 1 de la app, solo esto:

1. Proyecto Next.js 15 + TypeScript + Tailwind 4, configurado como PWA instalable en iPhone.
2. Supabase: login con enlace mágico al correo y tablas para sesiones, minutos, racha, tarjetas FSRS y logros.
3. Esquema Zod en lib/schemas/pack.ts para los paquetes de content/packs/, según docs/dinamicas.md.
4. Un paquete de ejemplo content/packs/2026-S39.json escrito a mano con 4 dinámicas: flecha, upgrade, repaso y logro.
5. Pantalla "Hoy": botón Empezar → temporizador visible → las 4 dinámicas en orden → logro de 1 línea → guardar en Supabase.
6. Pantalla "Progreso": racha, minutos de la semana y logros.

Todavía no: IA, voz, chat, IELTS ni biblioteca. Eso va en la versión 2.

Antes de escribir código, muéstrame el plan en máximo 10 pasos y espera mi aprobación.
