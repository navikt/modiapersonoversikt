import { ActionTypes, Roter, SetSpørsmål, Spørsmål, ToggleSynlig } from './types';

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

export function toggleKontrollSpørsmål(): ToggleSynlig {
    return {
        type: ActionTypes.ToggleSynlig
    };
}