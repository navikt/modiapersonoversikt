export interface Kontaktinformasjon {
    epost?: {
        sistOppdatert: string;
        value: string;
    };
}

export interface Person {
    navn: Navn;
    kjønn: string;
    geografiskTilknytning: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: string;
}

export interface Navn {
    sammensatt: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
}
