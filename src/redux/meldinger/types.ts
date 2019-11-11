import { Traad } from '../../models/meldinger/meldinger';

export interface MeldingerState {
    forrigeValgteTraad?: Traad;
}

export const initialState: MeldingerState = {
    forrigeValgteTraad: undefined
};

export enum MeldingerActionTypes {
    HuskValgtTraad = 'SetValgtTraad'
}

export interface HuskValgtTraad {
    type: MeldingerActionTypes.HuskValgtTraad;
    traad?: Traad;
}

export type MeldingerActions = HuskValgtTraad;
