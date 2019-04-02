import { ActionTypes, Roter, SetSpørsmål, Spørsmål, Lukk, Reset } from './types';

export function setKontrollSpørsmål(spørsmål: Spørsmål[]): SetSpørsmål {
    return {
        type: ActionTypes.SetSpørsmål,
        spørsmål: spørsmål
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

export function resetKontrollSpørsmål(): Reset {
    return {
        type: ActionTypes.Reset
    };
}
