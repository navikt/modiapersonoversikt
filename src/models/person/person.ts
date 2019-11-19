import { Endringsinfo, Personadresse } from '../personadresse';
import { Sikkerhetstiltak } from '../sikkerhetstiltak';
import { NavKontaktinformasjon } from './NAVKontaktinformasjon';
import { Kodeverk } from '../kodeverk';
import { Doedsbo } from './doedsbo';
import { Fullmakt } from './fullmakter';

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
    bankkonto: Bankkonto | null;
    tilrettelagtKomunikasjonsListe: Kodeverk[];
    statsborgerskap?: Kodeverk;
    folkeregistrertAdresse?: Personadresse;
    alternativAdresse?: Personadresse;
    postadresse?: Personadresse;
    personstatus: Bostatus;
    sivilstand: Sivilstand;
    familierelasjoner: Familierelasjon[];
    kontaktinformasjon: NavKontaktinformasjon;
    kontaktinformasjonForDoedsbo?: Doedsbo[];
    fullmakt?: Fullmakt[];
}

export interface Navn {
    endringsinfo?: Endringsinfo;
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
    banknavn: string | null;
    bankkode?: string;
    swift?: string;
    landkode?: Kodeverk;
    adresse?: BankAdresse;
    valuta?: Kodeverk;
    sistEndret: string;
    sistEndretAv: string;
}

export interface Familierelasjon {
    harSammeBosted?: boolean;
    rolle: Relasjonstype;
    tilPerson: {
        navn: Navn | null;
        alder?: number;
        alderMåneder?: number;
        fødselsnummer?: string;
        personstatus: Bostatus;
        diskresjonskode?: Kodeverk;
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
    Samboer = 'SAMB',
    Enke = 'ENKE'
}

export enum Kjønn {
    Mann = 'M',
    Kvinne = 'K',
    Diskresjonskode = 'D'
}

export function erMann(person: Person) {
    return person.kjønn === Kjønn.Mann;
}

export function erKvinne(person: Person) {
    return person.kjønn === Kjønn.Kvinne;
}

export enum BegrensetTilgangTyper {
    Kode6 = 'sikkerhetsbegrensning.diskresjonskode6',
    Kode7 = 'sikkerhetsbegrensning.diskresjonskode7',
    EgenAnsatt = 'sikkerhetsbegrensning.diskresjonEgenAnsatt',
    Geografi = 'sikkerhetsbegrensning.geografisk',
    DefaultFraBackEnd = 'sikkerhetsbegrensning.diskresjonskode'
}

export function getNavn({ fornavn, mellomnavn, etternavn, sammensatt }: Navn) {
    if (!fornavn && !etternavn) {
        return sammensatt || 'Ukjent navn';
    }

    let navn = [];
    if (fornavn) {
        navn.push(fornavn);
    }
    if (mellomnavn) {
        navn.push(mellomnavn);
    }
    if (etternavn) {
        navn.push(etternavn);
    }

    return navn.join(' ');
}

export function erDød(personstatus: Bostatus) {
    return personstatus.dødsdato || (personstatus.bostatus && personstatus.bostatus.kodeRef === BostatusTyper.Død);
}

export function getBarn(familierelasjoner: Familierelasjon[]) {
    return familierelasjoner.filter(relasjon => relasjon.rolle === Relasjonstype.Barn);
}

function getAlderOrDefault(relasjon: Familierelasjon) {
    return relasjon.tilPerson.alder ? relasjon.tilPerson.alder : 0;
}

export function getBarnUnder21(familierelasjoner: Familierelasjon[]) {
    return getBarn(familierelasjoner).filter(barn => getAlderOrDefault(barn) <= 21);
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
