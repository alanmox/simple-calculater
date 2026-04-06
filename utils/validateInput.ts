const OPERATORS = new Set(["+", "-", "*", "/"]);

export function isOperator(value: string) {
  return OPERATORS.has(value);
}

export function getLastToken(expression: string) {
  const tokens = expression.trim().split(/\s+/).filter(Boolean);
  return tokens.at(-1) ?? "";
}

export function canAppendDecimal(expression: string) {
  const lastToken = getLastToken(expression);

  if (!lastToken || isOperator(lastToken)) {
    return true;
  }

  return !lastToken.includes(".");
}

export function canAppendOperator(expression: string, operator: string) {
  const trimmed = expression.trim();

  if (!trimmed || !isOperator(operator)) {
    return false;
  }

  const lastToken = getLastToken(trimmed);
  return Boolean(lastToken) && !isOperator(lastToken) && lastToken !== ".";
}

export function appendNumber(expression: string, value: string) {
  if (!/^\d$/.test(value)) {
    return expression;
  }

  return `${expression}${value}`;
}

export function appendDecimal(expression: string) {
  if (!canAppendDecimal(expression)) {
    return expression;
  }

  const trimmed = expression.trimEnd();

  if (!trimmed || isOperator(getLastToken(trimmed))) {
    return `${trimmed ? `${trimmed} ` : ""}0.`;
  }

  return `${expression}.`;
}

export function appendOperator(expression: string, operator: string) {
  if (!canAppendOperator(expression, operator)) {
    return expression;
  }

  return `${expression.trim()} ${operator} `;
}

export function deleteLastInput(expression: string) {
  const trimmedEnd = expression.trimEnd();

  if (!trimmedEnd) {
    return "";
  }

  if (trimmedEnd.length === 1) {
    return "";
  }

  if (isOperator(trimmedEnd.at(-1) ?? "")) {
    return trimmedEnd.slice(0, -2).trimEnd();
  }

  return trimmedEnd.slice(0, -1);
}

export function normalizeKeyboardKey(key: string) {
  if (key === "x" || key === "X") {
    return "*";
  }

  return key;
}
