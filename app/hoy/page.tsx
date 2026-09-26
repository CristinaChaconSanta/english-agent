import { HoySession } from "@/components/hoy-session";
import { weekPack } from "@/lib/pack";

export default function HoyPage() {
  return <HoySession pack={weekPack} />;
}
