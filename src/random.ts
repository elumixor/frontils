const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Generates a random number in [0, 1) range */
function random(): number;
/** Generates a random number in [0, max) range. Returns an integer.  */
function random(max: number): number;
/** Generates a random number in [min, max) range. Returns an integer.  */
function random(min: number, max: number): number;
function random(from?: number, to?: number) {
  if (from === undefined) return Math.random();
  if (to === undefined) {
    to = from;
    from = 0;
  }
  return Math.floor(random.float(from, to));
}

/** Generates a random floating point number in [0, max) range. */
function float(max: number): number;
/** Generates a random floating point number in [min, max) range. */
function float(min: number, max: number): number;
function float(from: number, to?: number) {
  if (to === undefined) {
    to = from;
    from = 0;
  }
  return Math.random() * (to - from) + from;
}

/** Generates a random string of given length. */
function string(length = 10, _alphabet = alphabet) {
  return Array.from({ length }, () => random.char(_alphabet)).join("");
}

/** Generates a random character */
function char(_alphabet = alphabet) {
  return _alphabet[random(_alphabet.length)];
}

random.float = float;
random.string = string;
random.char = char;

export { random };
