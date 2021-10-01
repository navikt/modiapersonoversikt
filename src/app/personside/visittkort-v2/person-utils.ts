import { ForelderBarnRelasjon, ForelderBarnRelasjonRolle, Person, PersonStatus } from './PersondataDomain';

export function erDod(person: Person) {
    return person.dodsdato.length > 0 || person.personstatus[0].kode === PersonStatus.DOD;
}

export function hentBarnUnder21(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return forelderBarnRelasjon.filter(barn => hentAlderOrDefault(barn) <= 21);
}

export function hentBarn(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return forelderBarnRelasjon.filter(relasjon => relasjon.rolle === ForelderBarnRelasjonRolle.BARN);
}

function hentAlderOrDefault(relasjon: ForelderBarnRelasjon) {
    return relasjon.alder ? relasjon.alder : 0;
}
