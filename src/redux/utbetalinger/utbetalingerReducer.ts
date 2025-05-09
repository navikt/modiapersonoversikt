import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import type { AppState } from 'src/redux/reducers';
import { ISO_DATE_FORMAT } from 'src/utils/date-utils';
import { type Actions, actionKeys } from './actions';
import { PeriodeValg, type UtbetalingFilterState, type UtbetalingerState } from './types';

const initialState: UtbetalingerState = {
    ytelseIFokus: null,
    ekspanderteYtelser: [],
    filter: {
        periode: {
            radioValg: PeriodeValg.SISTE_30_DAGER,
            egendefinertPeriode: {
                fra: dayjs().subtract(1, 'month').format(ISO_DATE_FORMAT),
                til: dayjs().format(ISO_DATE_FORMAT)
            }
        },
        utbetaltTil: [],
        ytelser: {}
    }
};

// biome-ignore lint/style/useDefaultParameterLast: biome migration
export function utbetalingerReducer(state: UtbetalingerState = initialState, action: Actions): UtbetalingerState {
    switch (action.type) {
        case actionKeys.SettYtelseIFokus:
            return {
                ...state,
                ytelseIFokus: action.ytelse
            };
        case actionKeys.SetEkspanderYtelse:
            if (action.ekspander) {
                return {
                    ...state,
                    ekspanderteYtelser: [...state.ekspanderteYtelser, action.ytelse]
                };
            }
            return {
                ...state,
                ekspanderteYtelser: state.ekspanderteYtelser.filter((y) => y !== action.ytelse)
            };
        case actionKeys.OppdaterFilter:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.change
                }
            };
        default:
            return state;
    }
}

export function useUtbetalingerFilter(): UtbetalingFilterState {
    return useSelector((state: AppState) => Object.assign(state.utbetalinger.filter) as UtbetalingFilterState);
}
