import { Traad } from '../../models/meldinger/meldinger';

export interface MeldingerState {
    forrigeValgteTraad?: Traad;
    skjulVarsler: boolean;
}

export const initialState: MeldingerState = {
    forrigeValgteTraad: undefined,
    skjulVarsler: false
};

export enum MeldingerActionTypes {
    HuskValgtTraad = 'SetValgtTraad',
    SkjulVarsler = 'SkjulVarsler'
}

export interface HuskValgtTraad {
    type: MeldingerActionTypes.HuskValgtTraad;
    traad?: Traad;
}

export interface SetSkjulVarsler {
    type: MeldingerActionTypes.SkjulVarsler;
    skjul: boolean;
}

export type MeldingerActions = HuskValgtTraad | SetSkjulVarsler;
