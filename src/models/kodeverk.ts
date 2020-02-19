export interface KodeverkResponse {
    kodeverk: Kodeverk[];
}

export enum KodeverkEtikett {
    TALESPRAk = 'Talespråktolk',
    TEGNSPRAK = 'Tegnspråktolk'
}

export enum KodeverkType {
    TALESPRAk = 'TALESPRAK',
    TEGNSPRAK = 'TEGNSPRAK'
}

export interface Kodeverk {
    type?: KodeverkType;
    kodeRef: string;
    beskrivelse: string;
}
