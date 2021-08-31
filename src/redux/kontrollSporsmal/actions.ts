import { ActionTypes, Roter, SetSporsmaal, Sporsmaal, Lukk } from './types';

export function setKontrollSpørsmål(spørsmål: Sporsmaal[]): SetSporsmaal {
    return {
        type: ActionTypes.SetSporsmaal,
        sporsmaal: spørsmål
    };
}

export function roterKontrollSpørsmål(): Roter {
    return {
        type: ActionTypes.Roter
    };
}

export function lukkKontrollSpørsmål(): Lukk {
    return {
        type: ActionTypes.Lukk
    };
}

export const resetKontrollSpørsmål = { type: ActionTypes.Reset };
