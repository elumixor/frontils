export const __dummy = {};

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Set<T> {
        /**
         * Returns a first element of an array
         */
        get first(): T;
        get isEmpty(): boolean;
        /**
         * True if the array is not empty
         */
        get nonEmpty(): boolean;
    }
}

Reflect.defineProperty(Set.prototype, "first", {
    get(this: Set<unknown>) {
        const [first] = this;
        return first;
    },
    configurable: true,
});

Reflect.defineProperty(Set.prototype, "isEmpty", {
    get(this: Set<unknown>) {
        return this.size === 0;
    },
    configurable: true,
});

Reflect.defineProperty(Set.prototype, "nonEmpty", {
    get(this: Set<unknown>) {
        return this.size > 0;
    },
    configurable: true,
});
