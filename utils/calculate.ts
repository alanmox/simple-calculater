import { isOperator } from "@/utils/validateInput";

const precedence: Record<string, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

export type CalculationResult =
  | { ok: true; value: number; formatted: string }
  | { ok: false; error: string };

function tokenize(expression: string) {
  return expression.trim().split(/\s+/).filter(Boolean);
}

function toRpn(tokens: string[]) {
  const output: string[] = [];
  const operators: string[] = [];

  for (const token of tokens) {
    if (isOperator(token)) {
      while (
        operators.length > 0 &&
        precedence[operators.at(-1) ?? ""] >= precedence[token]
      ) {
        output.push(operators.pop() as string);
      }
      operators.push(token);
      continue;
    }

    if (!/^(\d+(\.\d+)?|\.\d+)$/.test(token)) {
      throw new Error("Invalid expression");
    }

    output.push(token);
  }

  while (operators.length > 0) {
    output.push(operators.pop() as string);
  }

  return output;
}

function evaluateRpn(tokens: string[]) {
  const stack: number[] = [];

  for (const token of tokens) {
    if (!isOperator(token)) {
      stack.push(Number(token));
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();

    if (left === undefined || right === undefined) {
      throw new Error("Invalid expression");
    }

    if (token === "/" && right === 0) {
      throw new Error("Cannot divide by zero");
    }

    switch (token) {
      case "+":
        stack.push(left + right);
        break;
      case "-":
        stack.push(left - right);
        break;
      case "*":
        stack.push(left * right);
        break;
      case "/":
        stack.push(left / right);
        break;
      default:
        throw new Error("Invalid expression");
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack[0];
}

export function formatResult(value: number) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  if (Number.isInteger(value)) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(Number(value.toFixed(8)));
}

export function calculate(expression: string): CalculationResult {
  const trimmed = expression.trim();

  if (!trimmed) {
    return { ok: true, value: 0, formatted: "0" };
  }

  const tokens = tokenize(trimmed);
  const lastToken = tokens.at(-1);

  if (!lastToken || isOperator(lastToken)) {
    return { ok: false, error: "Complete the expression before calculating." };
  }

  try {
    const value = evaluateRpn(toRpn(tokens));
    return {
      ok: true,
      value,
      formatted: formatResult(value),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Something went wrong while calculating.",
    };
  }
}
