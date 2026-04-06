"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { calculate } from "@/utils/calculate";
import {
  appendDecimal,
  appendNumber,
  appendOperator,
  deleteLastInput,
  normalizeKeyboardKey,
} from "@/utils/validateInput";

type HistoryItem = {
  expression: string;
  result: string;
};

const HISTORY_STORAGE_KEY = "lumen-calc-history";
const THEME_STORAGE_KEY = "lumen-calc-theme";

function readLocalStorage<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() =>
    readLocalStorage<HistoryItem[]>(HISTORY_STORAGE_KEY, []),
  );
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    readLocalStorage<"dark" | "light">(THEME_STORAGE_KEY, "dark"),
  );
  const [copied, setCopied] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function playTone() {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const AudioConstructor = window.AudioContext;
      if (!AudioConstructor) {
        return;
      }

      const context = audioContextRef.current ?? new AudioConstructor();
      audioContextRef.current = context;

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.value = 520;
      gain.gain.value = 0.02;

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.05);
    } catch {
      // Audio feedback is optional; ignore browser restrictions.
    }
  }

  function pushHistory(nextExpression: string, nextResult: string) {
    setHistory((current) => [
      { expression: nextExpression, result: nextResult },
      ...current,
    ].slice(0, 10));
  }

  function updateExpression(nextExpression: string) {
    setExpression(nextExpression);
    setError(null);
  }

  function inputDigit(value: string) {
    playTone();
    updateExpression(appendNumber(expression, value));
  }

  function inputDecimal() {
    playTone();
    updateExpression(appendDecimal(expression));
  }

  function inputOperator(operator: string) {
    playTone();
    updateExpression(appendOperator(expression, operator));
  }

  function clearAll() {
    playTone();
    setExpression("");
    setResult("0");
    setError(null);
  }

  function deleteLast() {
    playTone();
    updateExpression(deleteLastInput(expression));
  }

  function evaluate() {
    playTone();
    const calculation = calculate(expression);

    if (!calculation.ok) {
      setError(calculation.error);
      return;
    }

    setResult(calculation.formatted);
    setError(null);

    if (expression.trim()) {
      pushHistory(expression.trim(), calculation.formatted);
    }
  }

  function applyHistory(item: HistoryItem) {
    updateExpression(item.expression);
    setResult(item.result);
    setError(null);
  }

  function clearHistory() {
    setHistory([]);
  }

  async function copyResult() {
    if (typeof navigator === "undefined" || !result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const key = normalizeKeyboardKey(event.key);

    if (/^\d$/.test(key)) {
      event.preventDefault();
      inputDigit(key);
      return;
    }

    if (key === ".") {
      event.preventDefault();
      inputDecimal();
      return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
      event.preventDefault();
      inputOperator(key);
      return;
    }

    if (key === "Enter" || key === "=") {
      event.preventDefault();
      evaluate();
      return;
    }

    if (key === "Backspace") {
      event.preventDefault();
      deleteLast();
      return;
    }

    if (key === "Escape") {
      event.preventDefault();
      clearAll();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return {
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
    result,
    theme,
    toggleTheme,
  };
}
