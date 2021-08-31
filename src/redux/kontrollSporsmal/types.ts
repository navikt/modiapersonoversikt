import { Action } from 'redux';

export interface Svar {
    tekst: string;
    beskrivelse?: string;
}

export interface Sporsmaal {
    sporsmaal: string;
    svar: Svar[];
}

export interface KontrollSporsmaalState {
    sporsmaal?: Sporsmaal[];
    open: boolean;
}

export const initState: KontrollSporsmaalState = {
    sporsmaal: undefined,
    open: true
};

export enum ActionTypes {
    Roter = 'KONTROLLSPØRSMAL / ROTER',
    SetSporsmaal = 'KONTROLLSPØRSMÅL / SETSPØRSMÅL',
    Lukk = 'KONTROLLSPØRSMÅL / LUKK',
    Reset = 'KONTROLLSPØRSMÅL / RESET'
}

export type Actions = Roter | SetSporsmaal | Lukk | Reset;

export interface Roter extends Action {
    type: ActionTypes.Roter;
}

export interface SetSporsmaal extends Action {
    type: ActionTypes.SetSporsmaal;
    sporsmaal: Sporsmaal[];
}

export interface Lukk extends Action {
    type: ActionTypes.Lukk;
}

export interface Reset extends Action {
    type: ActionTypes.Reset;
}
