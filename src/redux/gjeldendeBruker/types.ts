import { Action } from 'redux';

export interface GjeldendeBrukerState {
    fødselsnummer: string;
}

export enum SetNyGjeldendeBrukerActionTypes {
    SetNyPerson = 'GJELDENDEBRUKER / SET'
}

export interface SetNyGjeldendeBrukerAction extends Action {
    type: SetNyGjeldendeBrukerActionTypes.SetNyPerson;
    fnr: string;
}

export type GjeldendeBrukerActions = SetNyGjeldendeBrukerAction;
