import { Navn } from './person';

export interface Verge {
    ident: string | null;
    navn: Navn | null;
    vergesakstype: string | null;
    omfang: string | null;
    embete: string | null;
    gyldighetstidspunkt: Date | null;
    opphoerstidspunkt: Date | null;
}
