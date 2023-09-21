import { Journalpost } from './journalpost';
import { Sak } from './sak';

export interface SakstemaResponse {
    resultat: SakstemaBehandlingskjede[];
}

export interface SakstemaSoknadsstatusResponse {
    resultat: SakstemaSoknadsstatus[];
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

export interface SakstemaBehandlingskjede extends Sakstema {
    behandlingskjeder: Behandlingskjede[];
}

export enum Behandlingsstatus {
    UnderBehandling = 'UNDER_BEHANDLING',
    FerdigBehandlet = 'FERDIG_BEHANDLET',
    Avbrutt = 'AVBRUTT'
}

export interface Behandlingskjede {
    status: Behandlingsstatus;
    sistOppdatert: string;
}

export interface SakstemaSoknadsstatus extends Sakstema {
    soknadsstatus: Soknadsstatus;
}

export interface AggregertSakstemaSoknadsstatus extends Sakstema {
    soknadsstatuser: Soknadsstatus[];
}

export interface Soknadsstatus {
    underBehandling: number;
    ferdigBehandlet: number;
    avbrutt: number;
    sistOppdatert?: string;
}
