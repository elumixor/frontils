/**
 * Like `document.getElementById`, but throws an error if the element is not found.
 * @param id The id of the element to find.
 * @param message The error message to show if the element is not found.
 */
export function getElementOrThrow(id: string, message?: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) throw new Error(message ?? `Element with id ${id} not found`);
    return element;
}
