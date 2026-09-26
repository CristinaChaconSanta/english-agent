# English Agent — instrucciones para el agente que construye la app

App personal para que Cristina pase de inglés B1 a IELTS 6.5–7.0 antes de diciembre de 2026
(postula en enero de 2027 a maestrías de HCI: KTH, Aalto, Utrecht, UvA).
Tiene TDAH. Todo el diseño parte de eso.

## Stack (no cambiar sin preguntar)
- Next.js 15 (App Router) + TypeScript estricto + Tailwind 4 + Zod 4 + Zustand 5
- Supabase (auth + Postgres) para progreso. Nada de progreso solo en localStorage.
- PWA instalable en iPhone (manifest + service worker + web push iOS 16.4+). Deploy en Vercel.
- IA en tiempo de uso: Vercel AI SDK 5 con Groq (plan gratis) → fallback Gemini Flash-Lite.
  Voz → texto: Whisper en Groq. Texto → voz: `speechSynthesis` del navegador (gratis).
- Repaso espaciado: librería `ts-fsrs`.
- Skills instaladas que debes usar: nextjs-15, react-19, typescript, tailwind-4, zod-4, zustand-5, ai-sdk-5, playwright.

## Mapa de archivos
- `prompts/coach.md` → personalidad del coach dentro de la app (prompt de sistema en runtime).
- `docs/syllabus.md` → mapa de gramática B1 → C1 con fuentes verificadas y criterio IELTS por tema.
- `docs/estructura-leccion.md` → plantilla fija de lección. Regla de idioma: todo el contenido de
  lección va en inglés, salvo el lado español de los pares de contraste y las guías de pronunciación.
- `docs/lecciones/` → lecciones que siguen esa plantilla (ver `01-verb-to-be.md` como muestra).
- `docs/ideas-clave.md` → principios grandes del inglés ("Big Ideas") a los que cada lección conecta su "Why it works this way".
- `docs/dinamicas.md` → catálogo de ejercicios. Todo ejercicio nuevo sale de aquí.
- `docs/estilo-visual.md` → paleta, tipografía, componentes y movimiento. Toda pantalla lo sigue.
- `docs/biblioteca.md` → libros y el método de lectura Scene → Steelman → Push back → Connect.
- `docs/fuentes/` → los 7 documentos originales de NotebookLM (metodología). Ver advertencia abajo.
- `content/packs/AAAA-Sxx.json` → paquetes semanales de contenido, validados con Zod.
- `.cursor/skills/` → content-pack, verify-links, change-request.

## Reglas de contenido (no negociables)
1. **Cantidades:** tema de frases = 15 frases. Palabra o verbo = 7 ejemplos, cada uno con contexto.
2. **Pronunciación solo con letras del español**, estilo `pipeline (PÁIP-lain)`, sílaba fuerte en mayúscula
   con tilde. Nada de símbolos fonéticos (θ, ə, ð). Si un sonido no existe en español,
   se agrega una nota en palabras: `three (ZRÍ — lengua entre los dientes)`.
3. **Cero datos inventados.** Prohibido "X% de hispanohablantes…", "+0.5 IELTS", salarios o estudios
   sin fuente verificada. Los documentos de `docs/fuentes/` contienen cifras, herramientas ("abblino")
   y porcentajes inventados por NotebookLM: usa su metodología, nunca sus números.
4. **Enlaces:** solo los que vienen de una búsqueda real y pasan `verify-links`. Nunca URLs escritas de memoria.
5. **Temas variados**, no solo trabajo: filosofía, arte, sociología, psicología social, HCI,
   literatura, startups y finanzas, además de IA/growth/ops.
6. **Gramática como escena**, no como regla: quién → hace qué → a qué → cómo → dónde → cuándo.
   Verbo = cómo se mueve; partícula = la flecha (ran INTO, get OVER).
7. Nivel de dificultad: lo más avanzado que todavía sea aceptable. Corregir solo errores graves
   (los que cambian el sentido o bajan puntaje IELTS). Sin autoayuda.

## Reglas de UX para TDAH
- Una acción principal por pantalla. El primer botón siempre es "Empezar".
- Temporizador visible siempre durante la sesión.
- Sesión mínima 25 min (cuenta como día cumplido). Sesión completa 45 min = 3 bloques de 15 con pausa.
- Menú de 3 opciones según energía: Hablar / Sombra (shadowing) / Guardar frases.
- Nunca repetir el mismo tipo de dinámica dos veces seguidas.
- Progreso visible: racha, minutos, frases dominadas, fluidez (palabras/min y pausas), mini-prueba cada 2 semanas.
- Cierre de sesión: 1 línea de logro ("Hoy usé un it-cleft…"), guardada en la base.
- Errores de la app en tono neutro: causa + arreglo. Sin "¡Uy!".

## Módulos
1. **Hoy**: sesión guiada (25 o 45 min) armada con el paquete de la semana.
2. **Repaso**: FSRS sobre frases y palabras guardadas.
3. **IELTS**: Writing Task 1 y 2, Speaking Parts 1–3 con transcripción y feedback, Reading y Listening cronometrados.
4. **Carta**: borrador de la carta de motivación (500 palabras) y del CV, con correcciones.
5. **Biblioteca**: lectura por capítulos con los 4 movimientos.
6. **Coach (chat)** con 4 botones: Explícamelo distinto · No entendí esto · Profundizar · Arreglar la app.
   - "No entendí esto" → crea tarjetas de refuerzo en FSRS.
   - "Profundizar" → fuente verificada + resumen.
   - "Arreglar la app" → crea un issue en GitHub con la etiqueta `cambio`. Nunca toca el código directo.

## Automatización (sin gastar API)
- Cursor Automation diaria, 6:00 a. m. (hora de Bogotá): ejecuta la skill `change-request`
  sobre los issues con etiqueta `cambio` y abre un PR por issue. Cristina aprueba antes de publicar.
- Cursor Automation o rutina de Grok Bot semanal, domingo: ejecuta `content-pack` y luego `verify-links`.

## Seguridad
- Llaves de API solo en variables de entorno (`.env.local`, Vercel). Nunca en el código ni en el repo.
- Un solo proveedor por cuenta; el fallback es entre proveedores, no entre cuentas.
- Grabaciones de voz: se transcriben y se borran; no mandarlas a proveedores que entrenen con los datos.
