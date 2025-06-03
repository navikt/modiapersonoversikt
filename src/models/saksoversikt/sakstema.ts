import type { Journalpost } from './journalpost';
import type { Sak } from './sak';

export interface SakstemaResponse {
    resultat: Sakstema[];
}

export interface Sakstema {
    harTilgang: boolean;
    temakode: string;
    temanavn: string;
    erGruppert: boolean;
    dokumentMetadata: Journalpost[];
    tilhorendeSaker: Sak[];
    feilkoder: number[];
}
