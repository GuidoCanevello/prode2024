/**
 * Generates a random Int between min and max values received. The generated value is between [min <= value < max].
 * 
 * @param max The maximum value it can take (exclusive).
 * @param min The optional minimum value it can take (inclusive). Default 0.
 * @returns A random int
 */
export default function (max: number, min?: number) {
    min = min ?? 0;
    return Math.floor(Math.random() * (max - min)) + min;
}