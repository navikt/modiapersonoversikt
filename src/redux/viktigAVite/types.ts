import { Action } from 'redux';
import { Sakstema } from '../../models/saksoversikt/sakstema';

export type ViktigÅViteTemakoder = 'AAP' | 'DAG' | 'IND';

export interface ViktigÅViteTema extends Sakstema {
    temakode: ViktigÅViteTemakoder;
}

export function isViktigÅViteTema(tema: Sakstema): tema is ViktigÅViteTema {
    return tema.temakode === 'AAP' || tema.temakode === 'DAG' || tema.temakode === 'IND';
}

export const enum ViktigÅViteActionTypes {
    VIKTIGÅVITE_TEMA = 'VIKTIGÅVITE_TOGGLE',
    VIKTIGÅVITE_ÅPEN = 'VIKTIGÅVITE_ÅPEN_TOGGLE'
}

export type ViktigÅViteActions = SetTema | SetÅpen;

export interface SetTema extends Action {
    type: ViktigÅViteActionTypes.VIKTIGÅVITE_TEMA;
    tema?: ViktigÅViteTema;
}

export interface SetÅpen extends Action {
    type: ViktigÅViteActionTypes.VIKTIGÅVITE_ÅPEN;
    åpen: boolean;
}

export interface ViktigÅViteState {
    readonly åpentTema?: ViktigÅViteTema;
    readonly åpen: boolean;
}

export const initalState: ViktigÅViteState = {
    åpentTema: undefined,
    åpen: false
};
