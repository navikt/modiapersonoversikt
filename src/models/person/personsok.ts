import { Kodeverk } from '../kodeverk';

export interface PersonsokResponse {
    diskresjonskode?: Kodeverk | null;
    postadresse: string | null;
    bostedsadresse: string | null;
    kjonn: Kodeverk | null;
    navn: Navn;
    status?: Kodeverk | null;
    ident: NorskIdent;
    brukerinfo: Brukerinfo | null;
    utenlandskID: UtenlandskID[] | null;
}

export interface Navn {
    sammensatt: string;
    fornavn: string | null;
    mellomnavn: string | null;
    etternavn: string | null;
}

export interface UtenlandskID {
    identifikasjonsnummer: string;
    utstederland: string;
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
