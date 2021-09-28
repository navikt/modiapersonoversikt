import { ForelderBarnRelasjon, ForelderBarnRelasjonRolle, Person, PersonStatus as Status } from './PersondataDomain';

export function erDod(person: Person) {
    return person.personstatus[0].kode === Status.DOD;
}

export function hentBarnUnder21(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return hentBarn(forelderBarnRelasjon).filter(barn => hentAlderOrDefault(barn.relatertPersonsIdent) <= 21);
}

export function hentBarn(forelderBarnRelasjon: ForelderBarnRelasjon[]) {
    return forelderBarnRelasjon.filter(relasjon => relasjon.relatertPersonsRolle === ForelderBarnRelasjonRolle.BARN);
}

// TODO: Oppslag på ident for barn her?
function hentAlderOrDefault(relasjonIdent: string) {
    return 0;
    // return relasjon.tilPerson.alder ? relasjon.tilPerson.alder : 0;
}
