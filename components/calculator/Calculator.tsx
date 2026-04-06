"use client";

import { History, MoonStar, RotateCcw, SunMedium } from "lucide-react";
import CalculatorButton from "@/components/calculator/Button";
import Display from "@/components/calculator/Display";
import { useCalculator } from "@/hooks/useCalculator";

const buttonRows = [
  [
    { label: "C", kind: "action" as const, action: "clear" },
    { label: "⌫", kind: "action" as const, action: "delete" },
    { label: "÷", kind: "operator" as const, action: "/" },
    { label: "×", kind: "operator" as const, action: "*" },
  ],
  [
    { label: "7", kind: "number" as const, action: "7" },
    { label: "8", kind: "number" as const, action: "8" },
    { label: "9", kind: "number" as const, action: "9" },
    { label: "-", kind: "operator" as const, action: "-" },
  ],
  [
    { label: "4", kind: "number" as const, action: "4" },
    { label: "5", kind: "number" as const, action: "5" },
    { label: "6", kind: "number" as const, action: "6" },
    { label: "+", kind: "operator" as const, action: "+" },
  ],
  [
    { label: "1", kind: "number" as const, action: "1" },
    { label: "2", kind: "number" as const, action: "2" },
    { label: "3", kind: "number" as const, action: "3" },
    { label: ".", kind: "number" as const, action: "." },
  ],
];

export default function Calculator() {
  const {
    applyHistory,
    clearAll,
    clearHistory,
    copied,
    copyResult,
    deleteLast,
    error,
    evaluate,
    expression,
    history,
    inputDecimal,
    inputDigit,
    inputOperator,
    isReady,
    result,
    theme,
    toggleTheme,
  } = useCalculator();

  function handleAction(action: string) {
    if (/^\d$/.test(action)) {
      inputDigit(action);
      return;
    }

    switch (action) {
      case "clear":
        clearAll();
        break;
      case "delete":
        deleteLast();
        break;
      case ".":
        inputDecimal();
        break;
      case "=":
        evaluate();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        inputOperator(action);
        break;
      default:
        break;
    }
  }

  return (
    <div className="mx-auto grid h-full w-full max-w-5xl items-center gap-4 overflow-hidden lg:grid-cols-[minmax(0,1fr)_300px]">
      <section className="glass-panel relative overflow-hidden rounded-[2rem] border border-[color:var(--card-border)] p-4 shadow-glass sm:p-5">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[color:var(--text-soft)]">
              ALLANMOX CALCULATOR
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--text)] sm:text-2xl">
              Clean calculations, instantly.
            </h1>
          </div>
          <button
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="focus-ring button-press inline-flex items-center gap-2 rounded-full border border-[color:var(--card-border)] bg-white/8 px-4 py-3 text-sm font-medium text-[color:var(--text)] transition hover:bg-white/14"
            onClick={toggleTheme}
            type="button"
          >
            {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <Display
          copied={copied}
          error={error}
          expression={expression}
          onCopy={copyResult}
          result={result}
        />

        <div className="mt-4 grid gap-3">
          {buttonRows.map((row, rowIndex) => (
            <div className="grid grid-cols-4 gap-3" key={rowIndex}>
              {row.map((button) => (
                <CalculatorButton
                  ariaLabel={
                    button.action === "/"
                      ? "Divide"
                      : button.action === "*"
                        ? "Multiply"
                        : button.action === "."
                          ? "Decimal point"
                        : button.label === "⌫"
                            ? "Delete last character"
                            : button.label === "C"
                              ? "Clear all"
                              : button.label
                  }
                  key={button.label}
                  kind={button.kind}
                  label={button.label}
                  onClick={() => handleAction(button.action)}
                />
              ))}
            </div>
          ))}
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <CalculatorButton
              ariaLabel="0"
              kind="number"
              label="0"
              onClick={() => inputDigit("0")}
            />
            <CalculatorButton
              ariaLabel="Calculate result"
              kind="equals"
              label="="
              onClick={evaluate}
            />
          </div>
        </div>
      </section>

      <aside className="glass-panel hidden h-full overflow-hidden rounded-[2rem] border border-[color:var(--card-border)] p-4 shadow-glass lg:block">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[color:var(--text)]">
            <History size={18} />
            <h2 className="text-lg font-semibold">Recent history</h2>
          </div>
          <button
            aria-label="Clear history"
            className="focus-ring button-press inline-flex items-center gap-2 rounded-full border border-[color:var(--card-border)] bg-white/8 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--text)] transition hover:bg-white/12"
            onClick={clearHistory}
            type="button"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto pr-1">
          {!isReady || history.length === 0 ? (
            <p className="rounded-[1.5rem] border border-dashed border-[color:var(--card-border)] bg-white/4 px-4 py-5 text-sm text-[color:var(--text-soft)]">
              Your latest calculations will appear here for quick reuse.
            </p>
          ) : (
            history.map((item, index) => (
              <button
                aria-label={`Reuse expression ${item.expression}`}
                className="focus-ring button-press block w-full rounded-[1.5rem] border border-[color:var(--card-border)] bg-white/6 px-4 py-4 text-left transition hover:bg-white/10"
                key={`${item.expression}-${index}`}
                onClick={() => applyHistory(item)}
                type="button"
              >
                <p className="truncate font-mono text-sm text-[color:var(--text-soft)]">
                  {item.expression}
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--text)]">
                  {item.result}
                </p>
              </button>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
