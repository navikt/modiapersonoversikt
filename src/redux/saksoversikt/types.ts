import { Action } from 'redux';

export interface DokumentAvsenderFilter {
    fraBruker: boolean;
    fraNav: boolean;
    fraAndre: boolean;
}

export interface SaksoversikState {
    viktigÅViteÅpen: boolean;
    erStandaloneVindu: boolean;
    avsenderFilter: DokumentAvsenderFilter;
}

export const initialState: SaksoversikState = {
    viktigÅViteÅpen: false,
    erStandaloneVindu: false,
    avsenderFilter: {
        fraBruker: true,
        fraNav: true,
        fraAndre: true
    }
};

export enum SaksoversiktActionTypes {
    SetViktigÅViteÅpen = 'SetViktigÅViteÅpen',
    SetErStandaloneVindu = 'SetErStandaloneVindu',
    SetDokumentAvsenderFilter = 'SetDokumentAvsenderFilter'
}

export interface SetViktigÅViteÅpen extends Action {
    type: SaksoversiktActionTypes.SetViktigÅViteÅpen;
    åpen: boolean;
}

export interface SetErStandaloneVindu extends Action {
    type: SaksoversiktActionTypes.SetErStandaloneVindu;
    standaloneVindu: boolean;
}

export interface SetDokumentAvsenderFilter {
    type: SaksoversiktActionTypes.SetDokumentAvsenderFilter;
    filterEndring: Partial<DokumentAvsenderFilter>;
}

export type SaksoversiktActions = SetViktigÅViteÅpen | SetErStandaloneVindu | SetDokumentAvsenderFilter;
