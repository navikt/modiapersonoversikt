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
        case OppfolgingActionTypes.SetSykefraverEkspandert:
            return {
                ...state,
                sykefraverEkspandert: action.ekspandert
            };
        case OppfolgingActionTypes.SetYtelserEkspandert:
            return {
                ...state,
                ytelserEkspandert: action.ekspandert
            };
        default:
            return state;
    }
}
