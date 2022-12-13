import { Baksystem } from './fellesSak';

export interface Sak {
    temakode: string;
    saksid: string;
    fagsaksnummer: string;
    avsluttetV2: string;
    fagsystem: string;
    baksystem: Baksystem;
}
