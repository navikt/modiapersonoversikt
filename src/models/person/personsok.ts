import { Kodeverk } from '../kodeverk';
import { Navn } from './person';

export interface PersonsokResponse {
    diskresjonskode?: Kodeverk;
    postadresse?: UstrukturertAdresse;
    bostedsadresse?: StrukturertAdresse;
    kjonn: Kodeverk;
    navn: Navn;
    status: Kodeverk;
    ident: NorskIdent;
    brukerinfo?: Brukerinfo;
}

export interface UstrukturertAdresse {
    landkode?: Kodeverk;
    adresselinje1?: string;
    adresselinje2?: string;
    adresselinje3?: string;
    adresselinje4?: string;
}

export interface StrukturertAdresse {
    landkode?: Kodeverk;
    tilleggsadresse: string;
    tilleggsadresseType: string;
}

export interface NorskIdent {
    ident: string;
    type: Kodeverk;
}

export interface Brukerinfo {
    ansvarligEnhet: string;
    gjeldendePostadresseType: Kodeverk;
    midlertidigPostadresse?: MidlertidigAdresse;
}

export interface MidlertidigAdresse {
    type: MidlertidigAdressetype;
    ustrukturertAdresse: UstrukturertAdresse;
}

export enum MidlertidigAdressetype {
    PostadresseNorge = 'PostadresseNorge',
    PostadresseUtland = 'PostadresseUtland'
}

export interface PersonsokRequest {
    fornavn?: string;
    etternavn?: string;
    gatenavn?: string;
    kontonummer?: string;
    alderFra?: number;
    alderTil?: number;
    kommunenummer?: string;
    fodsesldatoFra?: string;
    fodsesldatoTil?: string;
    kjonn?: string;
    husnummer?: number;
    husbokstav?: string;
    postnummer?: string;
}
