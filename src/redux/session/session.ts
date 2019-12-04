import { Action } from 'redux';
import { getTemaFraCookie, setTemaCookie } from './plukkTemaCookie';
import { Temagruppe } from '../../models/Temagrupper';
import { getSaksbehandlerEnhetFraCookieDeprecated } from './saksbehandlersEnhetCookieUtils';
import { post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { AsyncDispatch } from '../ThunkTypes';

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

export function velgEnhetAction(enhetsId: string) {
    return (dispatch: AsyncDispatch) => {
        const action: VelgEnhetAction = {
            enhetId: enhetsId,
            type: actions.VELG_ENHET
        };
        post(`${apiBaseUri}/hode/velgenhet`, enhetsId, 'VelgEnhet').then(() => {
            dispatch(action);
        });
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
    valgtEnhetId: getSaksbehandlerEnhetFraCookieDeprecated()
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
            return {
                ...state,
                valgtEnhetId: action.enhetId
            };
        default:
            return state;
    }
}
