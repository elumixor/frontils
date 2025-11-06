import { describe, expect, test } from "bun:test";
import { nonNull, nonNullAssert } from "./non-null";

describe("nonNull", () => {
  test("should return value when not null or undefined", () => {
    expect(nonNull(5)).toBe(5);
    expect(nonNull("test")).toBe("test");
    expect(nonNull(true)).toBe(true);
    expect(nonNull(false)).toBe(false);
    expect(nonNull(0)).toBe(0);
    expect(nonNull("")).toBe("");
    expect(nonNull([])).toEqual([]);
    expect(nonNull({})).toEqual({});
  });

  test("should throw when value is null", () => {
    expect(() => nonNull(null)).toThrow("Unexpected null value");
  });

  test("should throw when value is undefined", () => {
    expect(() => nonNull(undefined)).toThrow("Unexpected null value");
  });
});

describe("nonNullAssert", () => {
  test("should not throw for non-null values", () => {
    expect(() => nonNullAssert(5)).not.toThrow();
    expect(() => nonNullAssert("test")).not.toThrow();
    expect(() => nonNullAssert(false)).not.toThrow();
    expect(() => nonNullAssert(0)).not.toThrow();
  });

  test("should throw when value is null", () => {
    expect(() => nonNullAssert(null)).toThrow("Unexpected null value");
  });

  test("should throw when value is undefined", () => {
    expect(() => nonNullAssert(undefined)).toThrow("Unexpected null value");
  });

  test("should narrow types correctly", () => {
    const value: string | null = "test";
    nonNullAssert(value);
    // Type should be narrowed to string here
    const length: number = value.length;
    expect(length).toBe(4);
  });
});
