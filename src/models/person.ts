export interface Person {
    navn: Navn;
    kjønn: string;
    geografiskTilknytning: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: string;
    status: Bostatus;
}

export interface Navn {
    sammensatt: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
}

export interface Bostatus {
    dødsdato?: string;
    bostatus?: string;
}

export enum BostatusTyper {
    Død = 'DØD',
    Utvandret = 'UTVANDRET'
}

export function erDød(person: Person) {
    return person.status.dødsdato || person.status.bostatus === BostatusTyper.Død;
}