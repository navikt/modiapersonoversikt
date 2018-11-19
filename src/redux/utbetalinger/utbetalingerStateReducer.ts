import { Ytelse } from '../../models/utbetalinger';

export interface UtbetalingerReducerState {
    ytelseIFokus: Ytelse | null;
}

const initialState: UtbetalingerReducerState = {
    ytelseIFokus: null
};

enum actionKeys {
    SettYtelseIFokus = 'SettYtelseIFokus'
}

interface SettNyYtelseIFokus {
    type: actionKeys.SettYtelseIFokus;
    ytelse: Ytelse | null;
}

export function settNyYtelseIFokus(ytelse: Ytelse): SettNyYtelseIFokus {
    return {
        type: actionKeys.SettYtelseIFokus,
        ytelse: ytelse
    };
}

export type Actions = SettNyYtelseIFokus;

export function utbetalingerStateReducer(state: UtbetalingerReducerState = initialState, action: Actions)
    : UtbetalingerReducerState {
    switch (action.type) {
        case actionKeys.SettYtelseIFokus:
            return {
                ...state,
                ytelseIFokus: action.ytelse
            };
        default:
            return state;
    }
}
