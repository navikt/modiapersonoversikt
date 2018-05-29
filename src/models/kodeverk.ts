export interface KodeverkResponse {
    kodeverk: Kodeverk[];
}

export interface Kodeverk {
    value: string;
    kodeRef: string;
    beskrivelse: string;
    gyldig: boolean;
}