import { useSelector } from 'react-redux';
import type { AppState } from 'src/redux/reducers';
import type { PeriodeOptions } from 'src/redux/utbetalinger/types';
import { initialState, type OppfolgingActions, OppfolgingActionTypes, type OppfolgingState } from './types';

// biome-ignore lint/style/useDefaultParameterLast: biome migration
export function oppfolgingReducer(state: OppfolgingState = initialState, action: OppfolgingActions): OppfolgingState {
    switch (action.type) {
        case OppfolgingActionTypes.SetValgtPeriode:
            return {
                ...state,
                periode: action.periodeEndring
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

export function useOppfolgingFilter(): PeriodeOptions {
    return useSelector((state: AppState) => Object.assign(state.oppfolging.periode) as PeriodeOptions);
}
