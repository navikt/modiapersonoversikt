/**
 * javascript has no modulo operator (-7 % 4 = -3, but we want 1), so define it.
 */
export function modulo(dividend: number, divisor: number): number {
    const remainder = dividend % divisor;
    return remainder < 0 ? divisor + remainder : remainder;
}
