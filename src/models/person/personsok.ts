import type { Kodeverk } from '../kodeverk';

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

export interface PersonsokRequestV3 {
    enhet: string;
    navn?: string;
    utenlandskID?: string;
    alderFra?: number;
    alderTil?: number;
    fodselsdatoFra?: string;
    fodselsdatoTil?: string;
    kjonn?: string;
    adresse?: string;
    telefonnummer?: string;
}
