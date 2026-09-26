# Plantilla de lección (estructura fija)

Toda lección de la app sigue esta plantilla, en este orden. Es la unidad de trabajo:
`docs/syllabus.md` dice **qué** tema y en qué orden; esta plantilla dice **cómo** se
enseña ese tema.

## Regla de idioma (no negociable, endurecida en la Ronda 3)

El inglés va primero **en toda sección de la lección, sin excepción**. El
español nunca es el idioma por defecto de una sección; vive siempre detrás de
un toggle "Ver en español", un clic después, nunca escondido del todo pero
tampoco visible de entrada:

1. **Inglés primero, siempre**: todo texto de lección (Goal, Words you need,
   uses, form, Why it works this way, traps, verb list, Read, Summary,
   preguntas del Check, instrucciones de ejercicio) se escribe primero en
   inglés. Esto incluye explícitamente las secciones 2 (Words you need) y 5
   (Why it works this way): en la Ronda 2 esas dos secciones se escribían en
   español por defecto; eso queda corregido en la Ronda 3. Ninguna sección
   "nace en español": el porqué de que el inglés funcione así se explica en
   inglés simple, igual que el resto de la lección.
2. **"Ver en español" en cada sección, sin excepción**: cada sección de la
   lección tiene una versión en español que Cristina abre solo si después de
   releer el inglés todavía no entendió. No es la opción por defecto; es una
   salida de emergencia siempre visible. En markdown, esto se representa como
   un bloque `<details><summary>Ver en español</summary>` justo después del
   texto en inglés de esa sección. En la app, es un botón o toggle junto al
   título de la sección, y el campo `es` de esa sección solo se muestra al
   tocarlo.
3. **Único español visible sin toggle: pares de contraste ES → EN**. Siguen
   mostrando ambos lados siempre, sin toggle, porque el contraste ES/EN es el
   contenido en sí (comparar cómo piensa cada idioma), no una traducción de
   apoyo del inglés.
4. **Único español visible sin toggle: guías de pronunciación**. Usan solo
   letras del español, sílaba fuerte en mayúscula con tilde, nunca símbolos
   fonéticos (θ, ə, ð). Ejemplo: `pipeline (PÁIP-lain)`. Si el sonido no
   existe en español, se agrega una nota en palabras usando dos puntos, no
   raya: `three (ZRÍ: lengua entre los dientes)`. Esto es español porque es
   una guía de sonido, no contenido de la lección.
5. **Hack**: igual que el resto. Inglés visible; la versión en español va dentro
   de "Ver en español". No hay excepciones de contenido.
6. **Fuera de alcance de esta regla**: los metadatos de proyecto (este
   documento, `docs/syllabus.md`, `docs/ideas-clave.md` en su prosa de
   introducción y fuentes, notas de progreso en `odd/`) siguen la convención
   existente del proyecto (español), porque no son contenido de lección que
   Cristina practique en inglés.

Resumen de la regla: **el inglés se ve, el español se toca.** Sin excepciones de
contenido.

## Sin rayas (—) en el contenido de lección

Ninguna sección de lección (ni sus ejemplos en este documento) usa la raya (—). Cristina
se confunde con ella. En su lugar: punto, coma, dos puntos o paréntesis. Las notas de
pronunciación usan dos puntos: `three (ZRÍ: lengua entre los dientes)`.

## Secciones, en orden, con minutos objetivo (sesión de 25 min)

| # | Sección | Minutos objetivo (sesión de 25 min) |
|---|---|---|
| 1 | Goal | ~1 min |
| 2 | Words you need (glosario) | ~2 min |
| 3 | What it's for (uses) | ~4 min |
| 4 | How to build it (form) | ~4 min |
| 5 | Why it works this way | ~3 min |
| 6 | When NOT to use it (traps) | ~3 min |
| 7 | Hack (mental model) | ~1 min |
| 8 | Verb list | ~2 min |
| 9 | Read | ~4 min |
| 10 | Summary | ~1 min |
| 11 | Practice | ~4 min |
| 12 | Check (respuestas ocultas) | ~5 min |
| 13 | Wrap-up | ~1 min |

Para la sesión completa de 45 min (3 bloques de 15 con pausa, regla existente de
AGENTS.md), una lección grande se reparte en esos 3 bloques; el Check siempre queda al
final del último bloque, nunca a la mitad.

### 1. Goal (~1 min)

Tres líneas, sin rodeos, en inglés (español disponible en el mismo toggle "Ver en
español"):
- Qué vas a aprender hoy (el tema, en inglés, con su nombre técnico entre paréntesis
  la primera vez, y esa palabra técnica también debe estar en "Words you need" si no es
  obvia).
- Por qué este tema ahora (una frase que conecta con `docs/syllabus.md`: qué unidad
  anterior lo prepara, o qué error típico resuelve).
- Cómo se mide el éxito (el Check: 5 ítems nuevos, aprobar con 4/5).

UX: esto es lo primero que ve. Una sola pantalla, un solo botón "Empezar".

### 2. Words you need (glosario) (~2 min)

Sección nueva, obligatoria, antes de explicar nada. Ninguna palabra técnica se asume
conocida. Cada término nuevo de gramática que aparece en la lección (auxiliary verb,
main/full verb, subject, dummy subject, contraction, weak form, complement, etc.) se
explica aquí **en inglés simple primero**, en dos partes, con "Ver en español"
disponible por término o para todo el glosario:

- **What it is**: una frase corta, sin jerga adicional.
- **What it's for / why it exists**: qué problema resuelve esa pieza en la oración.

Ejemplo de entrada:

> **Auxiliary verb**: a verb that doesn't carry its own meaning; it only helps another
> verb form questions, negatives, or tenses. Spanish barely needs one to ask a question
> (*"¿Trabajas?"* only changes the tone); in English, most verbs do need one (*"Do you
> work?"*).
>
> <details>
> <summary>Ver en español</summary>
>
> **Auxiliary verb (verbo auxiliar)**: un verbo que no aporta significado propio; solo
> ayuda a otro verbo a formar preguntas, negaciones o tiempos. En español casi no
> necesitamos uno para preguntar ("¿Trabajas?" solo cambia el tono); en inglés, la
> mayoría de los verbos sí lo necesitan ("Do you work?").
> </details>

Si un término se puede evitar sin perder precisión, se evita en vez de agregarse al
glosario. El glosario no reemplaza la sección "Why it works this way"; la prepara.

### 3. What it's for (uses) (~4 min)

- Lista corta de usos reales (2 a 4), con un ejemplo en inglés por uso.
- **3 pares de contraste ES → EN sobre el USO** (no la forma): frases donde el español
  y el inglés piensan la misma situación de forma distinta. Formato:
  - 🇪🇸 *(cómo lo piensa el español)*
  - 🇬🇧 *(cómo lo piensa el inglés)*
- "Ver en español" disponible para la lista de usos (no para los pares de contraste,
  que ya son bilingües).

### 4. How to build it (form) (~4 min)

- La fórmula, mostrada como estructura (sujeto + auxiliar + verbo, etc.), no como regla
  memorizada.
- **3 pares de contraste ES → EN sobre la FORMA**: dónde cambia el orden de palabras,
  qué auxiliar aparece en inglés y no en español, etc.
- Gramática como escena, no como regla (AGENTS.md regla 6): quién → hace qué → a qué →
  cómo → dónde → cuándo. Si el tema es un phrasal verb o preposición, el verbo es cómo
  se mueve y la partícula es la flecha (`ran INTO`, `get OVER`).
- "Ver en español" disponible para la explicación de la fórmula.

### 5. Why it works this way: the Why chain (~3 min)

Sección nueva y obligatoria, y la estructura más importante de la Ronda 3. No es
opcional ni se puede reemplazar por "porque es la regla". Cristina pidió explícitamente
que no sea "así se usa este verbo porque así funciona", sino una **cadena causal**: qué
tipo de idioma es el inglés en este punto → de dónde viene → qué problema le generó eso
→ cómo lo resuelve → cómo ven el mundo por eso los hablantes nativos → qué puedes
predecir tú ahora que entiendes la causa. Toda la sección sigue la regla de idioma:
**inglés primero, español en un solo toggle "Ver en español" para toda la sección**
(no hay excepción aquí; a diferencia de la Ronda 2, esta sección ya no "nace en
español").

Cada lección conecta su Why chain con una o más ideas de `docs/ideas-clave.md` (las
"Big Ideas" del inglés). Esto es lo que hace que las lecciones formen un modelo
coherente en vez de reglas sueltas: si dos lecciones distintas dependen de la misma
razón de fondo (por ejemplo, que el inglés no permite omitir el sujeto), ambas enlazan
a la misma Big Idea en vez de re-explicarla cada vez desde cero.

**Los 7 eslabones de la cadena, en este orden:**

1. **The big picture**: qué tipo de comportamiento tiene el inglés en este punto,
   enlazado a una o más Big Ideas de `docs/ideas-clave.md` (por nombre y enlace). 2 a 4
   frases, sin jerga sin definir (los términos van en "Words you need").
2. **Where it comes from**: el origen histórico, solo si hay una fuente verificada
   (búsqueda + fetch exitoso el mismo día que se escribe la lección). Si no se
   encuentra una fuente verificable para el origen histórico de este punto específico,
   este eslabón se marca explícitamente como omitido (`"Where it comes from: skipped,
   no verified source found this session"` o su versión en español en el toggle), nunca
   se rellena con una historia inventada.
3. **The problem it creates**: qué necesitaba resolver el inglés como consecuencia de
   1 (y de 2, si aplica). 2 a 4 frases.
4. **English's solution**: la construcción de esta lección, presentada como la
   respuesta lógica a ese problema, no como una regla arbitraria. 2 a 4 frases.
5. **How native speakers see it**: la imagen mental o la forma de enmarcar el mundo que
   resulta de esa solución. Si esta imagen no está respaldada por una fuente (la
   mayoría de las veces no lo estará: es una forma de imaginarlo, no un hallazgo
   lingüístico), se etiqueta explícitamente como **"a useful mental model"** /
   **"un modelo mental útil"**, nunca como un hecho.
6. **So you can predict**: 1 a 2 preguntas "Predict it" con oraciones que Cristina no ha
   visto antes en la lección, para probar que entendió la causa y puede aplicarla a un
   caso nuevo, no que memorizó el ejemplo dado. La respuesta y el porqué van ocultos
   hasta que ella responde (mismo mecanismo que el Check: `<details><summary>Ver
   respuesta</summary>` en markdown; en la app, los campos `answer`/`why` no se
   muestran antes de enviar respuesta).
7. **Spanish vs English in one line**: la diferencia central como un solo par de
   oraciones espejo (🇪🇸 / 🇬🇧, igual formato que los pares de contraste de las
   secciones 3 y 4), no una explicación larga otra vez.

Reglas de esta sección (heredadas de la Ronda 2, sin cambios):
- Toda afirmación histórica o lingüística debe venir de una fuente real, verificada en
  el momento de escribir la lección (búsqueda + fetch exitoso), citada al pie de la
  lección con su URL.
- Si no se puede verificar una afirmación, se marca explícitamente como **modelo
  mental simplificado** (una forma de imaginarlo, no un hecho histórico), o se omite.
  Nunca se presenta una simplificación como si fuera un hecho verificado.
- Cero cifras, porcentajes o estudios inventados (AGENTS.md regla 3). Los documentos de
  `docs/fuentes/06` y `docs/fuentes/07` (NotebookLM) se usan solo por su **método**
  (pensar en escenas, contraste ES/EN, figura/fondo, Trajector/Landmark, dinámica de
  fuerzas de Talmy); sus cifras, "+0.5 IELTS" y la herramienta "abblino" son inventados
  y no se citan nunca.

### 6. When NOT to use it (traps) (~3 min)

- Errores comunes de hispanohablantes con este punto, cada uno como par
  **wrong → right**, en inglés (la trampa se muestra en inglés porque es el error que
  ella comete al hablar/escribir inglés, no un error de traducción).
- Máximo 3 a 4 trampas; más que eso, es la siguiente lección.
- "Ver en español" disponible para el porqué de cada trampa, si hace falta más detalle
  que el que ya da "Why it works this way".

### 7. Hack (mental model) (~1 min)

- Un solo modelo mental memorable, no una lista, que se pueda repetir en una frase.
  Inglés visible; español dentro de "Ver en español".
- Sigue la lógica de escena (AGENTS.md): quién → hace qué → a qué → cómo → dónde →
  cuándo, o el par verbo-movimiento/partícula-flecha cuando aplique.

### 8. Verb list (~2 min)

Sección nueva, obligatoria. Lista cada verbo usado en la explicación de la lección
(no en el Read ni en Practice, salvo que también aparezca en la explicación), con:

- Sus formas en los tiempos principales: base, pasado simple, participio pasado,
  forma -ing, tercera persona singular.
- Si el verbo tiene varios significados o usos relevantes para esta lección (por
  ejemplo *get*, *have*, *be*), un ejemplo corto por cada uso relevante, para que
  Cristina no memorice el verbo en un solo sentido y se confunda al verlo en otro.

Formato sugerido (tabla):

| Verb | Base | Past | Past participle | -ing | 3rd person | Uses in this lesson |
|---|---|---|---|---|---|---|
| be | be | was/were | been | being | is | identity, location, state (ver sección 3) |

### 9. Read (~4 min)

- Texto original en inglés, 120 a 200 palabras, que usa el punto gramatical de forma
  natural (no una lista de ejemplos forzados).
- Las formas objetivo aparecen marcadas (negrita o resaltado) para que se noten sin
  que ella tenga que buscarlas.
- Tema variado según AGENTS.md regla 5 (filosofía, arte, sociología, psicología social,
  HCI, literatura, startups, finanzas, IA/growth/ops). Nunca solo temas de trabajo.
- "Ver en español" disponible como traducción del texto completo, para revisar
  comprensión después de leer, no para leer en paralelo.

### 10. Summary (~1 min)

- 3 líneas, en inglés, que resumen uso, forma y la trampa más importante.
- "Ver en español" disponible.

### 11. Practice (~4 min)

- Usa los tipos de ejercicio ya definidos en `docs/dinamicas.md`. Ninguna dinámica
  nueva se inventa aquí; si el tema necesita una dinámica que no existe, eso es un
  cambio a proponer en `docs/dinamicas.md`, no en esta plantilla.
- Se elige el tipo de dinámica según AGENTS.md: nunca la misma dos veces seguidas
  respecto a la lección anterior.

### 12. Check (~5 min), respuestas ocultas hasta responder

- 5 ítems **nuevos** (no repetidos de Practice), calificados automáticamente.
- Cristina escribe o elige su respuesta primero. La respuesta correcta y el porqué
  solo se muestran después de que ella responde ese ítem, nunca antes.
  - En markdown, cada ítem se escribe con la pregunta visible y la respuesta dentro de
    un bloque `<details><summary>Ver respuesta</summary>...</details>`, o como
    alternativa, todas las respuestas juntas en una sección "Answer key" al final del
    documento, después del Wrap-up.
  - En la app, el campo `answer` y el campo `why` de cada ítem del JSON (ver forma del
    archivo más abajo) no se envían al cliente, o se envían pero la interfaz los oculta,
    hasta que la usuaria envía su respuesta para ese ítem.
- Aprobar = 4/5 correctas (decisión de diseño de esta app, ver `docs/syllabus.md`).
- Muestra el puntaje inmediatamente después de responder cada ítem (feedback
  inmediato, regla TDAH de AGENTS.md), pero el puntaje no reemplaza mostrar el porqué.
- Los ítems fallidos se envían a FSRS como tarjetas de refuerzo.

### 13. Wrap-up (~1 min)

- Una línea de logro que ella misma escribe, **en inglés** (regla existente de
  AGENTS.md: "Hoy usé un it-cleft…"), guardada en la base de datos (Supabase, no
  localStorage).

## UX para TDAH dentro de la lección (consistente con AGENTS.md)

- **Una acción principal por pantalla**: cada sección de la plantilla es su propia
  pantalla o paso; nunca dos decisiones a la vez.
- **Temporizador siempre visible**: cuenta el tiempo de la sesión completa, no de cada
  sección. Las secciones son guía, no un cronómetro individual que genere ansiedad.
- **Progreso "Misión/Step X of Y"**: contador simple (ej. "Step 3 of 13") en vez de una
  barra de progreso ambigua; TDAH necesita ver el final, no solo el avance.
- **Instrucciones de una línea**: cada pantalla dice una sola cosa que hacer, en
  imperativo simple ("Read this. Tap the words in bold.").
- **Feedback inmediato**: el Check califica al instante, sin pantalla de carga larga,
  pero sin mostrar la respuesta antes de que ella responda.
- **Errores de la app en tono neutro**: causa + arreglo, sin "¡Uy!" (regla existente).
- **Nunca repetir el mismo tipo de dinámica dos veces seguidas** en Practice.

## Forma sugerida del archivo de lección (JSON, para validar después con Zod)

Esto es una sugerencia de forma para el siguiente paso (no se implementa código aquí,
ver alcance de `odd/tasks/syllabus-y-leccion.md`). Cada sección con texto de apoyo trae
un campo `en` (obligatorio) y un campo `es` (para el toggle "Ver en español"). El Check
separa `prompt` (siempre visible) de `answer` y `why` (ocultos hasta responder):

```json
{
  "id": "01-verb-to-be",
  "unitNumber": 1,
  "level": "A2",
  "ieltsCriteria": ["Fluency and Coherence", "Grammatical Range and Accuracy"],
  "goal": {
    "whatEn": "string",
    "whatEs": "string",
    "whyNowEn": "string",
    "whyNowEs": "string",
    "successMeasureEn": "string",
    "successMeasureEs": "string"
  },
  "glossary": [
    {
      "termEn": "string",
      "termEs": "string",
      "whatEn": "string",
      "whatEs": "string",
      "whyEn": "string",
      "whyEs": "string"
    }
  ],
  "uses": {
    "usesEn": ["string"],
    "usesEs": ["string"],
    "contrastPairs": [{ "es": "string", "en": "string" }]
  },
  "form": {
    "formulaEn": "string",
    "formulaEs": "string",
    "contrastPairs": [{ "es": "string", "en": "string" }],
    "sceneHackEn": "string"
  },
  "whyChain": {
    "bigIdeaIds": ["ideas-clave-slug"],
    "links": {
      "bigPicture": { "en": "string", "es": "string" },
      "whereItComesFrom": {
        "en": "string",
        "es": "string",
        "skipped": false,
        "skippedReasonEn": "string (only if skipped: true)"
      },
      "problemItCreates": { "en": "string", "es": "string" },
      "englishsSolution": { "en": "string", "es": "string" },
      "howNativeSpeakersSeeIt": {
        "en": "string",
        "es": "string",
        "isMentalModel": true
      },
      "spanishVsEnglish": { "es": "string", "en": "string" }
    },
    "predict": [
      {
        "promptEn": "string",
        "answerEn": "string",
        "whyEn": "string",
        "revealAfterSubmit": true
      }
    ],
    "sources": [{ "url": "string", "fetchedOk": true }],
    "simplifiedModel": false
  },
  "traps": [{ "wrongEn": "string", "rightEn": "string", "whyEn": "string", "whyEs": "string" }],
  "hack": { "mentalModelEn": "string", "mentalModelEs": "string" },
  "verbList": [
    {
      "verb": "string",
      "base": "string",
      "past": "string",
      "pastParticiple": "string",
      "ing": "string",
      "thirdPerson": "string",
      "uses": [{ "meaningEs": "string", "exampleEn": "string" }]
    }
  ],
  "read": {
    "textEn": "string",
    "textEs": "string",
    "wordCount": 0,
    "markedForms": ["string"]
  },
  "summaryEn": ["string", "string", "string"],
  "summaryEs": ["string", "string", "string"],
  "practiceRefs": ["dinamica-id-from-docs/dinamicas.md"],
  "check": {
    "items": [
      {
        "promptEn": "string",
        "answerEn": "string",
        "whyEn": "string",
        "revealAfterSubmit": true
      }
    ],
    "passThreshold": 4,
    "outOf": 5
  },
  "pronunciationNotes": [{ "wordEn": "string", "guideEs": "string" }]
}
```

Campos exactos y validación con Zod quedan para el siguiente paso, fuera de alcance de
esta tarea. La regla de negocio importante para ese paso: `answer`, `why` y
`revealAfterSubmit` del Check **y de `whyChain.predict`** nunca se muestran en la
interfaz antes de que la usuaria envíe una respuesta para ese ítem, sin importar si el
dato ya llegó al cliente. `whyChain.bigIdeaIds` referencia el slug de la idea en
`docs/ideas-clave.md` (por ejemplo, la idea de sujeto obligatorio/dummy subject); el
siguiente paso de código decide si esos slugs viven en un enum compartido o en el mismo
archivo de contenido de `docs/ideas-clave.md` convertido a datos.
