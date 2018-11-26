export enum YtelseValg {
    Foreldrepenger = 'Foreldrepenger',
    Sykepenger = 'Sykepenger',
    Pleiepenger = 'Pleiepenger'
}

export interface YtelserReducerState {
    valgtYtelse: YtelseValg;
}

const initialState: YtelserReducerState = {
    valgtYtelse: YtelseValg.Foreldrepenger
};

enum actionKeys {
    SetValgtYtelse = 'setValgtYtelse'
}

interface VelgNyYtelse {
    type: actionKeys.SetValgtYtelse;
    ytelse: YtelseValg;
}

type Actions = VelgNyYtelse;

export function setVistYtelse(ytelse: YtelseValg): VelgNyYtelse {
    return {
        type: actionKeys.SetValgtYtelse,
        ytelse: ytelse
    };
}

export function ytelserStateReducer(state: YtelserReducerState = initialState, action: Actions): YtelserReducerState {
    switch (action.type) {
        case actionKeys.SetValgtYtelse:
            return {
                ...state,
                valgtYtelse: action.ytelse
            };
        default:
            return state;
    }
}
