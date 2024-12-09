import { OppgaveActionTypes, type OppgaveActions, type OppgaveState, initialState } from './types';

export function oppgaverReducer(state: OppgaveState = initialState, action: OppgaveActions): OppgaveState {
    switch (action.type) {
        case OppgaveActionTypes.SetDialogpanelTraad:
            return {
                ...state,
                dialogpanelTraad: action.traad
            };
        case OppgaveActionTypes.NullstillDialogpanelTraad:
            return {
                ...state,
                dialogpanelTraad: undefined
            };
        default:
            return state;
    }
}
