import { describe, expect, test } from "bun:test";
import { random } from "./random";

describe("random", () => {
  test("should return number in [0, 1) when called without arguments", () => {
    for (let i = 0; i < 100; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  test("should return integer in [0, max) when called with one argument", () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const value = random(max);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(max);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  test("should return integer in [min, max) when called with two arguments", () => {
    const min = 5;
    const max = 15;
    for (let i = 0; i < 100; i++) {
      const value = random(min, max);
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThan(max);
      expect(Number.isInteger(value)).toBe(true);
    }
  });
});

describe("random.float", () => {
  test("should return float in [0, max) when called with one argument", () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const value = random.float(max);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(max);
    }
  });

  test("should return float in [min, max) when called with two arguments", () => {
    const min = 5;
    const max = 15;
    for (let i = 0; i < 100; i++) {
      const value = random.float(min, max);
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThan(max);
    }
  });
});

describe("random.string", () => {
  test("should generate string of default length", () => {
    const str = random.string();
    expect(str.length).toBe(10);
  });

  test("should generate string of specified length", () => {
    const length = 20;
    const str = random.string(length);
    expect(str.length).toBe(length);
  });

  test("should only contain alphanumeric characters", () => {
    const str = random.string(100);
    expect(/^[a-zA-Z0-9]+$/.test(str)).toBe(true);
  });

  test("should use custom alphabet", () => {
    const alphabet = "abc";
    const str = random.string(100, alphabet);
    expect(/^[abc]+$/.test(str)).toBe(true);
  });
});

describe("random.char", () => {
  test("should return a single character", () => {
    const c = random.char();
    expect(c.length).toBe(1);
  });

  test("should return alphanumeric character", () => {
    for (let i = 0; i < 100; i++) {
      const c = random.char();
      expect(/^[a-zA-Z0-9]$/.test(c)).toBe(true);
    }
  });
});
