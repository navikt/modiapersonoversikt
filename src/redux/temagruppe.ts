import { Action } from 'redux';



export enum actions {
    VELG_TEMAGRUPPE = 'VELG_TEMAGRUPPE'
}

export function velgTemagruppe(temagruppe: string): TemagruppeAction {
    return {
        temagruppe: temagruppe,
        type: actions.VELG_TEMAGRUPPE
    };
}

export interface TemagruppeAction extends Action {
    type: actions.VELG_TEMAGRUPPE
    temagruppe: string;
}

export interface TemagruppeState {
    temagruppe: string
}

export const temagruppeInitState = {
    temagruppe: ''
};

export default function reducer(state: TemagruppeState = temagruppeInitState, action: Action) {
    switch (action.type) {
        case actions.VELG_TEMAGRUPPE:
            return state
        default:
            return state;
    }
}
