import { describe, expect, test } from "bun:test";
import { random, randomChar, randomFloat, randomString } from "./random";

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

describe("randomFloat", () => {
  test("should return float in [0, max) when called with one argument", () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const value = randomFloat(max);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(max);
    }
  });

  test("should return float in [min, max) when called with two arguments", () => {
    const min = 5;
    const max = 15;
    for (let i = 0; i < 100; i++) {
      const value = randomFloat(min, max);
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThan(max);
    }
  });
});

describe("randomString", () => {
  test("should generate string of default length", () => {
    const str = randomString();
    expect(str.length).toBe(10);
  });

  test("should generate string of specified length", () => {
    const length = 20;
    const str = randomString(length);
    expect(str.length).toBe(length);
  });

  test("should only contain alphanumeric characters", () => {
    const str = randomString(100);
    expect(/^[a-zA-Z0-9]+$/.test(str)).toBe(true);
  });

  test("should use custom alphabet", () => {
    const alphabet = "abc";
    const str = randomString(100, alphabet);
    expect(/^[abc]+$/.test(str)).toBe(true);
  });
});

describe("randomChar", () => {
  test("should return a single character", () => {
    const char = randomChar();
    expect(char.length).toBe(1);
  });

  test("should return alphanumeric character", () => {
    for (let i = 0; i < 100; i++) {
      const char = randomChar();
      expect(/^[a-zA-Z0-9]$/.test(char)).toBe(true);
    }
  });
});
