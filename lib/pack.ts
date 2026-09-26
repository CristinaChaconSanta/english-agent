import raw from "@/content/packs/2026-S39.json";
import { packSchema, type Pack } from "@/lib/schemas/pack";

export const weekPack: Pack = packSchema.parse(raw);
export const todaySession = weekPack.sesiones[0];
