"use client";

import { memo } from "react";
import { Copy, CopyCheck } from "lucide-react";

type DisplayProps = {
  copied: boolean;
  error: string | null;
  expression: string;
  onCopy: () => void;
  result: string;
};

function Display({
  copied,
  error,
  expression,
  onCopy,
  result,
}: DisplayProps) {
  return (
    <section
      aria-label="Calculator display"
      className="glass-panel fade-in relative overflow-hidden rounded-[2rem] border border-[color:var(--card-border)] p-5 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-[color:var(--text-soft)]">
            Current expression
          </p>
          <div
            className="min-h-16 break-all text-right font-mono text-lg text-[color:var(--text-soft)] sm:text-xl"
            role="status"
          >
            {expression || "0"}
          </div>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[color:var(--text-soft)]">
                Result
              </p>
              <output
                aria-live="polite"
                className="mt-2 block break-all text-right text-4xl font-semibold tracking-tight text-[color:var(--text)] sm:text-5xl"
              >
                {error ?? result}
              </output>
            </div>
            <button
              aria-label={copied ? "Result copied" : "Copy result"}
              className="focus-ring button-press flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--card-border)] bg-white/8 text-[color:var(--text)] transition hover:bg-white/14"
              onClick={onCopy}
              type="button"
            >
              {copied ? <CopyCheck size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>
      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </p>
      ) : null}
    </section>
  );
}

export default memo(Display);
