import { Action } from 'redux';

export interface Svar {
    tekst: string;
    beskrivelse?: string;
}

export interface Sporsmal {
    sporsmal: string;
    svar: Svar[];
}

export interface KontrollSporsmalState {
    sporsmal?: Sporsmal[];
    open: boolean;
}

export const initState: KontrollSporsmalState = {
    sporsmal: undefined,
    open: true
};

export enum ActionTypes {
    Roter = 'KONTROLLSPØRSMAL / ROTER',
    SetSporsmal = 'KONTROLLSPØRSMÅL / SETSPØRSMÅL',
    Lukk = 'KONTROLLSPØRSMÅL / LUKK',
    Reset = 'KONTROLLSPØRSMÅL / RESET'
}

export type Actions = Roter | SetSporsmal | Lukk | Reset;

export interface Roter extends Action {
    type: ActionTypes.Roter;
}

export interface SetSporsmal extends Action {
    type: ActionTypes.SetSporsmal;
    sporsmal: Sporsmal[];
}

export interface Lukk extends Action {
    type: ActionTypes.Lukk;
}

export interface Reset extends Action {
    type: ActionTypes.Reset;
}
