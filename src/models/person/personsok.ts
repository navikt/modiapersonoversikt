import { Kodeverk } from '../kodeverk';
import { Navn } from './person';

export interface PersonsokResponse {
    diskresjonskode?: Kodeverk | null;
    postadresse: UstrukturertAdresse | null;
    bostedsadresse: StrukturertAdresse | null;
    kjonn: Kodeverk;
    navn: Navn;
    status: Kodeverk;
    ident: NorskIdent;
    brukerinfo: Brukerinfo | null;
}

export interface UstrukturertAdresse {
    landkode: Kodeverk | null;
    adresselinje1: string | null;
    adresselinje2: string | null;
    adresselinje3: string | null;
    adresselinje4: string | null;
}

export interface StrukturertAdresse {
    landkode: Kodeverk | null;
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
    midlertidigPostadresse: MidlertidigAdresse | null;
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
