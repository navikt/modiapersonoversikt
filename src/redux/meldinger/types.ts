import { Traad } from '../../models/meldinger/meldinger';

export interface MeldingerState {
    valgtTraad?: Traad;
}

export const initialState: MeldingerState = {
    valgtTraad: undefined
};

export enum MeldingerActionTypes {
    SetValgtTraad = 'SetValgtTraad'
}

export interface SetValgtTraad {
    type: MeldingerActionTypes.SetValgtTraad;
    traad: Traad;
}

export type MeldingerActions = SetValgtTraad;
