# Catálogo de dinámicas

Referencia de formatos probados: catálogo de H5P (https://h5p.org/content-types-and-applications).
Regla: nunca dos veces seguidas el mismo `tipo`. Una sesión de 15 min usa 3–4 dinámicas distintas.

Cada dinámica tiene: **qué entrena · duración · cómo se ve · ejemplo JSON** (lo que genera `content-pack`).

## Regla de claridad (toda dinámica, sin excepción)
1. **Misión visible arriba**, en una frase: qué tienes que lograr ("Haz que Sunny salga de la caja").
2. **Instrucción de máximo una línea**, con verbos de acción ("Elige cómo se mueve y hacia dónde").
3. **Respuesta inmediata** a cada toque: se ve el resultado, correcto o no, más una pista corta.
4. **Progreso dentro del ejercicio**: "Misión 1 de 3".
5. **La primera vez**, un ejemplo resuelto de 5 segundos antes de que lo hagas tú.
Si un ejercicio no tiene respuesta correcta que comprobar, no es un ejercicio: es decoración.

## Ver (escena y flecha)

### 1. `flecha` — Misión de partículas
Entrena: phrasal verbs y preposiciones de movimiento · 2–3 min (3 misiones)
Se ve:
1. Arriba, la **misión** en español: "Sunny **salió** de la caja **de un salto**." (dirección y manera resaltadas en sus colores).
2. La escena: Sunny y la caja sticker (con solapas y la etiqueta THE BOX).
3. Dos filas de fichas pequeñas, lado a lado, no botones gigantes apilados:
   **¿Cómo se mueve?** (verbo: jump · run · float) y **¿Hacia dónde?** (flecha: into · out of · over).
4. Al elegir las dos: Sunny hace el movimiento elegido y aparece la frase en inglés armada
   ("Sunny jumped out of the box."). Si coincide con la misión: la tarjeta salta y pasa a la siguiente misión.
   Si no: Sunny hace lo que elegiste (se ve el error) y aparece una pista de una línea.
```json
{"tipo":"flecha","personaje":"sunny","hito":"the box","misiones":[{"es":"Sunny salió de la caja de un salto.","verbo":"jump","flecha":"out of","en":"Sunny jumped out of the box."},{"es":"Sunny entró a la caja corriendo.","verbo":"run","flecha":"into","en":"Sunny ran into the box."},{"es":"Sunny pasó flotando por encima de la caja.","verbo":"float","flecha":"over","en":"Sunny floated over the box."}],"mente":[{"frase":"get over a breakup","es":"superar: pasar por encima del obstáculo"}]}
```

### 2. `escena` — Describe como cámara
Entrena: orden de la frase y vocabulario · 3 min
Se ve: una imagen (obra de museo de dominio público o escena generada). Grabas o escribes 3 frases:
quién → hace qué → dónde → cuándo. Feedback: máximo 3 correcciones.
```json
{"tipo":"escena","imagen":"met:436535","pista":"Who is doing what, where?","modelo":["A woman is pouring milk into a jug.","Light falls through the window onto the table."]}
```

### 3. `linea-tiempo` — Arrastra el evento
Entrena: tiempos verbales · 2 min
Se ve: una línea con PASADO · AHORA. Arrastras la frase al punto correcto y ves la "foto" (simple),
el "GIF" (continuo) o el "puente" (perfecto).
```json
{"tipo":"linea-tiempo","frase":"We have deployed three agents this quarter","respuesta":"puente","por_que":"El trimestre no ha terminado: el pasado toca el ahora."}
```

## Elegir (rápido, de baja energía)

### 4. `upgrade` — De B1 a C1
Entrena: registro formal para IELTS y la carta · 1–2 min
Se ve: frase simple arriba, 3 versiones abajo; eliges la C1 y luego escribes la tuya.
```json
{"tipo":"upgrade","b1":"I think we have a problem with latency.","opciones":["It appears there is a significant discrepancy in latency.","Latency is bad.","We have problem of latency."],"correcta":0}
```

### 5. `falso-amigo` — Trampa español/portugués
Entrena: falsos amigos · 1 min
Se ve: tarjeta que se voltea. "Actually" ≠ actualmente.
```json
{"tipo":"falso-amigo","palabra":"eventually","parece":"eventualmente","significa":"al final, tarde o temprano","ejemplo":"Eventually, the model converged."}
```

### 6. `huecos` — Completar con arrastre
Entrena: colocaciones y partículas · 2 min
```json
{"tipo":"huecos","texto":"We need to ___ the new pricing ___ next month.","fichas":["roll","out","up","over"],"respuesta":["roll","out"]}
```

## Hablar

### 7. `sombra` — Shadowing con ritmo
Entrena: ritmo, acento, conexión de palabras · 3 min
Se ve: audio de 20–90 s con el texto; las sílabas fuertes en mayúscula. Repites encima; la app te
transcribe y marca pausas de más de 1 segundo.
```json
{"tipo":"sombra","texto":"What the team needs to PRIoritize is ALIGNment.","pronunciacion":"juat de TÍM nídz tu prai-Ó-ri-tais is a-LÁIN-ment","fuente":"url-verificada"}
```

### 8. `cue-card` — IELTS Speaking Part 2
Entrena: hablar 2 minutos seguidos · 4 min (1 de preparación + 2 hablando + feedback)
```json
{"tipo":"cue-card","tema":"Describe a piece of technology you find difficult to use.","puntos":["what it is","when you use it","why it is difficult","how it could be improved"]}
```

### 9. `debate-60` — Un minuto de opinión
Entrena: argumentar · 2 min
Se ve: pregunta de un libro o tema del día. Grabas 60 s. Feedback: tu idea en versión más fuerte.
```json
{"tipo":"debate-60","pregunta":"Was Achilles a hero or a problem?","libro":"The Iliad","conectores":["On the one hand","That said","Ultimately"]}
```

## Escribir

### 10. `bluf` — Conclusión primero
Entrena: escritura ejecutiva y el primer párrafo del Writing Task 2 · 3 min
```json
{"tipo":"bluf","borrador":"We have been checking the servers and it seems traffic causes latency so maybe GPUs.","meta":"Primera frase = la decisión."}
```

### 11. `task2` — IELTS Writing Task 2 por piezas
Entrena: ensayo de 250 palabras, un párrafo por sesión · 8–12 min
```json
{"tipo":"task2","pregunta":"Some people think technology makes us less social. To what extent do you agree?","pieza":"introduccion","limite_min":8}
```

### 12. `carta` — Carta de motivación
Entrena: el texto real de la postulación · 10 min
Se ve: un párrafo a la vez (por qué HCI, experiencia, por qué esta universidad, meta), con correcciones.

## Recordar

### 13. `repaso` — Tarjetas FSRS
Entrena: memoria de largo plazo · 3–5 min
Se ve: frente = escena o frase en español; atrás = inglés + pronunciación. Botones: Otra vez / Difícil / Bien / Fácil.

### 14. `banco` — Guardar 3 frases
Entrena: vocabulario propio · 1 min (la opción "Guardar" de baja energía)

## Leer

### 15. `capitulo` — Lectura con 4 movimientos
Entrena: comprensión y criterio · 10–15 min
Scene (la escena en 3 frases) → Steelman (la idea del autor en su mejor versión) → Push back (tu objeción) → Connect (otro libro).
```json
{"tipo":"capitulo","libro":"Ways of Seeing","capitulo":1,"preguntas":{"scene":"What does Berger ask us to look at?","steelman":"What is his strongest claim?","push_back":"Where do you disagree?","connect":"How would Goffman read this?"}}
```

## Cerrar

### 16. `logro` — Una línea
Siempre al final. "Hoy logré…" en inglés. Se guarda y aparece en el tablero de progreso.
