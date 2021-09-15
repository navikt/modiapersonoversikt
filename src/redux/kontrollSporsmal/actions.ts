import { ActionTypes, Roter, SetSporsmal, Sporsmal, Lukk } from './types';

export function setKontrollSporsmal(sporsmal: Sporsmal[]): SetSporsmal {
    return {
        type: ActionTypes.SetSporsmal,
        sporsmal: sporsmal
    };
}

export function roterKontrollSporsmal(): Roter {
    return {
        type: ActionTypes.Roter
    };
}

export function lukkKontrollSporsmal(): Lukk {
    return {
        type: ActionTypes.Lukk
    };
}

export const resetKontrollSporsmal = { type: ActionTypes.Reset };
