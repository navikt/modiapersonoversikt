export interface MeldingerState {
    forrigeSok: string;
}

export const initialState: MeldingerState = {
    forrigeSok: ''
};

export enum MeldingerActionTypes {
    HuskSok = 'HuskSok'
}

export interface HuskSok {
    type: MeldingerActionTypes.HuskSok;
    sok: string;
}

export type MeldingerActions = HuskSok;
