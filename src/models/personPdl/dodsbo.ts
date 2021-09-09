import { Adresse, Navn } from './person';

export interface Dodsbo {
    adressat: Adressat;
    adresse: Adresse;
    registrert: Date;
    skifteform: Skifteform;
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
    fodselsdato: Date | null;
}

export interface OrganisasjonSomAdressat {
    kontaktperson: Navn | null;
    organisasjonsnavn: string;
    organisasjonsnummer: string | null;
}

export enum Skifteform {
    Offentlig = 'OFFENTLIG',
    Annet = 'ANNET',
    Ukjent = 'UKJENT'
}
