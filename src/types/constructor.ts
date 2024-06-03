/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyConstructor<T extends object = object, TArgs extends any[] = any[]> =
    | AbstractConstructor<T, TArgs>
    | Constructor<T, TArgs>;

export type Constructor<T extends object = object, TArgs extends any[] = any[]> = new (...params: TArgs) => T;

export type AbstractConstructor<T extends object = object, TArgs extends any[] = any[]> = abstract new (
    ...params: TArgs
) => T;
