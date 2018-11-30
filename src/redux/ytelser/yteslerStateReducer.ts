export enum YtelseValg {
    Foreldrepenger = 'Foreldrepenger',
    Sykepenger = 'Sykepenger',
    Pleiepenger = 'Pleiepenger'
}

export interface YtelserState {
    valgtYtelse: YtelseValg;
}

const initialState: YtelserState = {
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

export function ytelserReducer(state: YtelserState = initialState, action: Actions): YtelserState {
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
