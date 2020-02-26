export interface KodeverkResponse {
    kodeverk: Kodeverk[];
}

export enum TilrettelagtKommunikasjonMapper {
    TALESPRAK = 'Talespråktolk',
    TEGNSPRAK = 'Tegnspråktolk'
}

export enum TilrettelagtKommunikasjonType {
    TALESPRAK = 'TALESPRAK',
    TEGNSPRAK = 'TEGNSPRAK'
}

export interface Kodeverk {
    type?: TilrettelagtKommunikasjonType;
    kodeRef: string;
    beskrivelse: string;
}
