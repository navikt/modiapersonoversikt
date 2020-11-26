import { Action } from 'redux';
import { getSaksbehandlerEnhetFraCookieDeprecated } from './saksbehandlersEnhetCookieUtils';
import { post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { AsyncDispatch } from '../ThunkTypes';

enum actions {
    VELG_ENHET = 'VELG_ENHET',
    SET_JOBBER_MED_STO = 'SET_JOBBER_MED_STO'
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

interface VelgEnhetAction extends Action {
    type: actions.VELG_ENHET;
    enhetId: string;
}

interface SetJobberMedSTOAction extends Action {
    type: actions.SET_JOBBER_MED_STO;
    jobberMedSTO: boolean;
}

export interface SessionState {
    valgtEnhetId?: string;
    jobberMedSTO: boolean;
}

const SessionInitState: SessionState = {
    valgtEnhetId: getSaksbehandlerEnhetFraCookieDeprecated(),
    jobberMedSTO: false
};

type Actions = VelgEnhetAction | SetJobberMedSTOAction;

export default function reducer(state: SessionState = SessionInitState, action: Actions): SessionState {
    switch (action.type) {
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
