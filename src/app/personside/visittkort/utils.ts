import { Navn } from '../../../models/person/person';

export function hentNavn(navn: Navn) {
    return navn.fornavn + (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ') + navn.etternavn;
}
