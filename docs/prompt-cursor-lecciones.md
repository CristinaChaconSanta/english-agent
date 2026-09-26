La app pasa de ser solo ejercicios a enseñar: cada tema se explica antes de practicar y calificar.
Lee primero, en este orden: AGENTS.md, docs/estructura-leccion.md, docs/ideas-clave.md,
docs/lecciones/01-verb-to-be.md, docs/syllabus.md y docs/estilo-visual.md.

Haz esto:
1. Esquema Zod de lección en lib/schemas/, a partir del JSON sugerido en docs/estructura-leccion.md.
   Cada sección tiene `en` y `es`. Las preguntas de Check y "Predict it" tienen `answer` y `why`.
2. Convierte docs/lecciones/01-verb-to-be.md en content/lecciones/01-verb-to-be.json, validado con ese
   esquema. No cambies ni resumas el contenido.
3. Pantalla de lección: cada una de las 13 secciones es un paso, con "Step X of 13" arriba y el
   temporizador visible. Una acción principal por pantalla ("Next").
4. Idioma: todo se muestra en inglés. El español solo aparece al tocar "Ver en español" y se puede
   volver a ocultar. Lo único en español visible sin tocar: el lado español de los pares de contraste
   y las guías de pronunciación.
5. Check y "Predict it": primero ella escribe o elige. La respuesta y el porqué aparecen solo después
   de enviar. El Check muestra la nota (se aprueba con 4 de 5). Las preguntas falladas van a Repaso (FSRS).
   El resultado se guarda en Supabase.
6. La lección 01 es lo primero que abre la pantalla Hoy. Si aprueba el Check, queda marcada como
   superada y la siguiente vez se puede saltar.
7. Modo noche (docs/estilo-visual.md, tokens): texto crema #F3EAD9 sobre tarjetas #2B2733. Hoy hay
   texto negro fijo en la misión de la flecha y en las fichas: úsalo solo dentro de los resaltados
   azul y rosa. Revisa el contraste de todas las pantallas en día y en noche.
8. Dinámica flecha: aplica el plan que ya aprobamos, con estos ajustes. La instrucción y las etiquetas
   van en inglés ("Choose how it moves and where it goes", "How does it move?", "Where to?"). La frase de
   misión en español se queda visible porque es un par de contraste. En Upgrade, quita "Misión 1 de 1"
   y agrega el paso "Now write your own" (Step 1 of 2, Step 2 of 2).
9. Al terminar: corre typecheck, lint y build, y recorre la lección 01 completa en día y en noche.

Muéstrame el plan antes de cambiar código.
