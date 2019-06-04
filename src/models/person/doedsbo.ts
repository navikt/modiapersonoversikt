import { Navn } from './person';

export interface Doedsbo {
    adressat: Adressat;
    adresselinje1: string;
    adresselinje2: string;
    postnummer: string;
    poststed: string;
    landkode?: string;
    master: string;
    registrert: string;
}

export interface Adressat {
    advokatSomAdressat: AdvokatSomAdressat | null;
    kontaktpersonMedIdNummerSomAdressat: KontaktpersonMedId | null;
    kontaktpersonUtenIdNummerSomAdressat: KontaktpersonUtenId | null;
    organisasjonSomAdressat: OrganisasjonSomAdressat | null;
}

export interface AdvokatSomAdressat {
    kontaktperson: Navn;
    organisasjonsnavn?: string;
    organisasjonsnummer?: number;
}

export interface OrganisasjonSomAdressat {
    kontaktperson?: Navn;
    organisasjonsnavn: string;
    organisasjonsnummer?: number;
}

export interface KontaktpersonMedId {
    idNummer: string;
    navn?: Navn;
}

export interface KontaktpersonUtenId {
    foedselsdato?: string;
    navn: Navn;
}
