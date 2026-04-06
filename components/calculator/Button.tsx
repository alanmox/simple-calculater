"use client";

import { memo } from "react";
import clsx from "clsx";

export type CalculatorButtonKind = "number" | "operator" | "action" | "equals";

type CalculatorButtonProps = {
  ariaLabel: string;
  className?: string;
  kind: CalculatorButtonKind;
  label: string;
  onClick: () => void;
};

const kindStyles: Record<CalculatorButtonKind, string> = {
  number:
    "bg-white/10 text-[color:var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/16",
  operator:
    "bg-accent-500/90 text-white shadow-[0_10px_30px_rgba(26,156,255,0.25)] hover:bg-accent-400",
  action:
    "bg-[color:var(--glass-strong)] text-[color:var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/16",
  equals:
    "bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950 shadow-[0_12px_32px_rgba(45,212,191,0.35)] hover:brightness-105",
};

function CalculatorButton({
  ariaLabel,
  className,
  kind,
  label,
  onClick,
}: CalculatorButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={clsx(
        "focus-ring button-press flex min-h-16 items-center justify-center rounded-[1.35rem] border border-[color:var(--card-border)] px-3 text-xl font-medium transition duration-200 ease-out hover:-translate-y-0.5 sm:min-h-[4.5rem]",
        kindStyles[kind],
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true">{label}</span>
    </button>
  );
}

export default memo(CalculatorButton);
