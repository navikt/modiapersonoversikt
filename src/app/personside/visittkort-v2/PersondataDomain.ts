export interface Data {
    feilendeSystemer: Array<InformasjonElement>;
    person: Person;
}

export type LocalDate = string & { __type__: 'LocalDate' };
export type LocalDateTime = string & { __type__: 'LocalDateTime' };

export interface Person extends PersonMedAlderOgDodsdato {
    personIdent: string;
    navn: Array<Navn>;
    kjonn: Array<KodeBeskrivelse<Kjonn>>;
    fodselsdato: Array<LocalDate>;
    geografiskTilknytning: string | null;
    alder: number | null;
    dodsdato: Array<LocalDate>;
    bostedAdresse: Array<Adresse>;
    kontaktAdresse: Array<Adresse>;
    oppholdsAdresse: Array<Adresse>;
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

export interface PersonMedAlderOgDodsdato {
    alder: number | null;
    dodsdato: Array<LocalDate>;
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
    gyldighetsPeriode: GyldighetsPeriode | null;
}

export interface SivilstandRelasjon extends PersonMedAlderOgDodsdato {
    fnr: string;
    navn: Array<Navn>;
    alder: number | null;
    adressebeskyttelse: Array<KodeBeskrivelse<AdresseBeskyttelse>>;
    harSammeAdresse: boolean;
    dodsdato: Array<LocalDate>;
}

export interface Sivilstand {
    type: KodeBeskrivelse<SivilstandType>;
    gyldigFraOgMed: LocalDate | null;
    sivilstandRelasjon: SivilstandRelasjon | null;
}

export interface Sikkerhetstiltak {
    type: string;
    beskrivelse: string;
    gyldighetsPeriode: GyldighetsPeriode | null;
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
    gyldighetsPeriode: GyldighetsPeriode | null;
}

export interface GyldighetsPeriode {
    gyldigFraOgMed: LocalDate | null;
    gyldigTilOgMed: LocalDate | null;
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
    apningstid: string;
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
    navn: Array<Navn>;
    fodselsdato: LocalDate | null;
}

export interface OrganisasjonSomAdressat {
    kontaktperson: Navn | null;
    organisasjonsnavn: string;
    organisasjonsnummer: string | null;
}

export interface Bankkonto {
    kontonummer: string;
    banknavn: string | null;
    sistEndret: SistEndret | null;
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
    omrade: Array<KodeBeskrivelse<string>>;
    gyldighetsPeriode: GyldighetsPeriode | null;
    digitalKontaktinformasjonTredjepartsperson: DigitalKontaktinformasjonTredjepartsperson | null;
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
    vergesakstype: string;
    omfang: string;
    embete: string | null;
    gyldighetsPeriode: GyldighetsPeriode | null;
}

export interface Foreldreansvar {
    ansvar: string;
    ansvarlig: NavnOgIdent | null;
    ansvarsubject: NavnOgIdent | null;
}

export interface NavnOgIdent {
    navn: Navn | null;
    ident: string | null;
}

export interface DeltBosted {
    adresse: Adresse | null;
    gyldighetsPeriode: GyldighetsPeriode | null;
}

export interface ForelderBarnRelasjon extends PersonMedAlderOgDodsdato {
    ident: string | null;
    rolle: ForelderBarnRelasjonRolle;
    navn: Array<Navn>;
    fodselsdato: Array<LocalDate>;
    kjonn: Array<KodeBeskrivelse<Kjonn>>;
    alder: number | null;
    adressebeskyttelse: Array<KodeBeskrivelse<AdresseBeskyttelse>>;
    harSammeAdresse: boolean;
    dodsdato: Array<LocalDate>;
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

export interface DigitalKontaktinformasjonTredjepartsperson {
    reservasjon: string | null;
    mobiltelefonnummer: string | null;
}

/**
 * Feilende systemer
 */

export enum InformasjonElement {
    PDL_GT = 'PDL_GT',
    PDL_TREDJEPARTSPERSONER = 'PDL_TREDJEPARTSPERSONER',
    EGEN_ANSATT = 'EGEN_ANSATT',
    DKIF = 'DKIF',
    BANKKONTO = 'BANKKONTO',
    VEILEDER_ROLLER = 'VEILEDER_ROLLER',
    NORG_NAVKONTOR = 'NORG_NAVKONTOR',
    NORG_KONTAKTINFORMASJON = 'NORG_KONTAKTINFORMASJON'
}
