# Resumen del proyecto English Agent (al 24 de septiembre de 2026)

## Meta
Pasar de inglés B1 a **IELTS 6.5–7.0 en diciembre de 2026** para postular en enero de 2027 a maestrías de HCI:
- UvA (Information Studies, énfasis HCI): IELTS 7.0 con 6.5 en cada parte · cierra 31 ene 2027
- KTH (Interactive Media Technology): 6.5 · cierra 15 ene 2027
- Aalto (HCI): postulación del 7 dic 2026 al 12 ene 2027
- Utrecht (HCI): 6.5, writing mínimo 6 · plazo general no-UE 1 abr
- UCL (MSc HCI): nivel 4 de UCL, cerca de 7.5 (sin confirmar)

Tiempo de estudio: mínimo 25 min/día; ideal 45 min (3 bloques de 15).

## Reparto de trabajo
- **Claude:** estrategia, diseño de ejercicios, especificaciones para Cursor.
- **Cursor (plan Ultra):** construye la app. Automation diaria a las 6 a. m. para implementar cambios.
- **Grok Bot:** actualiza contenido semanal (incluido en el plan de Cursor).
- Costo en uso: $0–5/mes (Groq y Gemini gratis, voz del navegador).

## Decisiones tomadas
- App web instalable en iPhone (PWA), sin App Store. Next.js 15 + Supabase + Vercel.
- Pronunciación **solo con letras del español**: `pipeline (PÁIP-lain)`. Nada de símbolos fonéticos.
- 15 frases por tema de frases · 7 ejemplos por palabra o verbo.
- Cero cifras inventadas (los documentos de NotebookLM traen datos falsos: se usa su método, no sus números).
- Enlaces solo verificados; si uno no abre, se borra.
- Temas variados: filosofía, arte, sociología, psicología social, HCI, literatura, startups, IA.
- Chat con 4 botones: Explícamelo distinto · No entendí esto · Profundizar · Arreglar la app (crea un issue en GitHub).
- Estilo "pop cartoon": tarjetas crema con borde negro y sombra dura, Bricolage Grotesque, DM Sans y Permanent Marker, stickers.
- 5 personajes: Sunny (Hoy), Loop (Repaso, feliz), Flex (IELTS), Page (Biblioteca), Specs (Coach).
- 6 temas de color que rotan por lección, cada uno con su versión de noche.
- Regla de claridad: todo ejercicio tiene misión visible, instrucción de una línea, respuesta inmediata y progreso.

## Archivos del proyecto
- `AGENTS.md` — reglas para Cursor
- `prompts/coach.md` — personalidad del coach
- `docs/dinamicas.md` — 16 tipos de ejercicio + Regla de claridad
- `docs/estilo-visual.md` — colores, fuentes, personajes, temas y modo noche
- `docs/biblioteca.md` — unos 45 libros y el método Scene → Steelman → Push back → Connect
- `docs/fuentes/` — los 7 documentos originales
- `.cursor/skills/` — content-pack, verify-links, change-request

## Herramientas instaladas
engram (memoria de Cursor y Claude Code), gentle-ai (persona neutral), gga y todas las Gentleman-Skills.

## Estado actual
- Versión 1 construida por Cursor (login, pantalla Hoy, temporizador, progreso).
- **Problema abierto:** la dinámica "flecha" no se entiende (sin misión, sin respuesta, botones apilados).
  El arreglo está en `docs/arreglo-flecha.md` para pegarlo en Cursor.

## Actualización (26 de septiembre de 2026)
- La app pasó de ejercicios a lecciones: cada tema se explica (con el porqué) antes de practicar y calificar.
- Documentos nuevos: `docs/syllabus.md` (31 unidades), `docs/estructura-leccion.md` (plantilla),
  `docs/ideas-clave.md` (6 ideas grandes del inglés), `docs/lecciones/01-verb-to-be.md`.
- Cursor ya muestra la lección 01 en Hoy (13 pasos, "Ver en español", Check oculto, nota en Supabase).
- Reparto: Grok escribe las lecciones nuevas (`docs/prompt-grok-leccion.md`), Claude las revisa, Cursor programa.

## Ideas para después (versión pública)
Primero la usa Cristina; si luego se hace pública:
- Registro inicial: prueba de nivel, intereses, meta (IELTS, trabajo, viaje), preferencias
  (sesión de 25 o 45 min, horario, hablar o escribir).
- Personalizar con intereses (ejemplos, lecturas, temas) y con datos de uso (aciertos, dónde se traba,
  qué abandona), no con tests de "estilos de aprendizaje" ni de personalidad: la revisión de
  Pashler y colegas (2008) no encontró evidencia de que adaptar la enseñanza al "estilo" mejore el aprendizaje.
- Antes de cobrar: piloto de 1 mes midiendo horas de personalización, costo de IA por usuaria y uso real.
- Revisar si los planes gratis de Groq y Gemini permiten uso comercial.
- Privacidad: autorización de datos según la Ley 1581 de 2012 (Colombia).

## Pendiente
1. Arreglar la flecha y aplicar la Regla de claridad a los demás ejercicios.
2. Revisar que se lean los botones en modo día y en modo noche.
3. Versión 2: IA (Groq), voz, chat, módulo IELTS, carta de motivación y biblioteca.
4. Configurar las Automations de Cursor (diaria de cambios y semanal de contenido).
