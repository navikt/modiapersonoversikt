import { PeriodeValg, UtbetalingerState } from './types';
import { actionKeys, Actions } from './actions';
import dayjs from 'dayjs';
import { ISO_DATE_FORMAT } from 'src/utils/date-utils';

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
        ytelser: []
    }
};

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
            } else {
                return {
                    ...state,
                    ekspanderteYtelser: state.ekspanderteYtelser.filter((y) => y !== action.ytelse)
                };
            }
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
