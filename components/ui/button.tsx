import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "hoy" | "paper" | "accent";
}

const TONE: Record<NonNullable<ButtonProps["tone"]>, string> = {
  hoy: "bg-hoy text-ink",
  paper: "bg-paper text-ink",
  accent: "text-ink",
};

export function Button({ tone = "hoy", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("btn w-full px-4 text-[17px]", TONE[tone], className)}
      style={tone === "accent" ? { background: "var(--lesson-accent)" } : undefined}
      {...props}
    />
  );
}
