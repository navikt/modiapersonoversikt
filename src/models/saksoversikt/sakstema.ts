import { Journalpost } from './journalpost';
import { Sak } from './sak';
import { Saksdato } from './fellesSak';

export interface SakstemaResponse {
    resultat: Sakstema[];
}

export interface Sakstema {
    harTilgang: boolean;
    temakode: string;
    temanavn: string;
    erGruppert: boolean;
    behandlingskjeder: Behandlingskjede[];
    journalPoster: Journalpost[];
    tilhørendeSaker: Sak[];
    feilkoder: number[];
}

export enum Behandlingsstatus {
    UnderBehandling = 'UNDER_BEHANDLING',
    FerdigBehandlet = 'FERDIG_BEHANDLET',
    Avbrutt = 'AVBRUTT'
}

export interface Behandlingskjede {
    status: Behandlingsstatus;
    sistOppdatert: Saksdato;
}
