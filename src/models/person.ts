import { Personadresse } from './personadresse';

export interface Person {
    navn: Navn;
    kjønn: Kjønn;
    geografiskTilknytning?: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: string;
    bankkonto?: Bankkonto;
    statsborgerskap?: string;
    folkeregistrertAdresse?: Personadresse;
    alternativAdresse?: Personadresse;
    postadresse?: Personadresse;
    personstatus: Bostatus;
    sivilstand: Sivilstand;
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
    Gift = 'GIFT',
    Mor = 'MORA',
    Far = 'FARA'
}

export interface Sivilstand {
    value: SivilstandTyper;
    beskrivelse: string;
    fraOgMed: string;
}

export enum SivilstandTyper {
    Gift = 'GIFT',
    Ugift = 'UGIFT',
    Skilt = 'SKIL',
    Samboer  = 'SAMB',
    Enke = 'ENKE'
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

export function getMorOgFar(familierelasjoner: Familierelasjon[]) {
    let foreldre: Familierelasjon[] = [];
    const mor = getMor(familierelasjoner);
    const far = getFar(familierelasjoner);

    if (mor) {
        foreldre.push(mor);
    }
    if (far) {
        foreldre.push(far);
    }
    return foreldre;
}

export function getMor(familierelasjoner: Familierelasjon[]) {
    return familierelasjoner.find(relasjon => relasjon.rolle === Relasjonstype.Mor);
}

export function getFar(familierelasjoner: Familierelasjon[]) {
    return familierelasjoner.find(relasjon => relasjon.rolle === Relasjonstype.Far);
}