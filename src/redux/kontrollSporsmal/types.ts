import { Action } from 'redux';

export interface Svar {
    tekst: string;
    beskrivelse?: string;
}

export interface Spørsmål {
    spørsmål: string;
    svar: Svar[];
}

export interface KontrollSpørsmålState {
    spørsmål?: Spørsmål[];
    synlig: boolean;
}

export const initState: KontrollSpørsmålState = {
    spørsmål: undefined,
    synlig: true
};

export enum ActionTypes {
    Roter = 'KONTROLLSPØRSMAL / ROTER',
    SetSpørsmål = 'KONTROLLSPØRSMÅL / SETSPØRSMÅL',
    Lukk = 'KONTROLLSPØRSMÅL / LUKK',
    Reset = 'KONTROLLSPØRSMÅL / RESET'
}

export type Actions = Roter | SetSpørsmål | Lukk | Reset;

export interface Roter extends Action {
    type: ActionTypes.Roter;
}

export interface SetSpørsmål extends Action {
    type: ActionTypes.SetSpørsmål;
    spørsmål: Spørsmål[];
}

export interface Lukk extends Action {
    type: ActionTypes.Lukk;
}

export interface Reset extends Action {
    type: ActionTypes.Reset;
}
