import type { AnyConstructor } from "./types";

export function wraps<TBase extends AnyConstructor>(Base: TBase) {
  return <TBase2 extends AnyConstructor>(Base2: TBase2) => {
    Reflect.defineProperty(Base2, "name", { value: Base.name });
    Reflect.defineProperty(Base2.prototype as object, Symbol.toStringTag, { value: Base.name });
    return Base2;
  };
}
