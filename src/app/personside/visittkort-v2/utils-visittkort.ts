import { erDod } from './person-utils';
import { Navn, Person } from './PersondataDomain';

export function hentNavn(navn: Navn | null): string {
    if (!navn) {
        return 'Ukjent navn';
    }
    return navn.fornavn + (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ') + navn.etternavn;
}

export function hentAlderEllerDod(person: Person): string | undefined {
    if (erDod(person)) {
        return 'Død';
    }
    return person.alder?.toString();
}
