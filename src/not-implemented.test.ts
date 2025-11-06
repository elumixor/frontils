import { describe, expect, test } from "bun:test";
import { notImplemented } from "./not-implemented";

describe("notImplemented", () => {
  test("should throw with 'Not implemented' message", () => {
    expect(() => notImplemented()).toThrow("Not implemented");
  });

  test("should have never return type", () => {
    // This test verifies the function throws and never returns
    let executed = false;
    try {
      notImplemented();
      executed = true;
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Not implemented");
    }
    expect(executed).toBe(false);
  });
});
