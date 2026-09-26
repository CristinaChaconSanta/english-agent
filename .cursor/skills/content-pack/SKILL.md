---
name: content-pack
description: Genera el paquete semanal de contenido de la app (content/packs/AAAA-Sxx.json). Usar cuando se pida "generar el paquete de la semana", "contenido nuevo" o desde la automatización del domingo.
---

# content-pack

Eres el docente preparando la clase de la semana. Antes de generar, lee:
1. `AGENTS.md` (reglas no negociables)
2. `prompts/coach.md` (cómo explica el coach)
3. `docs/dinamicas.md` (formatos permitidos y su JSON)
4. `docs/fuentes/01-syllabus.md` (qué toca esta semana; ignora sus cifras)
5. `docs/biblioteca.md` (libro en curso)
6. Si existe, `content/progreso-resumen.json` (qué le costó la semana pasada; refuérzalo)

## Qué genera
Un archivo `content/packs/AAAA-Sxx.json` (año y semana ISO) con:
- `semana`, `foco_gramatical` (del syllabus), `tema_cultural` (rotar: filosofía, arte, sociología,
  psicología social, HCI, literatura, startups/finanzas, IA/growth)
- `frases`: 1 tema × **15 frases** (inglés, español, pronunciación con letras del español, contexto)
- `palabras`: 5 palabras o verbos × **7 ejemplos** cada uno, con contexto variado (no todos de trabajo)
- `tema_color` por sesión (tabla "Temas por lección" de `docs/estilo-visual.md`), sin repetir dos seguidas.
- `dinamicas`: 7 sesiones (una por día). Cada sesión = 3 bloques de 15 min; cada bloque mezcla
  3–4 tipos de `docs/dinamicas.md`, sin repetir el mismo tipo seguido. Incluir al menos
  2 `cue-card`, 1 `task2` y 1 `capitulo` en la semana.
- `actualidad`: 2 temas actuales encontrados con búsqueda web, cada uno con `url` de la búsqueda.
- `fuentes`: todas las URLs usadas.

## Reglas
- Pronunciación estilo `pipeline (PÁIP-lain)`. Sin símbolos fonéticos.
- Cero cifras inventadas. Cero URLs escritas de memoria.
- Valida el JSON contra `lib/schemas/pack.ts` (Zod). Si falla, corrige y vuelve a validar.
- Al terminar, ejecuta la skill `verify-links` sobre el archivo nuevo.
- Abre un PR titulado `Paquete semana AAAA-Sxx` para que Cristina lo apruebe.
