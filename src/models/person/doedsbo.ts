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
    advokatSomAdressat?: AdvokatSomAdressat;
    kontaktpersonMedIdNummerSomAdressat?: KontaktpersonMedId;
    kontaktpersonUtenIdNummerSomAdressat?: KontaktpersonUtenId;
    organisasjonSomAdressat?: OrganisasjonSomAdressat;
}

export interface AdvokatSomAdressat {
    kontaktperson: Personnavn;
    organisasjonsnavn?: string;
    organisasjonsnummer?: number;
}

export interface OrganisasjonSomAdressat {
    kontaktperson?: Personnavn;
    organisasjonsnavn: string;
    organisasjonsnummer?: number;
}

export interface KontaktpersonMedId {
    idNummer: number;
    navn?: Personnavn;
}

export interface KontaktpersonUtenId {
    foedselsdato?: string;
    navn: Personnavn;
}

export interface Personnavn {
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
}
