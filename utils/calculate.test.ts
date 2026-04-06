import { calculate, formatResult } from "@/utils/calculate";

describe("calculate", () => {
  it("evaluates basic arithmetic with precedence", () => {
    expect(calculate("12 + 7 * 3")).toEqual({
      ok: true,
      value: 33,
      formatted: "33",
    });
  });

  it("supports decimals", () => {
    expect(calculate("10.5 / 2")).toEqual({
      ok: true,
      value: 5.25,
      formatted: "5.25",
    });
  });

  it("handles division by zero gracefully", () => {
    expect(calculate("10 / 0")).toEqual({
      ok: false,
      error: "Cannot divide by zero",
    });
  });

  it("rejects incomplete expressions", () => {
    expect(calculate("12 +")).toEqual({
      ok: false,
      error: "Complete the expression before calculating.",
    });
  });

  it("rejects invalid tokens", () => {
    expect(calculate("5 + apples")).toEqual({
      ok: false,
      error: "Invalid expression",
    });
  });
});

describe("formatResult", () => {
  it("formats integers with separators", () => {
    expect(formatResult(1000000)).toBe("1,000,000");
  });

  it("rounds long decimals predictably", () => {
    expect(formatResult(10 / 3)).toBe("3.33333333");
  });
});
