---
name: verify-links
description: Verifica que cada URL del contenido abra de verdad y elimina o reemplaza las rotas. Usar después de content-pack, cuando se agreguen fuentes, o en la revisión semanal de enlaces.
---

# verify-links

## Pasos
1. Extrae todas las URLs del archivo o carpeta indicada (por defecto `content/`).
2. Para cada una ejecuta `scripts/verify-links.ts` (crear si no existe):
   - `GET` con redirecciones, timeout de 10 s, user-agent de navegador normal.
   - Válida si responde 200–299 y el contenido no es una página de "not found", "404" ni una página vacía.
   - 403 o 429: reintenta una vez a los 5 s; si sigue fallando, márcala como `dudosa`, no como rota.
3. Rota → búscale reemplazo con búsqueda web (misma fuente o una equivalente confiable).
   Si no hay reemplazo verificado, elimina la URL y el texto que dependa de ella.
4. Escribe `content/links-report.json`: `{url, estado, reemplazo?, fecha}`.
5. Nunca inventes una URL para reemplazar otra.
