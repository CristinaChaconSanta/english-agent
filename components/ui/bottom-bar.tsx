"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/hoy", label: "Hoy", dot: "bg-hoy" },
  { href: "/progreso", label: "Progreso", dot: "bg-alerta" },
] as const;

export function BottomBar() {
  const pathname = usePathname();

  return (
    <nav className="bottom-bar fixed inset-x-0 bottom-0 z-20 flex justify-around px-6 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className="flex min-h-12 min-w-24 flex-col items-center gap-1 text-sm">
            <span className={`h-3 w-3 rounded-full ${link.dot} ${active ? "ring-2 ring-white" : ""}`} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
