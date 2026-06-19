import type { DokumentmetadataBaksystem } from 'src/generated/modiapersonoversikt-api';

export interface Sak {
    temakode: string;
    saksid: string;
    fagsaksnummer: string;
    avsluttet: string;
    fagsystem: string;
    baksystem: DokumentmetadataBaksystem;
}
