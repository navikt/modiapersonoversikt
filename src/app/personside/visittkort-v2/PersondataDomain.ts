export interface Data {
    feilendeSystemer: Array<string>;
    person: Person;
}

export type LocalDate = string & { __type__: 'LocalDate' };
export type LocalDateTime = string & { __type__: 'LocalDateTime' };

export interface Person {
    fnr: string;
    navn: Array<Navn>;
    kjonn: Array<KodeBeskrivelse<Kjonn>>;
    fodselsdato: Array<LocalDate>;
    alder: number | null;
    dodsdato: Array<LocalDate>;
    bostedAdresse: Array<Adresse>;
    kontaktAdresse: Array<Adresse>;
    navEnhet: Enhet | null;
    statsborgerskap: Array<Statsborgerskap>;
    adressebeskyttelse: Array<KodeBeskrivelse<AdresseBeskyttelse>>;
    sikkerhetstiltak: Array<Sikkerhetstiltak>;
    erEgenAnsatt: EgenAnsatt;
    personstatus: Array<KodeBeskrivelse<PersonStatus>>;
    sivilstand: Array<Sivilstand>;
    foreldreansvar: Array<Foreldreansvar>;
    deltBosted: Array<DeltBosted>;
    dodsbo: Array<Dodsbo>;
    fullmakt: Array<Fullmakt>;
    vergemal: Array<Verge>;
    tilrettelagtKommunikasjon: TilrettelagtKommunikasjon;
    telefonnummer: Array<Telefon>;
    kontaktOgReservasjon: DigitalKontaktinformasjon | null;
    bankkonto: Bankkonto | null;
    forelderBarnRelasjon: Array<ForelderBarnRelasjon>;
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
    gyldigFraOgMed: LocalDate | null;
    gyldigTilOgMed: LocalDate | null;
    erHistorisk: boolean;
}

export interface SivilstandRelasjon {
    fnr: string;
    navn: Array<Navn>;
    alder: number | null;
    adressebeskyttelse: Array<KodeBeskrivelse<AdresseBeskyttelse>>;
    harSammeAdresse: boolean;
}

export interface Sivilstand {
    type: KodeBeskrivelse<SivilstandType>;
    gyldigFraOgMed: LocalDate | null;
    sivilstandRelasjon: SivilstandRelasjon | null;
}

export interface Sikkerhetstiltak {
    type: SikkerhetstiltakType;
    gyldigFraOgMed: LocalDate;
    gyldigTilOgMed: LocalDate;
}

export interface SistEndret {
    ident: string;
    tidspunkt: LocalDateTime;
    system: string;
}

export interface Adresse {
    linje1: string;
    linje2: string | null;
    linje3: string | null;
    sistEndret: SistEndret | null;
}

export interface Enhet {
    id: string;
    navn: string;
    publikumsmottak: Array<Publikumsmottak>;
}

export interface Publikumsmottak {
    besoksadresse: Adresse;
    apningstider: Array<ApningsTid>;
}

interface ApningsTid {
    ukedag: string;
    apningstid: string | null;
}

export interface Dodsbo {
    adressat: Adressat;
    adresse: Adresse;
    registrert: LocalDate;
    skifteform: Skifteform;
    sistEndret: SistEndret | null;
}

export interface Adressat {
    advokatSomAdressat: AdvokatSomAdressat | null;
    personSomAdressat: PersonSomAdressat | null;
    organisasjonSomAdressat: OrganisasjonSomAdressat | null;
}

export interface AdvokatSomAdressat {
    kontaktperson: Navn;
    organisasjonsnavn: string | null;
    organisasjonsnummer: string | null;
}

export interface PersonSomAdressat {
    fnr: string | null;
    navn: Navn | null;
    fodselsdato: LocalDate | null;
}

export interface OrganisasjonSomAdressat {
    kontaktperson: Navn | null;
    organisasjonsnavn: string;
    organisasjonsnummer: string | null;
}

export interface Bankkonto {
    kontonummer: string;
    banknavn: string;
    sistEndret: SistEndret;
    bankkode: string | null;
    swift: string | null;
    landkode: KodeBeskrivelse<string> | null;
    adresse: Adresse | null;
    valuta: KodeBeskrivelse<string> | null;
}

export interface TilrettelagtKommunikasjon {
    talesprak: Array<KodeBeskrivelse<string>>;
    tegnsprak: Array<KodeBeskrivelse<string>>;
}

export interface Fullmakt {
    motpartsPersonident: string;
    motpartsPersonNavn: Navn;
    motpartsRolle: FullmaktsRolle;
    omraade: Array<string>;
    gyldigFraOgMed: LocalDate;
    gyldigTilOgMed: LocalDate;
}

export interface Telefon {
    retningsnummer: KodeBeskrivelse<string> | null;
    identifikator: string;
    sistEndret: SistEndret | null;
    prioritet: number;
}

export interface Verge {
    ident: string | null;
    navn: Navn | null;
    vergesakstype: string | null;
    omfang: string | null;
    embete: string | null;
    gyldighetstidspunkt: LocalDate | null;
    opphoerstidspunkt: LocalDate | null;
}

export interface Foreldreansvar {
    ansvar: string;
    ansvarlig: Navn | null;
    ansvarsubject: Navn | null;
}

export interface DeltBosted {
    startdatoForKontrakt: LocalDate;
    sluttdatoForKontrakt: LocalDate | null;
    adresse: Adresse | null;
}

export interface ForelderBarnRelasjon {
    ident: string;
    rolle: ForelderBarnRelasjonRolle;
    navn: Array<Navn>;
    fodselsdato: Array<LocalDate>;
    kjonn: Array<KodeBeskrivelse<Kjonn>>;
    alder: number | null;
    adressebeskyttelse: Array<KodeBeskrivelse<AdresseBeskyttelse>>;
    bostedAdresse: Array<Adresse>;
    harSammeAdresse: boolean;
    personstatus: Array<KodeBeskrivelse<PersonStatus>>;
}

export enum Kjonn {
    M = 'M',
    K = 'K',
    U = 'U'
}

export enum AdresseBeskyttelse {
    KODE6 = 'KODE6',
    KODE6_UTLAND = 'KODE6_UTLAND',
    KODE7 = 'KODE7',
    UGRADERT = 'UGRADERT',
    UKJENT = 'UKJENT'
}

export enum EgenAnsatt {
    JA = 'JA',
    NEI = 'NEI',
    UKJENT = 'UKJENT'
}

export enum PersonStatus {
    BOSATT = 'BOSATT',
    DOD = 'DOD',
    OPPHORT = 'OPPHORT',
    INAKTIV = 'INAKTIV',
    MIDLERTIDIG = 'MIDLERTIDIG',
    FORSVUNNET = 'FORSVUNNET',
    UTFLYTTET = 'UTFLYTTET',
    IKKE_BOSATT = 'IKKE_BOSATT',
    FODSELSREGISTERT = 'FODSELSREGISTERT',
    UKJENT = 'UKJENT'
}

export enum SivilstandType {
    UOPPGITT = 'UOPPGITT',
    UGIFT = 'UGIFT',
    GIFT = 'GIFT',
    ENKE_ELLER_ENKEMANN = 'ENKE_ELLER_ENKEMANN',
    SKILT = 'SKILT',
    SEPARERT = 'SEPARERT',
    REGISTRERT_PARTNER = 'REGISTRERT_PARTNER',
    SEPARERT_PARTNER = 'SEPARERT_PARTNER',
    SKILT_PARTNER = 'SKILT_PARTNER',
    GJENLEVENDE_PARTNER = 'GJENLEVENDE_PARTNER'
}

export enum SikkerhetstiltakType {
    FYUS = 'Fysisk utestengelse',
    TFUS = 'Telefonisk utestengelse',
    FTUS = 'Fysisk/telefonisk utestengelse',
    DIUS = 'Digital utestengelse',
    TOAN = 'To ansatte i samtale'
}

export enum Skifteform {
    OFFENTLIG = 'OFFENTLIG',
    ANNET = 'ANNET',
    UKJENT = 'UKJENT'
}

export enum FullmaktsRolle {
    FULLMAKTSGIVER = 'FULLMAKTSGIVER',
    FULLMEKTIG = 'FULLMEKTIG',
    UKJENT = 'UKJENT'
}

export enum ForelderBarnRelasjonRolle {
    BARN = 'BARN',
    MOR = 'MOR',
    FAR = 'FAR',
    MEDMOR = 'MEDMOR',
    UKJENT = 'UKJENT'
}

/**
 * DKIF Data klasser
 */
export interface DigitalKontaktinformasjon {
    personident: string | null;
    reservasjon: string | null;
    epostadresse: Epostadresse | null;
    mobiltelefonnummer: MobilTelefon | null;
}

export interface Epostadresse {
    value: string | null;
    sistOppdatert: LocalDate | null;
    sistVerifisert: LocalDate | null;
}

export interface MobilTelefon {
    value: string | null;
    sistOppdatert: LocalDate | null;
    sistVerifisert: LocalDate | null;
}
