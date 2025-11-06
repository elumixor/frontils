import { describe, expect, test } from "bun:test";
import { delay, delayUntil } from "./delay";

describe("delay", () => {
  test("should delay for specified seconds", async () => {
    const start = Date.now();
    await delay(0.1);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(100);
    expect(elapsed).toBeLessThan(150);
  });
});

describe("delayUntil", () => {
  test("should wait until predicate is true", async () => {
    let flag = false;
    setTimeout(() => {
      flag = true;
    }, 100);

    const start = Date.now();
    await delayUntil(() => flag);
    const elapsed = Date.now() - start;

    expect(flag).toBe(true);
    expect(elapsed).toBeGreaterThanOrEqual(100);
  });

  test("should check predicate at specified interval", async () => {
    let counter = 0;
    const interval = 50;

    setTimeout(() => {
      counter = 5;
    }, 200);

    await delayUntil(() => counter === 5, interval);
    expect(counter).toBe(5);
  });
});
