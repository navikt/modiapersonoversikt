export function cyclicClamp(value: number, size: number): number {
    const residual = value % size;
    return residual < 0 ? size + residual : residual;
}
