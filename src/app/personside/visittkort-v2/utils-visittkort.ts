import { LocalDate, Navn } from './PersondataDomain';

export function hentNavn(navn: Navn): string {
    return navn.fornavn + (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ') + navn.etternavn;
}

export function hentAlder(fodselsdato: LocalDate): number {
    const naa = Date.now();
    const fodselsdatoTid = new Date(fodselsdato).getTime()
    const aldersdifferanse = new Date(naa - fodselsdatoTid)
    return Math.abs(aldersdifferanse.getUTCFullYear() - 1970)
}
