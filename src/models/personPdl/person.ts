import { Dodsbo } from './dodsbo';
import { Fullmakt } from './fullmakt';
import { Verge } from './verge';
import { DeltBosted } from './deltBosted';
import { Bankkonto } from './bankkonto';
import { DigitalKontaktinformasjon } from './digitalKontaktinformasjon';
import { Foreldreansvar } from './foreldreansvar';

export interface Person {
    fnr: string;
    navn: Navn[];
    kjonn: KodeBeskrivelse<Kjonn>[];
    fodselsdato: Date[];
    dodsdato: Date[];
    bostedAdresse: Adresse[];
    kontaktAdresse: Adresse[];
    navEnhet: Enhet | null;
    statsborgerskap: Statsborgerskap[];
    adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse>[];
    sikkerhetstiltak: Sikkerhetstiltak[];
    erEgenAnsatt: EgenAnsatt;
    personstatus: KodeBeskrivelse<PersonStatus>[];
    sivilstand: Sivilstand[];
    foreldreansvar: Foreldreansvar[];
    deltBosted: DeltBosted[];
    dodsbo: Dodsbo[];
    fullmakt: Fullmakt[];
    vergemal: Verge[];
    tilrettelagtKommunikasjon: TilrettelagtKommunikasjon;
    telefonnummer: Telefon[];
    kontaktOgReservasjon: DigitalKontaktinformasjon | null;
    bankkonto: Bankkonto | null;
}

export interface TredjepartsPerson {
    fnr: string;
    navn: Navn | null;
    adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse> | null;
    bostedAdresse: Adresse | null;
}

export interface KodeBeskrivelse<T> {
    kode: T;
    beskrivelse: string;
}

export interface Navn {
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
}

export interface Statsborgerskap {
    land: KodeBeskrivelse<string>;
    gyldigFraOgMed: Date | null;
    gyldigTilOgMed: Date | null;
}

export interface Sivilstand {
    type: KodeBeskrivelse<SivilstandType>;
    gyldigFraOgMed: Date | null;
}

export interface Sikkerhetstiltak {
    type: SikkerhetstiltakType;
    gyldigFraOgMed: Date;
    gyldigTilOgMed: Date;
}

export interface Adresse {
    linje1: string;
    linje2: string | null;
    linje3: string | null;
}

export interface Enhet {
    id: string;
    navn: string;
}

export interface TilrettelagtKommunikasjon {
    talesprak: KodeBeskrivelse<string>[];
    tegnsprak: KodeBeskrivelse<string>[];
}

export interface Telefon {
    retningsnummer: KodeBeskrivelse<string> | null;
    identifikator: string;
    sistEndret: Date | null;
    sistEndretAv: string | null;
    prioritet: number;
}

export enum Kjonn {
    Mann = 'M',
    Kvinne = 'K',
    Ukjent = 'U'
}

export enum AdresseBeskyttelse {
    Kode6 = 'KODE6',
    Kode6_Utland = 'KODE6_UTLAND',
    Kode7 = 'KODE7',
    Ugradert = 'UGRADERT',
    Ukjent = 'UKJENT'
}

export enum EgenAnsatt {
    Ja = 'JA',
    Nei = 'NEI',
    Ukjent = 'UKJENT'
}

export enum PersonStatus {
    Bosatt = 'BOSA',
    Dod = 'DØD',
    Opphort = 'UTPE',
    Inaktiv = 'ADNR',
    Midlertidig = 'ADNR',
    Forsvunnet = 'FOSV',
    Utflyttet = 'UTVA',
    Ikke_Bosatt = 'UREG',
    Fodselsregistert = 'FØDR',
    Ukjent = 'UKJENT'
}

export enum SivilstandType {
    Uoppgitt = 'NULL',
    Ugift = 'UGIF',
    Gift = 'GIFT',
    Enke_eller_Enkemann = 'ENKE',
    Skilt = 'SKIL',
    Separert = 'SEPR',
    Registrert_Partner = 'REPA',
    Separert_Partner = 'SEPA',
    Skilt_Partner = 'SKPA',
    Gjenlevende_Partner = 'GJPA'
}

export enum SikkerhetstiltakType {
    FysiskUtestengelse = 'FYUS',
    TelefoniskUtestengelse = 'TFUS',
    FysiskEllerTelefoniskUtestengelse = 'FTUS',
    DigitalUtestengelse = 'DIUS',
    ToAnsatteISamtale = 'TOAN'
}
