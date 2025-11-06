/**
 * Map that allows indexing and will create a default value if the key is not found
 * @param defaultValue Function that returns creates a value for the key that is not found
 * @example
 * const map = defaultMap(() => ({} as Record<string, unknown>));
 *
 * console.log(map.a.b); // undefined, does not throw an error, `m.a` is created dynamically
 * console.log(map.a); // {}, it was created by the previous call
 */
export class DefaultMap<K, V> extends Map<K, V> {
  constructor(
    protected readonly defaultValue: (key: K) => V,
    entries?: readonly (readonly [K, V])[] | null,
  ) {
    super(entries);
  }

  override get(key: K): V {
    if (!this.has(key)) {
      this.set(key, this.defaultValue(key));
    }
    return super.get(key) as V;
  }
}
