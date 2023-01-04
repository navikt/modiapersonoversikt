import { Baksystem } from './fellesSak';

export interface Sak {
    temakode: string;
    saksid: string;
    fagsaksnummer: string;
    avsluttet: string;
    fagsystem: string;
    baksystem: Baksystem;
}
