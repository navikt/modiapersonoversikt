import { Action } from 'redux';

export interface SykepengerState {
    visAlleArbeidsforhold: boolean;
}

const initialState: SykepengerState = {
    visAlleArbeidsforhold: false
};

enum actionKeys {
    TOGGLE_VIS_ALLE_ARBEIDSFORHOLD = 'TOGGLE / VIS ALLE ARBEIDSFORHOLD SYKEPENGER'
}

interface ToggleVisAlleArbeidsforhold extends Action {
    type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD;
}

type Actions = ToggleVisAlleArbeidsforhold;

export function toggleVisAlleArbeidsforholdSykepengerActionCreator(): ToggleVisAlleArbeidsforhold {
    return {
        type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD
    };
}

export function sykepengerReducer(state: SykepengerState = initialState, action: Actions): SykepengerState {
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

export default sykepengerReducer;
