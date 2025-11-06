/** Throws if condition is falsy */
export function assert<T>(condition: T, reason?: string): asserts condition {
  if (!condition) throw new Error(reason);
}
