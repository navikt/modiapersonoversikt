import { Action } from 'redux';
import { getTemaFraCookie, setTemaCookie } from './plukkTemaCookie';
import { Temagruppe } from '../../models/Temagrupper';

export enum actions {
    VELG_TEMAGRUPPE = 'VELG_TEMAGRUPPE'
}

export function velgTemagruppeForPlukk(temagruppe: Temagruppe): VelgTemagruppeAction {
    return {
        temagruppe: temagruppe,
        type: actions.VELG_TEMAGRUPPE
    };
}

interface VelgTemagruppeAction extends Action {
    type: actions.VELG_TEMAGRUPPE;
    temagruppe: Temagruppe;
}

export interface SessionState {
    temagruppeForPlukk?: Temagruppe;
}

export const SessionInitState: SessionState = {
    temagruppeForPlukk: getTemaFraCookie()
};

type Actions = VelgTemagruppeAction;

export default function reducer(state: SessionState = SessionInitState, action: Actions): SessionState {
    switch (action.type) {
        case actions.VELG_TEMAGRUPPE:
            setTemaCookie(action.temagruppe);
            return {
                ...state,
                temagruppeForPlukk: action.temagruppe
            };
        default:
            return state;
    }
}
