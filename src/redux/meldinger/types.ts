import { Traad } from '../../models/meldinger/meldinger';

export interface MeldingerState {
    forrigeValgteTraad?: Traad;
    skjulVarsler: boolean;
    forrigeSok: string;
}

export const initialState: MeldingerState = {
    forrigeValgteTraad: undefined,
    skjulVarsler: false,
    forrigeSok: ''
};

export enum MeldingerActionTypes {
    HuskValgtTraad = 'SetValgtTraad',
    SkjulVarsler = 'SkjulVarsler',
    HuskSok = 'HuskSok'
}

export interface HuskValgtTraad {
    type: MeldingerActionTypes.HuskValgtTraad;
    traad?: Traad;
}

export interface SetSkjulVarsler {
    type: MeldingerActionTypes.SkjulVarsler;
    skjul: boolean;
}

export interface HuskSok {
    type: MeldingerActionTypes.HuskSok;
    sok: string;
}

export type MeldingerActions = HuskValgtTraad | SetSkjulVarsler | HuskSok;
