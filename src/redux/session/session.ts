import { Action } from 'redux';
import { getTemaFraCookie, setTemaCookie } from './plukkTemaCookie';
import { Temagruppe } from '../../models/Temagrupper';
import { getSaksbehandlerEnhetFraCookieDeprecated } from './saksbehandlersEnhetCookieUtils';
import { post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { AsyncDispatch } from '../ThunkTypes';

enum actions {
    VELG_TEMAGRUPPE = 'VELG_TEMAGRUPPE',
    VELG_ENHET = 'VELG_ENHET',
    SET_JOBBER_MED_STO = 'SET_JOBBER_MED_STO'
}

export function velgTemagruppeForPlukk(temagruppe: Temagruppe): VelgTemagruppeAction {
    return {
        temagruppe: temagruppe,
        type: actions.VELG_TEMAGRUPPE
    };
}

export function setJobberMedSTO(jobberMedSTO: boolean): SetJobberMedSTOAction {
    return {
        jobberMedSTO: jobberMedSTO,
        type: actions.SET_JOBBER_MED_STO
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

interface SetJobberMedSTOAction extends Action {
    type: actions.SET_JOBBER_MED_STO;
    jobberMedSTO: boolean;
}

export interface SessionState {
    temagruppeForPlukk?: Temagruppe;
    valgtEnhetId?: string;
    jobberMedSTO: boolean;
}

const SessionInitState: SessionState = {
    temagruppeForPlukk: getTemaFraCookie(),
    valgtEnhetId: getSaksbehandlerEnhetFraCookieDeprecated(),
    jobberMedSTO: false
};

type Actions = VelgTemagruppeAction | VelgEnhetAction | SetJobberMedSTOAction;

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
        case actions.SET_JOBBER_MED_STO:
            return {
                ...state,
                jobberMedSTO: action.jobberMedSTO
            };
        default:
            return state;
    }
}
