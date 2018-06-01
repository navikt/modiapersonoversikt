export interface KodeverkResponse {
    kodeverk: Kodeverk[];
}

export interface Kodeverk {
    value: string;
    kodeRef: string;
    kodeverkRef?: string | null;
    beskrivelse: string;
    gyldig: boolean;
}