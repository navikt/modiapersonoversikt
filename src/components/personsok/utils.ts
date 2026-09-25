export const RESULTATER_PER_SIDE = 50;
// PDL returnerer maks 1000 personer per søk, uansett hvor mange som matcher.
export const MAKS_ANTALL_TREFF = 1000;
export const MAKS_ANTALL_SIDER = Math.ceil(MAKS_ANTALL_TREFF / RESULTATER_PER_SIDE);

export function visningsintervall(side: number, totaltAntallTreff: number, perSide = RESULTATER_PER_SIDE) {
    const fra = Math.min((side - 1) * perSide + 1, totaltAntallTreff);
    const til = Math.min(side * perSide, totaltAntallTreff);
    return { fra, til };
}

export function lagTreffTekst(side: number, totaltAntallTreff: number, perSide = RESULTATER_PER_SIDE) {
    const { fra, til } = visningsintervall(side, totaltAntallTreff, perSide);
    return `Viser ${fra}–${til} av ${totaltAntallTreff} treff`;
}
