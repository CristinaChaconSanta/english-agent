---
name: change-request
description: Implementa las solicitudes de cambio que Cristina deja desde la app (issues de GitHub con la etiqueta "cambio"). Usar en la automatización diaria o cuando se pida "revisar solicitudes".
---

# change-request

## Pasos
1. Lista los issues abiertos con la etiqueta `cambio` (`gh issue list --label cambio --state open`).
2. Por cada issue, del más antiguo al más nuevo:
   a. Clasifícalo: `contenido`, `ux-ui`, `bug` o `funcionalidad`.
   b. Si no está claro qué pide, comenta en el issue **una** pregunta concreta, ponle la etiqueta
      `necesita-respuesta` y pasa al siguiente. No adivines.
   c. Crea una rama `cambio/<numero>-<slug>` e implementa el cambio siguiendo `AGENTS.md`
      (reglas de contenido y de UX para TDAH).
   d. Corre `npm run lint`, `npm run typecheck` y los tests de Playwright relacionados.
   e. Abre un PR que cierre el issue, con un resumen de 3 líneas en español:
      qué pidió · qué cambió · cómo probarlo en el celular.
3. Nunca hagas merge. Cristina aprueba cada PR.
4. Máximo 5 issues por ejecución, para que los PR se puedan revisar.
