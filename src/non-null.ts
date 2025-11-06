export function nonNull<T>(value: T | undefined | null): T {
  nonNullAssert(value);
  return value;
}

export function nonNullAssert<T>(value: T | undefined | null): asserts value is T {
  if (value === null || value === undefined) throw new Error("Unexpected null value");
}
