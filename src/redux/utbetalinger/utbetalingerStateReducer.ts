import { Ytelse } from '../../models/utbetalinger';

export interface UtbetalingerReducerState {
    ytelseIFokus: Ytelse | null;
    ekspanderteYtelser: Ytelse[];
}

const initialState: UtbetalingerReducerState = {
    ytelseIFokus: null,
    ekspanderteYtelser: []
};

enum actionKeys {
    SettYtelseIFokus = 'SettYtelseIFokus',
    SetEkspanderYtelse = 'SetEkspanderYtelse'
}

interface SetNyYtelseIFokus {
    type: actionKeys.SettYtelseIFokus;
    ytelse: Ytelse | null;
}

interface SetEkspanderYtelse {
    type: actionKeys.SetEkspanderYtelse;
    ekspander: boolean;
    ytelse: Ytelse;
}

export function setNyYtelseIFokus(ytelse: Ytelse | null): SetNyYtelseIFokus {
    return {
        type: actionKeys.SettYtelseIFokus,
        ytelse: ytelse
    };
}

export function setEkspanderYtelse(ytelse: Ytelse, ekspander: boolean): SetEkspanderYtelse {
    return {
        type: actionKeys.SetEkspanderYtelse,
        ekspander: ekspander,
        ytelse: ytelse
    };
}

export type Actions = SetNyYtelseIFokus | SetEkspanderYtelse;

export function utbetalingerStateReducer(state: UtbetalingerReducerState = initialState, action: Actions)
    : UtbetalingerReducerState {
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
                    ekspanderteYtelser: state.ekspanderteYtelser.filter(y => y !== action.ytelse)
                };
            }
        default:
            return state;
    }
}
