import { Kodeverk } from './kodeverk';

export interface Person {
    navn: Navn;
    kjønn: string;
    geografiskTilknytning?: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: string;
    bankkonto?: Bankkonto;
    statsborgerskap: string;
    status: Bostatus;
    sivilstand: Kodeverk;
    familierelasjoner: Familierelasjon[];
}

export interface Navn {
    sammensatt: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
}

export interface Bankkonto {
    erNorskKonto: boolean;
    kontonummer: number;
    bank: string;
    sistEndret: string;
    sistEndretAv: string;
}

export interface Familierelasjon {
    harSammeBosted: boolean;
    rolle: string;
    tilPerson: {
        navn: Navn;
        alder: number;
        fødselsnummer: string;
    };
}

export interface Bostatus {
    dødsdato?: string;
    bostatus?: string;
}

export enum BostatusTyper {
    Død = 'DØD',
    Utvandret = 'UTVA'
}

export enum Relasjonstype {
    Barn = 'BARN'
}

export function erDød(person: Person) {
    return person.status.dødsdato || person.status.bostatus === BostatusTyper.Død;
}

export function selectBarn(familierelasjoner: Familierelasjon[]) {
    return familierelasjoner.filter(relasjon => relasjon.rolle === Relasjonstype.Barn);
}