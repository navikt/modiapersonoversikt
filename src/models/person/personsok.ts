import { Kodeverk } from '../kodeverk';
import { Navn } from './person';

export interface PersonsokResponse {
    diskresjonskode?: Kodeverk | null;
    postadresse: string | null;
    bostedsadresse: string | null;
    kjonn: Kodeverk | null;
    navn: Navn;
    status?: Kodeverk | null;
    ident: NorskIdent;
    brukerinfo: Brukerinfo | null;
    utenlandskIDListe: UtenlandskIDListe | null;
}

export interface UtenlandskID {
    identifikasjonsnummer: string;
    utstederland: string;
}

export interface UtenlandskIDListe {
    utenlandskID: UtenlandskID[];
}

export interface NorskIdent {
    ident: string;
    type: Kodeverk;
}

export interface Brukerinfo {
    ansvarligEnhet: string | null;
    gjeldendePostadresseType: Kodeverk | null;
    midlertidigPostadresse: string | null;
}

export interface PersonsokRequest {
    fornavn?: string;
    etternavn?: string;
    gatenavn?: string;
    kontonummer?: string;
    utenlandskID?: string;
    alderFra?: number;
    alderTil?: number;
    kommunenummer?: string;
    fodselsdatoFra?: string;
    fodselsdatoTil?: string;
    kjonn?: string;
    husnummer?: number;
    husbokstav?: string;
    postnummer?: string;
}
