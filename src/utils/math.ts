export function roundToNearest100(nummer: number) {
    return Math.round(nummer / 100) * 100;
}

export function cyclicClamp(value: number, size: number): number {
    const residual = value % size;
    return residual < 0 ? size + residual : residual;
}
