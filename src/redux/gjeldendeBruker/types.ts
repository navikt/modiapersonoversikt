import { useSelector } from 'react-redux';
import type { Action } from 'redux';
import type { AppState } from '../reducers';

export interface GjeldendeBrukerState {
    fødselsnummer: string;
    hasLoaded?: boolean;
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
