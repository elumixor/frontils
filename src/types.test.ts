import { describe, expect, test } from "bun:test";
import type {
  AbstractConstructor,
  AnyConstructor,
  ArrayElement,
  Awaitable,
  Constructor,
  JSONLike,
  KeyForValue,
  Unpromisify,
} from "./types";

describe("Type utilities", () => {
  describe("ArrayElement", () => {
    test("should extract element type from array", () => {
      type StringArray = string[];
      type Element = ArrayElement<StringArray>;

      // Runtime verification
      const arr: StringArray = ["a", "b", "c"];
      const element: Element = arr[0];
      expect(element).toBe("a");
    });

    test("should work with tuple types", () => {
      type Tuple = [string, number, boolean];
      type Element = ArrayElement<Tuple>;

      const tuple: Tuple = ["test", 42, true];
      const element: Element = tuple[0];
      expect(typeof element).toBe("string");
    });
  });

  describe("Awaitable", () => {
    test("should accept both values and promises", async () => {
      const value: Awaitable<number> = 42;
      const promise: Awaitable<number> = Promise.resolve(42);

      expect(value).toBe(42);
      expect(await promise).toBe(42);
    });
  });

  describe("Unpromisify", () => {
    test("should extract type from Promise", async () => {
      type PromiseNumber = Promise<number>;
      type Unwrapped = Unpromisify<PromiseNumber>;

      const value: Unwrapped = 42;
      expect(value).toBe(42);
    });
  });

  describe("Constructor types", () => {
    test("Constructor should work with classes", () => {
      class TestClass {
        value: number;
        constructor(value: number) {
          this.value = value;
        }
      }

      const ctor: Constructor<TestClass, [number]> = TestClass;
      const instance = new ctor(42);
      expect(instance.value).toBe(42);
    });

    test("AbstractConstructor should work with abstract classes", () => {
      abstract class AbstractTest {
        abstract getValue(): string;
      }

      class ConcreteTest extends AbstractTest {
        getValue() {
          return "test";
        }
      }

      // Type check
      const _ctor: AbstractConstructor<AbstractTest> = AbstractTest;
      const concrete: Constructor<ConcreteTest> = ConcreteTest;
      const instance = new concrete();
      expect(instance.getValue()).toBe("test");
    });

    test("AnyConstructor should accept both regular and abstract constructors", () => {
      class RegularClass {}
      abstract class AbstractClass {}

      const regular: AnyConstructor = RegularClass;
      const abstract: AnyConstructor = AbstractClass;

      expect(regular).toBe(RegularClass);
      expect(abstract).toBe(AbstractClass);
    });
  });

  describe("JSONLike", () => {
    test("should accept primitive JSON values", () => {
      const str: JSONLike = "test";
      const num: JSONLike = 42;
      const bool: JSONLike = true;
      const nil: JSONLike = null;

      expect(str).toBe("test");
      expect(num).toBe(42);
      expect(bool).toBe(true);
      expect(nil).toBe(null);
    });

    test("should accept JSON objects", () => {
      const obj: JSONLike = { name: "test", value: 42, nested: { foo: "bar" } };
      expect(obj).toEqual({ name: "test", value: 42, nested: { foo: "bar" } });
    });

    test("should accept JSON arrays", () => {
      const arr: JSONLike = [1, "two", true, null, { key: "value" }];
      expect(arr).toEqual([1, "two", true, null, { key: "value" }]);
    });
  });

  describe("KeyForValue", () => {
    test("should extract keys for matching value type", () => {
      interface TestObj {
        name: string;
        age: number;
        active: boolean;
        count: number;
      }

      type NumberKeys = KeyForValue<TestObj, number>;
      // NumberKeys should be "age" | "count"

      const key1: NumberKeys = "age";
      const key2: NumberKeys = "count";

      expect(key1).toBe("age");
      expect(key2).toBe("count");
    });

    test("should work with runtime object", () => {
      const obj = { a: 1, b: "two", c: 3, d: "four" };
      type StringKeys = KeyForValue<typeof obj, string>;

      const key: StringKeys = "b";
      expect(obj[key]).toBe("two");
    });
  });
});
