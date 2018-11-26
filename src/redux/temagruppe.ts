import { Action } from 'redux';

export const enum actions {
    VELG_TEMAGRUPPE = 'VELG_TEMAGRUPPE'
}

export function velgTemagruppe(temagruppe: string): TemagruppeAction {
    return {
        temagruppe: temagruppe,
        type: actions.VELG_TEMAGRUPPE
    };
}

interface TemagruppeAction extends Action {
    type: actions.VELG_TEMAGRUPPE;
    temagruppe: string;
}

export interface TemagruppeState {
    valgtTemagruppe?: string;
}

export const TemagruppeInitState = {
    valgtTemagruppe: undefined
};

export default function reducer(state: TemagruppeState = TemagruppeInitState, action: TemagruppeAction) {
    switch (action.type) {
        case actions.VELG_TEMAGRUPPE:
            return {
                ...state,
                valgtTemagruppe: action.temagruppe
            };
        default:
            return state;
    }
}