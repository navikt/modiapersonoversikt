import { Personadresse } from '../personadresse';
import { Sikkerhetstiltak } from '../sikkerhetstiltak';
import { NavKontaktinformasjon } from './NAVKontaktinformasjon';
import { Kodeverk } from '../kodeverk';

export interface PersonRespons {
    sikkerhetstiltak?: Sikkerhetstiltak;
}

export interface BegrensetTilgang extends PersonRespons {
    begrunnelse: BegrensetTilgangTyper;
}

export interface Person extends PersonRespons {
    navn: Navn;
    kjønn: Kjønn;
    geografiskTilknytning?: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: Kodeverk;
    bankkonto?: Bankkonto;
    tilrettelagtKomunikasjonsListe: Kodeverk[];
    statsborgerskap?: Kodeverk;
    folkeregistrertAdresse?: Personadresse;
    alternativAdresse?: Personadresse;
    postadresse?: Personadresse;
    personstatus: Bostatus;
    sivilstand: Sivilstand;
    familierelasjoner: Familierelasjon[];
    kontaktinformasjon: NavKontaktinformasjon;
}

export interface Navn {
    sammensatt: string;
    fornavn: string | null;
    mellomnavn: string | null;
    etternavn: string | null;
}

export interface BankAdresse {
    linje1: string;
    linje2: string;
    linje3: string;
}

export interface Bankkonto {
    kontonummer: string;
    banknavn: string;
    bankkode?: string;
    swift?: string;
    landkode?: Kodeverk;
    adresse?: BankAdresse;
    valuta?: Kodeverk;
    sistEndret: string;
    sistEndretAv: string;
}

export interface Familierelasjon {
    harSammeBosted: boolean;
    rolle: Relasjonstype;
    tilPerson: {
        navn: Navn;
        alder: number;
        alderMåneder: number;
        fødselsnummer: string;
        personstatus: Bostatus;
    };
}

export interface Bostatus {
    dødsdato?: string;
    bostatus?: Kodeverk;
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

export interface Sivilstand extends Kodeverk {
    fraOgMed: string;
}

export enum SivilstandTyper {
    Gift = 'GIFT',
    Ugift = 'UGIF',
    Skilt = 'SKIL',
    Samboer  = 'SAMB',
    Enke = 'ENKE'
}

export enum Kjønn {
    Mann = 'M',
    Kvinne = 'K'
}

export enum BegrensetTilgangTyper {
    Kode6 = 'sikkerhetsbegrensning.diskresjonskode6',
    Kode7 = 'sikkerhetsbegrensning.diskresjonskode7',
    EgenAnsatt = 'sikkerhetsbegrensning.diskresjonEgenAnsatt',
    Geografi = 'sikkerhetsbegrensing.geografisk',
    DefaultFraBackEnd = 'sikkerhetsbegrensning.diskresjonskode'
}

export function erDød(personstatus: Bostatus) {
    return personstatus.dødsdato || (personstatus.bostatus && personstatus.bostatus.kodeRef === BostatusTyper.Død);
}

export function getBarn(familierelasjoner: Familierelasjon[]) {
    return familierelasjoner
        .filter(relasjon => relasjon.rolle === Relasjonstype.Barn);
}

export function getBarnUnder21(familierelasjoner: Familierelasjon[]) {
    return getBarn(familierelasjoner).filter(barn => barn.tilPerson.alder <= 21);
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
    return finnRelasjon(familierelasjoner, Relasjonstype.Mor);
}

export function getFar(familierelasjoner: Familierelasjon[]) {
    return finnRelasjon(familierelasjoner, Relasjonstype.Far);
}

function finnRelasjon(familierelasjoner: Familierelasjon[], relasjonstype: Relasjonstype) {
    return familierelasjoner.find(relasjon => relasjon.rolle === relasjonstype);
}

export function erPersonResponsAvTypePerson(person: PersonRespons): person is Person {
    return 'navn' in person;
}

export function erPersonResponsAvTypeBegrensetTilgang(person: PersonRespons): person is BegrensetTilgang {
    return 'begrunnelse' in person;
}