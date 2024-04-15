import { all } from "./all";
import type { Awaitable } from "./types";

export type GetEventData<T extends EventEmitter<unknown>> = T extends EventEmitter<infer U> ? U : never;

export class EventEmitter<TEventData = void> {
    protected readonly callbacks = new Array<(arg: TEventData) => void>();

    /** Returns a promise that is resolved once the event is emitted. */
    get nextEvent(): PromiseLike<TEventData> {
        return new Promise((resolve) => this.subscribeOnce(resolve));
    }

    /** Subscribes the callback to the event. */
    subscribe(callback: (eventData: TEventData) => void): ISubscription<TEventData> {
        this.callbacks.push(callback);

        return {
            unsubscribe: () => this.unsubscribe(callback),
            callback,
        };
    }

    /** Emits the event. */
    emit(eventData: TEventData) {
        // Some subscribers may want to unsubscribe after the event
        // This leads to modification of `this.callbacks`
        // To avoid problems, we should iterate on the copy
        for (const callback of [...this.callbacks]) callback(eventData);
    }

    /** Unsubscribes the callback from the event. */
    unsubscribe(callback: (eventData: TEventData) => void) {
        this.callbacks.remove(callback);
    }

    /** Calls `unsubscribe()` immediately after the callback is invoked. */
    subscribeOnce(callback: (eventData: TEventData) => void): ISubscription<TEventData> {
        const wrappedCallback = (eventData: TEventData) => {
            callback(eventData);
            this.unsubscribe(wrappedCallback);
        };

        return this.subscribe(wrappedCallback);
    }

    pipe(): EventEmitter<TEventData>;
    pipe<TOut>(callback: (eventData: TEventData) => TOut): EventEmitter<TOut>;
    pipe(callback?: (eventData: TEventData) => unknown) {
        if (!callback) {
            const eventEmitter = new EventEmitter<TEventData>();
            this.subscribe((eventData) => eventEmitter.emit(eventData));
            return eventEmitter;
        }

        const eventEmitter = new EventEmitter<unknown>();
        this.subscribe((eventData) => eventEmitter.emit(callback(eventData)));
        return eventEmitter;
    }
}

export class AsyncEventEmitter<TEventData = void> {
    protected readonly callbacks = new Array<(arg: TEventData) => Awaitable>();

    constructor(protected readonly strategy: "sequential" | "parallel" = "sequential") {}

    /** Returns a promise that is resolved once the event is emitted. */
    get nextEvent(): PromiseLike<TEventData> {
        return new Promise((resolve) => this.subscribeOnce(resolve));
    }

    /** Subscribes the callback to the event. */
    subscribe(callback: (eventData: TEventData) => Awaitable): ISubscription<TEventData, Awaitable> {
        this.callbacks.push(callback);

        return {
            unsubscribe: () => this.unsubscribe(callback),
            callback,
        };
    }

    /** Emits the event. */
    async emit(eventData: TEventData) {
        const callbacks = [...this.callbacks];
        if (this.strategy === "sequential") for (const callback of callbacks) await callback(eventData);
        else await all(callbacks.map((callback) => callback(eventData)));
    }

    /** Unsubscribes the callback from the event. */
    unsubscribe(callback: (eventData: TEventData) => Awaitable) {
        this.callbacks.remove(callback);
    }

    /** Calls `unsubscribe()` immediately after the callback is invoked. */
    subscribeOnce(callback: (eventData: TEventData) => Awaitable): ISubscription<TEventData, Awaitable> {
        const wrappedCallback = async (eventData: TEventData) => {
            await callback(eventData);
            this.unsubscribe(wrappedCallback);
        };

        return this.subscribe(wrappedCallback);
    }

    pipe(): AsyncEventEmitter<TEventData>;
    pipe<TOut>(callback: (eventData: TEventData) => TOut): AsyncEventEmitter<TOut>;
    pipe(callback?: (eventData: TEventData) => unknown) {
        if (!callback) {
            const eventEmitter = new AsyncEventEmitter<TEventData>();
            this.subscribe((eventData) => eventEmitter.emit(eventData));
            return eventEmitter;
        }

        const eventEmitter = new AsyncEventEmitter<unknown>();
        this.subscribe((eventData) => eventEmitter.emit(callback(eventData)));
        return eventEmitter;
    }
}

export interface ISubscription<TEventData = void, TResult = void> {
    callback: (eventData: TEventData) => TResult;
    unsubscribe(): void;
}
