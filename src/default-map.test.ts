import { describe, expect, test } from "bun:test";
import { DefaultMap } from "./default-map";

describe("DefaultMap", () => {
  test("should create default value for missing key", () => {
    const map = new DefaultMap<string, number>(() => 0);
    expect(map.get("missing")).toBe(0);
  });

  test("should return existing value for present key", () => {
    const map = new DefaultMap<string, number>(() => 0);
    map.set("existing", 42);
    expect(map.get("existing")).toBe(42);
  });

  test("should use key-dependent default values", () => {
    const map = new DefaultMap<string, string>((key) => `default-${key}`);
    expect(map.get("foo")).toBe("default-foo");
    expect(map.get("bar")).toBe("default-bar");
  });

  test("should store default value after first access", () => {
    const map = new DefaultMap<string, number[]>(() => []);
    const arr1 = map.get("key");
    arr1.push(1);
    const arr2 = map.get("key");
    expect(arr2).toEqual([1]);
    expect(arr1).toBe(arr2); // Same reference
  });

  test("should work with complex default values", () => {
    const map = new DefaultMap<string, Record<string, unknown>>(() => ({}));
    const obj = map.get("test");
    obj.foo = "bar";
    expect(map.get("test")).toEqual({ foo: "bar" });
  });

  test("should initialize with entries", () => {
    const entries: [string, number][] = [
      ["one", 1],
      ["two", 2],
    ];
    const map = new DefaultMap<string, number>(() => 0, entries);
    expect(map.get("one")).toBe(1);
    expect(map.get("two")).toBe(2);
    expect(map.get("three")).toBe(0);
  });

  test("should respect Map methods", () => {
    const map = new DefaultMap<string, number>(() => 0);
    map.set("a", 1);
    map.set("b", 2);

    expect(map.size).toBe(2);
    expect(map.has("a")).toBe(true);
    expect(map.has("c")).toBe(false);

    map.delete("a");
    expect(map.has("a")).toBe(false);
    expect(map.size).toBe(1);
  });
});
