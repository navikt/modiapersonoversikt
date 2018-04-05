export interface Person {
    navn: Navn;
    kjønn: string;
    geografiskTilknytning: string;
    fødselsnummer: string;
    alder: number;
}

export interface Navn {
    sammensatt: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
}
