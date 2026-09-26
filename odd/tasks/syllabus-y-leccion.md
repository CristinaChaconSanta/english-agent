# Syllabus B1 → C1 y plantilla de lección

## Objetivo
Pasar de una app de ejercicios a una app que enseña: cada tema se explica (uso, contraste con español,
forma, cuándo no, hack, lectura, resumen) antes de practicar y calificar.

## Problema
`docs/dinamicas.md` solo define ejercicios. `docs/fuentes/01-syllabus.md` (NotebookLM) organiza fases de
negocios, no lecciones, omite lo básico y trae cifras inventadas.

## Alcance autorizado
- `docs/syllabus.md`: mapa de temas B1 → C1 con fuentes verificadas y criterio IELTS que mueve cada tema.
- `docs/estructura-leccion.md`: plantilla fija de lección (en inglés, español solo en contrastes).
- `docs/lecciones/01-verb-to-be.md`: lección de muestra con la plantilla.
- Nota en `AGENTS.md` que apunta a los documentos nuevos y fija la regla de idioma.

Fuera de alcance: código de la app, esquemas Zod, prompt para Cursor (siguiente paso).

## Restricciones
- Cero cifras inventadas; enlaces solo de búsqueda real (AGENTS.md reglas 3 y 4).
- Pronunciación solo con letras del español.
- Contenido de lección en inglés; español solo en ejemplos de contraste y lógica de aprendizaje.
- Tiempo real: ~10 semanas hasta diciembre de 2026 → prueba de nivel y temas básicos como repaso saltable.

## Tareas
- [x] T1 Investigar fuentes (English Grammar Profile, Core Inventory British Council/EAQUALS, IELTS band descriptors) — ruta: delegada (investigación amplia)
- [x] T2 Escribir `docs/syllabus.md` — ruta: delegada junto con T3 (2+ archivos no triviales)
- [x] T3 Escribir `docs/estructura-leccion.md` y `docs/lecciones/01-verb-to-be.md` — ruta: delegada
- [x] T4 Nota en `AGENTS.md` — ruta: inline (edición mecánica)

### Ronda 2 (feedback de Cristina, 2026-09-26)
- [x] T5 Plantilla: sección "Why it works this way" obligatoria, glosario de términos, botón "Ver en español" en todo, hack bilingüe, lista de verbos por lección, Check sin soluciones visibles, sin rayas (—) en la prosa — ruta: delegada junto con T6
- [x] T6 Reescribir `docs/lecciones/01-verb-to-be.md` con esas reglas y explicaciones del porqué respaldadas por fuentes — ruta: delegada (investigación + 2 archivos)

### Ronda 3 (feedback de Cristina, 2026-09-26)
- [x] T7 Regla de idioma estricta: toda sección en inglés primero; el español solo dentro de "Ver en español" (incluye Words you need y Why) — ruta: delegada junto con T8
- [x] T8 Estructura "Why chain" + `docs/ideas-clave.md` (principios grandes del inglés que cada lección referencia); aplicar a plantilla y lección 01 — ruta: delegada (investigación + 3 archivos)

### Evidencia T7/T8 (2026-09-26)

Archivos escritos/editados: `docs/estructura-leccion.md` (422 líneas), `docs/lecciones/01-verb-to-be.md`
(561 líneas), `docs/ideas-clave.md` (301 líneas, nuevo), `AGENTS.md` (+1 línea mecánica en el mapa de
archivos).

**T7 (regla de idioma):** "Words you need" y "Why it works this way" en la lección 01 quedaron en
inglés primero con `<details><summary>Ver en español</summary>` para la versión en español, igual que
el resto de secciones. `docs/estructura-leccion.md` quedó actualizado con la regla endurecida (sección
"Regla de idioma", no negociable): inglés primero sin excepción salvo pares de contraste, guías de
pronunciación y el Hack bilingüe (única sección con EN+ES visibles a la vez, sin toggle, por diseño
existente). También se tradujeron dos líneas sueltas en español que quedaban fuera de toggle en la
lección 01 (intro de "Verb list" y de "Check"). Verificado con grep: solo quedan líneas en español
fuera de `<details>` en la excepción del Hack (sección 7) y en el apéndice "Sources for Why it works
this way" (bibliografía/evidencia, no una de las 13 secciones de la plantilla; se trata como metadato
de proyecto, igual que las notas de este archivo).

**T8 (Why chain + Big Ideas):** la cadena tiene 7 eslabones: (1) The big picture (enlaza a una o más
Big Ideas), (2) Where it comes from (fuente verificada o se marca explícitamente como omitido), (3) The
problem it creates, (4) English's solution, (5) How native speakers see it (etiquetado "a useful mental
model" si no tiene fuente), (6) So you can predict (1-2 preguntas "Predict it" con respuesta oculta,
oraciones nuevas no vistas en la lección), (7) Spanish vs English in one line (par espejo). Aplicada a
la lección 01 como Why chain principal (por qué el inglés nunca borra el sujeto, con 2 preguntas
"Predict it" nuevas) más tres notas causales más cortas (do-support, *ser/estar* vs *be*, *tener* vs
*be* para edad/hambre/frío), todas con la misma estructura causal condensada. `docs/ideas-clave.md` se
creó con 6 Big Ideas (todas las candidatas propuestas quedaron verificadas, ninguna se descartó):
orden de palabras/pérdida de flexión, sujeto obligatorio/dummy subject, verbo-manera + partícula-
dirección (Talmy), verbos auxiliares como "herramientas" de tiempo/aspecto, artículos y
contable/incontable, y modales fijos vs. subjuntivo español. Cada idea liga a unidades de
`docs/syllabus.md` por número.

Fuentes buscadas y leídas con éxito esta sesión (26 de septiembre de 2026), todas nuevas fetches de
esta sesión (no reutilizadas de la sesión anterior aunque algunas URLs coincidan):
- https://en.wikipedia.org/wiki/Pro-drop_language (fetch OK)
- https://en.wikipedia.org/wiki/Expletive_(linguistics) (fetch OK)
- https://en.wikipedia.org/wiki/Old_English_grammar (fetch OK)
- https://en.wikipedia.org/wiki/Analytic_language (fetch OK)
- https://en.wikipedia.org/wiki/Verb_framing (fetch OK; el intento inicial a
  `Talmy%27s_typology` y a `Satellite-framed_language` devolvió 404, se resolvió con
  WebSearch y se usó la URL correcta)
- https://en.wikipedia.org/wiki/Auxiliary_verb (fetch OK)
- https://en.wikipedia.org/wiki/Do-support (fetch OK)
- https://en.wikipedia.org/wiki/English_modal_verbs (fetch OK)
- https://en.wikipedia.org/wiki/English_articles (fetch OK)
- https://en.wikipedia.org/wiki/Romance_copula (fetch OK)

Ninguna cifra, porcentaje ni la herramienta "abblino" de `docs/fuentes/06` y `07` se reutilizó; de esos
documentos solo se usa el método (Trajector/Landmark, dinámica de fuerzas de Talmy, escena ES/EN), ya
mencionado explícitamente en `docs/estructura-leccion.md` y `docs/ideas-clave.md`.

Sin rayas (—) en contenido de lección ni de plantilla (grep, solo aparecen citando el carácter dentro
de la regla que lo prohíbe). Sin símbolos fonéticos salvo la mención literal `(θ, ə, ð)` dentro de la
regla que los prohíbe. Verificado con grep en los 3 archivos de contenido.

Pendiente/fuera de alcance de T7/T8: no se aplicó la Why chain a ninguna lección adicional (solo existe
la lección 01); el campo `whyChain` del JSON de `docs/estructura-leccion.md` es una sugerencia de forma,
sin implementación de código ni validación Zod (fuera de alcance de esta tarea, igual que en rondas
anteriores).

### Evidencia T5/T6 (2026-09-26)
Archivos: `docs/estructura-leccion.md` (315 líneas), `docs/lecciones/01-verb-to-be.md`
(384 líneas). Ambos sin rayas (—) en contenido de lección (la única raya que queda en
`estructura-leccion.md` está en el título de la regla que prohíbe la raya, citándola
como carácter, no usándola en prosa); sin símbolos fonéticos salvo la mención literal
`(θ, ə, ð)` dentro de la regla que los prohíbe (confirmado con grep).

Fuentes para "Why it works this way", todas buscadas y con fetch exitoso en esta
sesión (2026-09-26), citadas al pie de la lección:
- https://en.wikipedia.org/wiki/Pro-drop_language (fetch OK)
- https://en.wikipedia.org/wiki/Old_English_grammar (fetch OK)
- https://en.wikipedia.org/wiki/Expletive_(linguistics) (fetch OK)
- https://en.wikipedia.org/wiki/Do-support (fetch OK)
- https://en.wikipedia.org/wiki/Romance_copula (primer intento ECONNREFUSED, segundo
  intento fetch OK)
- https://en.wikipedia.org/wiki/Auxiliary_verb (fetch OK)

Un intento con https://en.wikipedia.org/wiki/Spanish_conjugation no trajo la
información de origen histórico buscada (la página no la cubre); se usó
Romance_copula en su lugar. La explicación de por qué el inglés usa *be* para
edad/hambre/frío mientras el español usa *tener* no tiene fuente histórica verificada
encontrada hoy: quedó marcada explícitamente en la lección como modelo mental
simplificado, no como hecho histórico. Los documentos `docs/fuentes/06` y `07`
(NotebookLM) se usaron solo por su método (escenas, figura/fondo, contraste ES/EN);
ninguna cifra, "+0.5 IELTS" ni la herramienta "abblino" de esos documentos se
reutilizó.

## Criterios de aceptación
- Cada tema del mapa tiene nivel, criterio IELTS y fuente con URL verificada.
- La lección de muestra sigue la plantilla completa, con 3 pares de contraste ES → EN y un Check calificado.

## Checks
Lectura estructural; verificación de enlaces (respuesta HTTP real). TDD: no aplica (solo documentos).

## Progreso
T1–T4 completas. Fuentes verificadas: British Council–EAQUALS Core Inventory for General
English 2nd Ed. 2015 (PDF completo, 37 páginas, leído), IELTS Speaking Band Descriptors
públicos (PDF, fetch OK), IELTS Writing Band Descriptors públicos actualizados mayo 2023
(PDF, fetch OK), Wikipedia "English Profile" (fetch OK, para metodología del English
Grammar Profile). La base de datos detallada de englishprofile.org (egp-online,
wordlists/egp) devolvió 404 en esta sesión: no se usó para clasificar estructuras
específicas. Cleft sentences/it-clefts (unidad 27 del syllabus) quedan marcadas como
"sin fuente verificada" porque ninguna fuente accesible hoy las listó explícitamente en
C1 — pendiente de verificación futura, no se inventó su nivel.

Archivos escritos: `docs/syllabus.md` (143 líneas), `docs/estructura-leccion.md`
(178 líneas), `docs/lecciones/01-verb-to-be.md` (175 líneas). Nota añadida en
`AGENTS.md` (mapa de archivos) apuntando a los tres documentos nuevos.

Verificación del orquestador (2026-09-24): 4 de 5 enlaces responden 200 con curl. El PDF del Core
Inventory (teachingenglish.org.uk) responde 403 con curl y no responde con user-agent de navegador;
el agente lo leyó con WebFetch. Pendiente: confirmarlo en un navegador o con `verify-links`.
Sin símbolos fonéticos ni cifras inventadas en los 3 documentos (grep).

## Nota de entrega
El repo no tiene commit inicial (todo sin seguimiento en `master`). Los commits por tarea quedan pendientes
hasta que la usuaria decida el commit base.
