export function erGyldigishFnr(fnr: string) {
    const numeric = !/\D/.test(fnr);
    return fnr.length === 11 && numeric;
}
