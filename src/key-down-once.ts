const set = new Set();
const setSecond = new Set();

export const preventKeydownDefault = new (class {
    conditions: ((e: KeyboardEvent) => boolean)[] = [];
    strategy: "some" | "every" = "some";

    check(e: KeyboardEvent) {
        return this.conditions[this.strategy]((c) => c(e));
    }
})();

// For window-less environments
if (typeof window !== "undefined") {
    window.addEventListener("blur", () => {
        set.clear();
        setSecond.clear();
    });

    document.addEventListener(
        "keydown",
        (e) => {
            const { code } = e;

            if (preventKeydownDefault.check(e)) e.preventDefault();

            if (set.has(code)) {
                if (!setSecond.has(code)) {
                    setSecond.add(code);
                    document.dispatchEvent(new KeyboardEvent("keydownsecond", e));
                }

                return;
            }

            set.add(code);

            document.dispatchEvent(new KeyboardEvent("keydownonce", e));
        },
        false,
    );

    document.addEventListener(
        "keyup",
        ({ code }: KeyboardEvent) => {
            set.delete(code);
            setSecond.delete(code);
        },
        false,
    );
}

export function isKeyDown(code: string, { secondOnly = false } = {}) {
    return secondOnly ? setSecond.has(code) : set.has(code);
}

declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Document {
        /**
         * Like "keydown", but will only trigger once when the button is held down
         */
        addEventListener(
            type: "keydownonce",
            listener: (e: KeyboardEvent) => void,
            options?: boolean | AddEventListenerOptions,
        ): void;

        /**
         * Will fire once when the key is held for some time as a second "keydown" event
         */
        addEventListener(
            type: "keydownsecond",
            listener: (e: KeyboardEvent) => void,
            options?: boolean | AddEventListenerOptions,
        ): void;
    }
}
