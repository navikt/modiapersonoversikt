import { Action } from 'redux';

export interface GjeldendeBrukerState {
    fødselsnummer: string;
}

export enum SetNyGjeldendeBrukerActionTypes {
    SetNyPerson = 'SetNyPerson'
}

export interface SetNyGjeldendeBrukerAction extends Action {
    type: SetNyGjeldendeBrukerActionTypes.SetNyPerson;
    fnr: string;
}

export type GjeldendeBrukerActions = SetNyGjeldendeBrukerAction;
