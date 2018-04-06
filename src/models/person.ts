export interface Kontaktinformasjon {
    epost?: string;
}

export interface Person {
    navn: Navn;
    kjønn: string;
    geografiskTilknytning: string;
    fødselsnummer: string;
    alder: number;
    diskresjonskode?: string;
    kontaktinformasjon: Kontaktinformasjon;
}

export interface Navn {
    sammensatt: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
}
