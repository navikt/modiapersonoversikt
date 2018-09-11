import { LocalDateTimeType } from '../../utils/localDateTimeUtils';
import { DokumentMetadata } from './dokumentmetadata';
import { Sak } from './sak';

export interface SakstemaWrapper {
    resultat: Sakstema[];
}

export interface Sakstema {
    harTilgang: boolean;
    temakode: string;
    temanavn: string;
    erGruppert: boolean;
    behandlingskjeder: Behandlingskjede[];
    dokumentMetadata: DokumentMetadata[];
    tilhorendeSaker: Sak[];
    feilkoder: number[];
}

export enum Behandlingsstatus {
    UnderBehandling = 'UNDER_BEHANDLING',
    FerdigBehandlet = 'FERDIG_BEHANDLET',
    Avbrutt = 'AVBRUTT'
}

export interface Behandlingskjede {
    status: Behandlingsstatus;
    sistOppdatert: LocalDateTimeType;
}