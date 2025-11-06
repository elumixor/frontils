export type ArrayElement<T> = T extends (infer U)[] ? U : never;

export type Awaitable<T = void, P extends PromiseLike<T> = PromiseLike<T>> = T | P;

export type Unpromisify<T> = T extends PromiseLike<infer U>
  ? U
  : T extends (...args: infer R) => PromiseLike<infer U>
    ? (...args: R) => U
    : never;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyConstructor<T extends object = object, TArgs extends any[] = any[]> =
  | AbstractConstructor<T, TArgs>
  | Constructor<T, TArgs>;

export type Constructor<T extends object = object, TArgs extends any[] = any[]> = new (...params: TArgs) => T;

export type AbstractConstructor<T extends object = object, TArgs extends any[] = any[]> = abstract new (
  ...params: TArgs
) => T;

/* eslint-enable @typescript-eslint/no-explicit-any */
export type JSONPrimitive = string | number | boolean | null;
export type JSONLike = JSONPrimitive | { [key: string]: JSONLike } | JSONLike[];

export type KeyForValue<T, V> = Exclude<{ [K in keyof T]: T[K] extends V ? K : never }[keyof T], undefined>;
