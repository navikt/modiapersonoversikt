export interface MeldingerState {
    skjulVarsler: boolean;
    forrigeSok: string;
}

export const initialState: MeldingerState = {
    skjulVarsler: false,
    forrigeSok: ''
};

export enum MeldingerActionTypes {
    SkjulVarsler = 'SkjulVarsler',
    HuskSok = 'HuskSok'
}

export interface SetSkjulVarsler {
    type: MeldingerActionTypes.SkjulVarsler;
    skjul: boolean;
}

export interface HuskSok {
    type: MeldingerActionTypes.HuskSok;
    sok: string;
}

export type MeldingerActions = SetSkjulVarsler | HuskSok;
