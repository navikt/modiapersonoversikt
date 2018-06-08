import { Navn } from '../person/person';
import { Kodeverk } from '../kodeverk';

export interface Vergemal {
    verger: Verge[];
}

export interface Verge {
    ident: string;
    vergetype?: Kodeverk;
    vergesakstype?: Kodeverk;
    mandattype?: Kodeverk;
    mandattekst?: string;
    embete?: Kodeverk;
    virkningsperiode: Periode;
    navn: Navn;
}

export interface Periode {
    fom?: string;
    tom?: string;
}