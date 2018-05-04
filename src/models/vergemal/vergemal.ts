import { Navn } from '../person';

export interface Vergemal {
    verger: Verge[];
}

export interface Verge {
    ident: string;
    vergetype?: string;
    vergesakstype?: string;
    mandattype?: string;
    mandattekst?: string;
    embete?: string;
    virkningsperiode: Periode;
    navn: Navn;
}

export interface Periode {
    fom?: string;
    tom?: string;
}