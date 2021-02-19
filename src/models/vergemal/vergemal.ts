import { Navn } from '../person/person';

export interface Vergemal {
    verger: Verge[];
}

export interface Verge {
    ident?: string;
    navn?: Navn;
    vergesakstype?: string;
    omfang?: string;
    embete?: string;
    gyldighetstidspunkt?: string;
    opphoerstidspunkt?: string;
}

export interface Periode {
    fom?: string;
    tom?: string;
}
