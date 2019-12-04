import { Action } from 'redux';
import { getTemaFraCookie, setTemaCookie } from './plukkTemaCookie';
import { Temagruppe } from '../../models/Temagrupper';
import { getSaksbehandlerEnhetUtenFeilHandtering } from '../../utils/loggInfo/saksbehandlersEnhetInfo';
import { post } from '../../api/api';
import { apiBaseUri } from '../../api/config';

export enum actions {
    VELG_TEMAGRUPPE = 'VELG_TEMAGRUPPE',
    VELG_ENHET = 'VELG_ENHET'
}

export function velgTemagruppeForPlukk(temagruppe: Temagruppe): VelgTemagruppeAction {
    return {
        temagruppe: temagruppe,
        type: actions.VELG_TEMAGRUPPE
    };
}

export function velgEnhetAction(enhetsId: string): VelgEnhetAction {
    return {
        enhetId: enhetsId,
        type: actions.VELG_ENHET
    };
}

interface VelgTemagruppeAction extends Action {
    type: actions.VELG_TEMAGRUPPE;
    temagruppe: Temagruppe;
}

interface VelgEnhetAction extends Action {
    type: actions.VELG_ENHET;
    enhetId: string;
}

export interface SessionState {
    temagruppeForPlukk?: Temagruppe;
    valgtEnhetId?: string;
}

export const SessionInitState: SessionState = {
    temagruppeForPlukk: getTemaFraCookie(),
    valgtEnhetId: getSaksbehandlerEnhetUtenFeilHandtering()
};

type Actions = VelgTemagruppeAction | VelgEnhetAction;

export default function reducer(state: SessionState = SessionInitState, action: Actions): SessionState {
    switch (action.type) {
        case actions.VELG_TEMAGRUPPE:
            setTemaCookie(action.temagruppe);
            return {
                ...state,
                temagruppeForPlukk: action.temagruppe
            };
        case actions.VELG_ENHET:
            post(`${apiBaseUri}/hode/velgenhet`, action.enhetId, 'VelgEnhet-SessionReducer');
            return {
                ...state,
                valgtEnhetId: action.enhetId
            };
        default:
            return state;
    }
}
