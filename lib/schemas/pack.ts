import { z } from "zod";

export const TEMA_COLOR = {
  LIMONADA: "limonada",
  CHICLE: "chicle",
  PISCINA: "piscina",
  SELVA: "selva",
  UVA: "uva",
  TOMATE: "tomate",
} as const;

export const temaColorSchema = z.enum([
  TEMA_COLOR.LIMONADA,
  TEMA_COLOR.CHICLE,
  TEMA_COLOR.PISCINA,
  TEMA_COLOR.SELVA,
  TEMA_COLOR.UVA,
  TEMA_COLOR.TOMATE,
]);

export type TemaColor = z.infer<typeof temaColorSchema>;

const fraseSchema = z.object({
  en: z.string().min(1),
  es: z.string().min(1),
  pronunciacion: z.string().min(1),
  contexto: z.string().min(1),
});

const ejemploSchema = z.object({
  en: z.string().min(1),
  es: z.string().min(1),
  pronunciacion: z.string().min(1),
  contexto: z.string().min(1),
});

const palabraSchema = z.object({
  palabra: z.string().min(1),
  ejemplos: z.array(ejemploSchema).length(7),
});

const FLECHA_VERBO = ["jump", "run", "float"] as const;
const FLECHA_DIRECCION = ["into", "out of", "over"] as const;

const flechaMisionSchema = z.object({
  es: z.string().min(1),
  verbo: z.enum(FLECHA_VERBO),
  flecha: z.enum(FLECHA_DIRECCION),
  en: z.string().min(1),
});

const flechaSchema = z.object({
  tipo: z.literal("flecha"),
  personaje: z.literal("sunny"),
  hito: z.string().min(1),
  misiones: z.array(flechaMisionSchema).length(3),
  mente: z
    .array(z.object({ frase: z.string().min(1), es: z.string().min(1) }))
    .min(1),
});

const escenaSchema = z.object({
  tipo: z.literal("escena"),
  imagen: z.string().min(1),
  pista: z.string().min(1),
  modelo: z.array(z.string().min(1)).min(1),
});

const lineaTiempoSchema = z.object({
  tipo: z.literal("linea-tiempo"),
  frase: z.string().min(1),
  respuesta: z.enum(["foto", "gif", "puente"]),
  por_que: z.string().min(1),
});

const upgradeSchema = z.object({
  tipo: z.literal("upgrade"),
  b1: z.string().min(1),
  opciones: z.array(z.string().min(1)).length(3),
  correcta: z.number().int().min(0).max(2),
});

const falsoAmigoSchema = z.object({
  tipo: z.literal("falso-amigo"),
  palabra: z.string().min(1),
  parece: z.string().min(1),
  significa: z.string().min(1),
  ejemplo: z.string().min(1),
});

const huecosSchema = z.object({
  tipo: z.literal("huecos"),
  texto: z.string().min(1),
  fichas: z.array(z.string().min(1)).min(2),
  respuesta: z.array(z.string().min(1)).min(1),
});

const sombraSchema = z.object({
  tipo: z.literal("sombra"),
  texto: z.string().min(1),
  pronunciacion: z.string().min(1),
  fuente: z.string().min(1),
});

const cueCardSchema = z.object({
  tipo: z.literal("cue-card"),
  tema: z.string().min(1),
  puntos: z.array(z.string().min(1)).min(1),
});

const debateSchema = z.object({
  tipo: z.literal("debate-60"),
  pregunta: z.string().min(1),
  libro: z.string().min(1),
  conectores: z.array(z.string().min(1)).min(1),
});

const blufSchema = z.object({
  tipo: z.literal("bluf"),
  borrador: z.string().min(1),
  meta: z.string().min(1),
});

const task2Schema = z.object({
  tipo: z.literal("task2"),
  pregunta: z.string().min(1),
  pieza: z.string().min(1),
  limite_min: z.number().int().positive(),
});

const cartaSchema = z.object({
  tipo: z.literal("carta"),
  parrafo: z.string().min(1),
  pista: z.string().min(1),
});

const repasoCartaSchema = z.object({
  frente: z.string().min(1),
  atras: z.string().min(1),
  pronunciacion: z.string().min(1),
});

const repasoSchema = z.object({
  tipo: z.literal("repaso"),
  cartas: z.array(repasoCartaSchema).min(1),
});

const bancoSchema = z.object({
  tipo: z.literal("banco"),
  meta: z.string().min(1),
});

const capituloSchema = z.object({
  tipo: z.literal("capitulo"),
  libro: z.string().min(1),
  capitulo: z.number().int().positive(),
  preguntas: z.object({
    scene: z.string().min(1),
    steelman: z.string().min(1),
    push_back: z.string().min(1),
    connect: z.string().min(1),
  }),
});

const logroSchema = z.object({
  tipo: z.literal("logro"),
  pista: z.string().min(1),
});

export const dinamicaSchema = z.discriminatedUnion("tipo", [
  flechaSchema,
  escenaSchema,
  lineaTiempoSchema,
  upgradeSchema,
  falsoAmigoSchema,
  huecosSchema,
  sombraSchema,
  cueCardSchema,
  debateSchema,
  blufSchema,
  task2Schema,
  cartaSchema,
  repasoSchema,
  bancoSchema,
  capituloSchema,
  logroSchema,
]);

export type Dinamica = z.infer<typeof dinamicaSchema>;

export const sesionSchema = z
  .object({
    tema_color: temaColorSchema,
    dinamicas: z.array(dinamicaSchema).min(1),
  })
  .superRefine((sesion, ctx) => {
    for (let index = 1; index < sesion.dinamicas.length; index += 1) {
      const previous = sesion.dinamicas[index - 1];
      const current = sesion.dinamicas[index];
      if (previous && current && previous.tipo === current.tipo) {
        ctx.addIssue({
          code: "custom",
          path: ["dinamicas", index, "tipo"],
          message: "No se repite el mismo tipo dos veces seguidas.",
        });
      }
    }
  });

export type Sesion = z.infer<typeof sesionSchema>;

export const packSchema = z
  .object({
    semana: z.string().regex(/^\d{4}-S\d{2}$/),
    foco_gramatical: z.string().min(1),
    tema_cultural: z.string().min(1),
    frases: z.array(fraseSchema).optional(),
    palabras: z.array(palabraSchema).optional(),
    sesiones: z.array(sesionSchema).min(1),
  })
  .superRefine((pack, ctx) => {
    for (let index = 1; index < pack.sesiones.length; index += 1) {
      const previous = pack.sesiones[index - 1];
      const current = pack.sesiones[index];
      if (previous && current && previous.tema_color === current.tema_color) {
        ctx.addIssue({
          code: "custom",
          path: ["sesiones", index, "tema_color"],
          message: "tema_color no se repite en dos lecciones seguidas.",
        });
      }
    }
  });

export type Pack = z.infer<typeof packSchema>;
