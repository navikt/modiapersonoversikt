import { Kodeverk } from '../kodeverk';
import { Navn } from './person';

export interface PersonsokResponse {
    diskresjonskode?: Kodeverk | null;
    postadresse: string | null;
    bostedsadresse: string | null;
    kjonn: Kodeverk;
    navn: Navn;
    status?: Kodeverk;
    ident: NorskIdent;
    brukerinfo: Brukerinfo | null;
    utenlandskID?: UtenlandskID | null;
    request?: PersonsokRequest;
}

export interface UtenlandskID {
    utenlandskID: string | null;
    type: Kodeverk;
}

export interface NorskIdent {
    ident: string;
    type: Kodeverk;
}

export interface Brukerinfo {
    ansvarligEnhet: string;
    gjeldendePostadresseType: Kodeverk;
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
