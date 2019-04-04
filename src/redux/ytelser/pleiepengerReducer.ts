import { Action } from 'redux';

export interface PleiepengerState {
    visAlleArbeidsforhold: boolean;
}

const initialState: PleiepengerState = {
    visAlleArbeidsforhold: false
};

enum actionKeys {
    TOGGLE_VIS_ALLE_ARBEIDSFORHOLD = 'TOGGLE / VIS ALLE ARBEIDSFORHOLD PLEIEPENGER'
}

interface ToggleVisAlleArbeidsforhold extends Action {
    type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD;
}

type Actions = ToggleVisAlleArbeidsforhold;

export function toggleVisAlleArbeidsforholdActionCreator(): ToggleVisAlleArbeidsforhold {
    return {
        type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD
    };
}

export function pleiepengerReducer(state: PleiepengerState = initialState, action: Actions): PleiepengerState {
    switch (action.type) {
        case actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD:
            return {
                ...state,
                visAlleArbeidsforhold: !state.visAlleArbeidsforhold
            };
        default:
            return state;
    }
}

export default pleiepengerReducer;
