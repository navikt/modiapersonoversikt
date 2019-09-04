import { Action } from 'redux';
import { AppState } from '../reducers';
import { useSelector } from 'react-redux';

export interface GjeldendeBrukerState {
    fødselsnummer: string;
}

export enum SetNyGjeldendeBrukerActionTypes {
    SetNyPerson = 'GJELDENDEBRUKER / SET'
}

export interface SetNyGjeldendeBrukerAction extends Action<SetNyGjeldendeBrukerActionTypes.SetNyPerson> {
    fnr: string;
}

export type GjeldendeBrukerActions = SetNyGjeldendeBrukerAction;

export function useGjeldendeBruker(): string {
    return useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
}
