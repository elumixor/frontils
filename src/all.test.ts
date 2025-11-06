import { describe, expect, test } from "bun:test";
import { all } from "./all";

describe("all", () => {
  test("should resolve all promises", async () => {
    const result = await all(Promise.resolve(1), Promise.resolve("a"), Promise.resolve(true));
    expect(result).toEqual([1, "a", true]);
  });

  test("should handle mixed promises and values", async () => {
    const result = await all(1, Promise.resolve("a"), true, Promise.resolve(42));
    expect(result).toEqual([1, "a", true, 42]);
  });

  test("should handle all non-promise values", async () => {
    const result = await all(1, "a", true, { foo: "bar" });
    expect(result).toEqual([1, "a", true, { foo: "bar" }]);
  });

  test("should handle empty arguments", async () => {
    const result = await all();
    expect(result).toEqual([]);
  });

  test("should reject if any promise rejects", async () => {
    const promise = all(Promise.resolve(1), Promise.reject(new Error("test error")), Promise.resolve(3));
    await expect(promise).rejects.toThrow("test error");
  });

  test("should maintain order", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 100));
    const fast = new Promise((resolve) => setTimeout(() => resolve("fast"), 10));
    const result = await all(slow, fast);
    expect(result).toEqual(["slow", "fast"]);
  });

  test("should preserve types", async () => {
    const result = await all(Promise.resolve(42), Promise.resolve("test"), Promise.resolve(true));
    // Type check - this should compile with proper types
    const num: number = result[0];
    const str: string = result[1];
    const bool: boolean = result[2];
    expect(num).toBe(42);
    expect(str).toBe("test");
    expect(bool).toBe(true);
  });
});
