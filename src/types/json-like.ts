export type JSONPrimitive = string | number | boolean | null;
export type JSONLike = JSONPrimitive | { [key: string]: JSONLike } | JSONLike[];
