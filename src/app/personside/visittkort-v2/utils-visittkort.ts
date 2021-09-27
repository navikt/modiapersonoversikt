import { Navn } from './PersondataDomain';

export function hentNavn(navn: Navn): string {
    return navn.fornavn + (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ') + navn.etternavn;
}
