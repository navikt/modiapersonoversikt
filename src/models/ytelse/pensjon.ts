export type PensjonResource = Pensjon[] | null;

export interface Pensjon {
    id: string;
    enhetId: string;
    type?: { code: string; decode: string };
    status?: { code: string; decode: string };
    fom: string;
    tom?: string;
}

export function getPensjonIdDato(ytelse: Pensjon) {
    return ytelse.fom;
}

export function getUnikPensjonKey(ytelse: Pensjon) {
    return `pensjon${ytelse.id}`;
}
