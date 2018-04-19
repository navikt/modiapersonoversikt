import { Kodeverk } from './kodeverk';

export interface Person {
    navn: Navn;
    kjønn: Kjønn;
    geografiskTilknytning?: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: string;
    bankkonto?: Bankkonto;
    statsborgerskap?: string;
    personstatus: Bostatus;
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
    rolle: Relasjonstype;
    tilPerson: {
        navn: Navn;
        alder: number;
        fødselsnummer: string;
        personstatus: Bostatus;
        kjonn: Kjønn
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
    Barn = 'BARN',
    Samboer = 'SAMBOER',
    Partner = 'PARTNER',
    Ektefelle = 'EKTE',
    Gift = 'GIFT'
}

export enum Sivilstand {
    Gift = 'GIFT',
    Ugift = 'UGIFT'
}

export enum Kjønn {
    Mann = 'M',
    Kvinne = 'K'
}

export function erDød(personstatus: Bostatus) {
    return personstatus.dødsdato || personstatus.bostatus === BostatusTyper.Død;
}

export function getBarnUnder21(familierelasjoner: Familierelasjon[]) {
    return familierelasjoner
        .filter(relasjon => relasjon.rolle === Relasjonstype.Barn)
        .filter(relasjon => relasjon.tilPerson.alder <= 21);
}

export function getPartner(person: Person) {
    const aktuelleRelasjoner = [
        Relasjonstype.Ektefelle,
        Relasjonstype.Gift,
        Relasjonstype.Partner,
        Relasjonstype.Samboer
    ];
    return person.familierelasjoner.find(relasjon => aktuelleRelasjoner.includes(relasjon.rolle));
}
