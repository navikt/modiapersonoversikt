import { initialState, OppfolgingActions, OppfolgingActionTypes, OppfolgingState } from './types';

export function oppfolgingReducer(state: OppfolgingState = initialState, action: OppfolgingActions): OppfolgingState {
    switch (action.type) {
        case OppfolgingActionTypes.SetValgtPeriode:
            return {
                ...state,
                valgtPeriode: {
                    ...state.valgtPeriode,
                    ...action.periodeEndring
                }
            };
        default:
            return state;
    }
}
