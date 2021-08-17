import { Navn } from '../person/person';

export interface Verge {
    ident?: string;
    navn?: Navn;
    vergesakstype?: string;
    omfang?: string;
    embete?: string;
    gyldighetstidspunkt?: string;
    opphoerstidspunkt: string | null;
}
