import { describe, expect, test } from "bun:test";
import { assert } from "./assert";

describe("assert", () => {
  test("should not throw when condition is truthy", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
    expect(() => assert("test")).not.toThrow();
    expect(() => assert({})).not.toThrow();
  });

  test("should throw when condition is falsy", () => {
    expect(() => assert(false)).toThrow();
    expect(() => assert(0)).toThrow();
    expect(() => assert("")).toThrow();
    expect(() => assert(null)).toThrow();
    expect(() => assert(undefined)).toThrow();
  });

  test("should throw with custom reason", () => {
    expect(() => assert(false, "Custom error message")).toThrow("Custom error message");
  });

  test("should narrow types correctly", () => {
    const value: string | null = "test";
    assert(value);
    // Type should be narrowed to string here
    const length: number = value.length;
    expect(length).toBe(4);
  });
});
