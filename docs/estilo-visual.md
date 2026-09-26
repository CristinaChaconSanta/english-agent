# Estilo visual — "Pop cartoon"

Referencias de Cristina: ilustración plana con contorno negro grueso, bloques de color saturado,
tipografía gruesa, stickers con etiqueta (#EYE, #BLUE), sombras duras desplazadas (OffLimits, MasterGo),
bordes ondulados (Super Hello). La app tiene que dar ganas de abrirla.

## Base visual (canónica)
La interfaz sigue la **primera maqueta aprobada**: tarjetas crema con borde negro de 3 px y sombra dura,
opciones como botones que se hunden, temporizador en píldora negra, sticker de tema en Permanent Marker,
título gigante en Bricolage Grotesque, divisor ondulado y barra inferior negra con puntos de color.
Los personajes se agregan encima de esa base; no la reemplazan.

## Regla TDAH para el color
**Un color dominante por pantalla.** Cada lección tiene su tema de color (ver "Temas por lección"), y la
pantalla es un bloque de ese fondo (como cada panel de las referencias). Muchos colores saturados a la vez saturan; uno fuerte + negro + blanco energiza.

## Paleta (tokens en Tailwind 4 `@theme`)
| Token | Hex | Uso |
|---|---|---|
| `ink` | `#111111` | contornos, texto, sombras duras |
| `paper` | `#FFF8EC` | fondo de tarjetas |
| `hoy` (amarillo) | `#FFD23F` | módulo Hoy |
| `repaso` (rosa) | `#FF8FC8` | módulo Repaso |
| `ielts` (azul) | `#2F6BFF` | módulo IELTS (texto blanco encima) |
| `biblio` (verde) | `#1FA774` | módulo Biblioteca (texto blanco encima) |
| `coach` (morado) | `#8B4FD8` | Coach / chat (texto blanco encima) |
| `alerta` (rojo) | `#FF4B3E` | racha, fuego, errores graves |
| `celeste` | `#8FD8FF` | fondos secundarios, burbujas |

Texto negro sobre amarillo, rosa, celeste y paper. Texto blanco sobre azul, verde, morado y rojo. Nunca blanco sobre amarillo.

## Tipografía (Google Fonts)
- Títulos: **Bricolage Grotesque** 800, apretada (`tracking-tight`), grande (40–56 px en celular).
- Texto: **DM Sans** 400/600, 17 px mínimo.
- Stickers y etiquetas: **Permanent Marker** (solo etiquetas cortas tipo `#INTO`).

## Componentes
- **Tarjeta:** fondo `paper`, borde 3 px `ink`, esquinas 20 px, sombra dura `6px 6px 0 ink`.
- **Botón principal:** color del módulo, borde 3 px, sombra dura 5 px. Al presionar: se mueve 5 px y la sombra
  desaparece (se siente como un botón físico).
- **Sticker:** fondo blanco, texto en Permanent Marker, rotación −4° a 4°, sombra 3 px. Para etiquetar
  el tema (`#HCI`, `#INTO`, `#PRESENT-PERFECT`).
- **Temporizador:** píldora grande arriba, fondo `ink`, números en blanco, con barra que se vacía.
- **Divisor ondulado** entre secciones (SVG).
- **Stickers decorativos** (del kit neo-brutalista): asteriscos, estallidos, corazones, garabatos en espiral,
  flechas, `#`, `!`, `?`. En el color del módulo, esparcidos con moderación (máx. 3 por pantalla).

## Personajes (el elenco)
Estilo: contorno negro 3 px, **borde blanco de sticker** alrededor de todo el personaje, sombra elíptica
en el piso, ojos grandes que parpadean, colores planos. Se dibujan como **SVG en código** (no imágenes),
para poder animarlos y cambiar su expresión.

| Personaje | Módulo | Forma | Personalidad |
|---|---|---|---|
| **Sunny** | Hoy (amarillo) | estallido/sol con ojos y cachetes rosados | entusiasta, te recibe |
| **Loop** | Repaso (rosa) | flor de 5 pétalos con cara amarilla, ojos grandes con brillo, cachetes rosados y sonrisa abierta | alegre, repite contigo |
| **Flex** | IELTS (azul) | cactus en maceta naranja, brazos arriba, cejas de guerra | entrenador exigente |
| **Page** | Biblioteca (verde) | libro con cinta roja, lengua afuera | curioso, lector |
| **Specs** | Coach (morado) | cabeza morada con gafas redondas naranjas | el profe; en modo noche usa gorro de dormir |

**Ningún personaje tiene cara triste o de sueño en estado normal.** El estado `duerme` solo aparece en modo noche.

Estados de cada personaje: `idle` (flota y parpadea), `hop` (salta al tocarlo), `celebra` (logro),
`piensa` (cargando), `duerme` (racha perdida o modo noche).
**Prohibido:** la casita y la bola que parece perrito. En la dinámica `flecha` el que se mueve es un
personaje del elenco (Sunny por defecto) y el hito es un objeto con estilo sticker (caja, puerta, túnel, muro).

## Temas por lección (para no aburrirse)
El **fondo cambia en cada lección**. `content-pack` asigna `tema_color` a cada sesión y nunca repite
el mismo en dos lecciones seguidas. Los colores de módulo se quedan en la barra inferior y en los personajes.

| Tema | Fondo día | Acento (stickers, resaltados) | Fondo noche |
|---|---|---|---|
| Limonada | `#FFD23F` | `#FF8FC8` | `#2A2208` |
| Chicle | `#FF8FC8` | `#2F6BFF` | `#2B1224` |
| Piscina | `#8FD8FF` | `#FF7A2F` | `#0E2230` |
| Selva | `#4CCB8E` | `#FFD23F` | `#0C2419` |
| Uva | `#B98CF0` | `#FFD23F` | `#1B1230` |
| Tomate | `#FF7A5C` | `#FFF8EC` | `#2A0F0C` |

Texto negro sobre todos los fondos de día. En noche: texto crema `#F3EAD9`, tarjetas `#2B2733`,
contornos crema y **sombra dura en el color de día del tema** (así la lección conserva su identidad de noche).

## Modo noche
Automático después de las 9 p. m. (hora de Bogotá) o según el sistema; interruptor manual siempre visible.

| Token | Día | Noche |
|---|---|---|
| `bg` | fondo día del tema | fondo noche del tema (tabla de arriba) |
| `card` | `#FFF8EC` | `#2B2733` |
| `line` (contornos y texto) | `#111111` | `#F3EAD9` |
| `shadow` (sombra dura) | `#111111` | fondo día del tema |
| texto secundario | `#5A5448` | `#B8AFC6` |
Los personajes no cambian de color (el borde blanco de sticker los hace resaltar en oscuro).
Specs se pone gorro de dormir. En modo noche, sesión sugerida más corta y sin sonidos.

## Movimiento
- Logro guardado: el sticker "cae" y rebota (spring) + confeti corto (≤1 s).
- Respuesta correcta: la tarjeta salta 1 vez. Incorrecta: tiembla 1 vez. Sin sonidos por defecto.
- Respetar `prefers-reduced-motion`: sin animaciones, solo cambio de color.

## Accesibilidad
- Todo botón y opción define su color de texto de forma explícita en día y en noche; nunca hereda el color
  del sistema ni del navegador (en una maqueta, eso dejó el texto crema sobre fondo crema).
- En las pruebas (Playwright + axe) se revisa el contraste de todos los botones en modo día y en modo noche.
- Contraste AA mínimo en todo texto. Áreas táctiles de 48 px. Nada de información solo por color.
