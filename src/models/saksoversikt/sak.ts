import { Baksystem, Saksdato } from './fellesSak';

export interface Sak {
    temakode: string;
    saksid: string;
    fagsaksnummer: string;
    avsluttet: Saksdato;
    fagsystem: string;
    baksystem: Baksystem;
}
