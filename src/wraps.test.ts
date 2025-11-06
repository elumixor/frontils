import { describe, expect, test } from "bun:test";
import { wraps } from "./wraps";

describe("wraps", () => {
  test("should preserve the base class name", () => {
    class Base {
      method() {
        return "base";
      }
    }

    class Derived extends Base {
      override method() {
        return "derived";
      }
    }

    const Wrapped = wraps(Base)(Derived);
    expect(Wrapped.name).toBe("Base");
  });

  test("should set Symbol.toStringTag to base class name", () => {
    class Base {
      value = 1;
    }

    class Derived extends Base {
      value = 2;
    }

    const Wrapped = wraps(Base)(Derived);
    const instance = new Wrapped();
    expect(Object.prototype.toString.call(instance)).toBe("[object Base]");
  });

  test("should maintain class functionality", () => {
    class Base {
      getValue() {
        return "base";
      }
    }

    class Derived extends Base {
      override getValue() {
        return "derived";
      }
    }

    const Wrapped = wraps(Base)(Derived);
    const instance = new Wrapped();
    expect(instance.getValue()).toBe("derived");
  });

  test("should work with constructor parameters", () => {
    class Base {
      value: number;
      constructor(value: number) {
        this.value = value;
      }
    }

    class Derived extends Base {
      constructor(value: number) {
        super(value * 2);
      }
    }

    const Wrapped = wraps(Base)(Derived);
    const instance = new Wrapped(5);
    expect(instance.value).toBe(10);
    expect(Wrapped.name).toBe("Base");
  });

  test("should work with abstract classes", () => {
    abstract class Base {
      abstract getValue(): string;
    }

    class Derived extends Base {
      getValue() {
        return "derived";
      }
    }

    const Wrapped = wraps(Base)(Derived);
    expect(Wrapped.name).toBe("Base");
    const instance = new Wrapped();
    expect(instance.getValue()).toBe("derived");
  });
});
