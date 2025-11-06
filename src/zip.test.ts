import { describe, expect, test } from "bun:test";
import { zip } from "./zip";

describe("zip", () => {
  test("should zip two arrays of equal length", () => {
    const result = [...zip([1, 2, 3], ["a", "b", "c"])];
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  test("should zip three arrays", () => {
    const result = [...zip([1, 2], ["a", "b"], [true, false])];
    expect(result).toEqual([
      [1, "a", true],
      [2, "b", false],
    ]);
  });

  test("should stop at shortest array length", () => {
    const result = [...zip([1, 2, 3, 4], ["a", "b"])];
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  test("should handle single array", () => {
    const result = [...zip([1, 2, 3])];
    expect(result).toEqual([[1], [2], [3]]);
  });

  test("should return empty for empty arrays", () => {
    const result = [...zip([], [])];
    expect(result).toEqual([]);
  });

  test("should return empty when no arguments", () => {
    const result = [...zip()];
    expect(result).toEqual([]);
  });

  test("should work with different iterable types", () => {
    const set = new Set([1, 2, 3]);
    const result = [...zip(set, ["a", "b", "c"])];
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  test("should work with strings", () => {
    const result = [...zip("abc", [1, 2, 3])];
    expect(result).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });
});
