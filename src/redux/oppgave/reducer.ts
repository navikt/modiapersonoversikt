import { initialState, OppgaveActionTypes, OppgaveActions, OppgaveState } from './types';

export function oppgaverReducer(state: OppgaveState = initialState, action: OppgaveActions): OppgaveState {
    switch (action.type) {
        case OppgaveActionTypes.SetDialogpanelTraad:
            return {
                ...state,
                dialogpanelTraad: action.traad
            };
        default:
            return state;
    }
}
