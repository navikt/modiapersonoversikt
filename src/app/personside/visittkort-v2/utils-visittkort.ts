import { erDod } from './person-utils';
import { ForelderBarnRelasjon, Navn, Person, PersonStatus } from './PersondataDomain';

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

export function hentAlderEllerDodRelasjon(relasjon: ForelderBarnRelasjon): string | undefined {
    if (relasjonErDod(relasjon)) {
        return 'Død';
    }
    return relasjon.alder?.toString();
}

export function relasjonErDod(relasjon: ForelderBarnRelasjon): boolean {
    const personstatus = relasjon.personstatus.firstOrNull();
    return !!personstatus && personstatus.kode === PersonStatus.DOD;
}
