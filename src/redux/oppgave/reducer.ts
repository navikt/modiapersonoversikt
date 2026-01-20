import { initialState, type OppgaveActions, OppgaveActionTypes, type OppgaveState } from './types';

// biome-ignore lint/style/useDefaultParameterLast: biome migration
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
