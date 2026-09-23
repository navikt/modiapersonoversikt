export const RESULTATER_PER_SIDE = 50;

export function visningsintervall(side: number, totaltAntallTreff: number, perSide = RESULTATER_PER_SIDE) {
    const fra = Math.min((side - 1) * perSide + 1, totaltAntallTreff);
    const til = Math.min(side * perSide, totaltAntallTreff);
    return { fra, til };
}

export function lagTreffTekst(side: number, totaltAntallTreff: number, perSide = RESULTATER_PER_SIDE) {
    const { fra, til } = visningsintervall(side, totaltAntallTreff, perSide);
    return `Viser ${fra}–${til} av ${totaltAntallTreff} treff`;
}
