import type { Action } from 'redux';

export interface DokumentAvsenderFilter {
    fraBruker: boolean;
    fraNav: boolean;
    fraAndre: boolean;
}

export interface SaksoversikState {
    viktigÅViteÅpen: boolean;
    avsenderFilter: DokumentAvsenderFilter;
}

export const initialState: SaksoversikState = {
    viktigÅViteÅpen: false,
    avsenderFilter: {
        fraBruker: true,
        fraNav: true,
        fraAndre: true
    }
};

export enum SaksoversiktActionTypes {
    SetViktigÅViteÅpen = 'SetViktigÅViteÅpen',
    SetDokumentAvsenderFilter = 'SetDokumentAvsenderFilter'
}

interface SetViktigÅViteÅpen extends Action {
    type: SaksoversiktActionTypes.SetViktigÅViteÅpen;
    åpen: boolean;
}

interface SetDokumentAvsenderFilter {
    type: SaksoversiktActionTypes.SetDokumentAvsenderFilter;
    filterEndring: Partial<DokumentAvsenderFilter>;
}

export type SaksoversiktActions = SetViktigÅViteÅpen | SetDokumentAvsenderFilter;
