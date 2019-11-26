import { Action } from 'redux';
import { Pleiepengerettighet } from '../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet } from '../../models/ytelse/foreldrepenger';
import { Sykepenger } from '../../models/ytelse/sykepenger';

type Ytelse = Pleiepengerettighet | Foreldrepengerettighet | Sykepenger;

export interface YtelserState {
    visAlleArbeidsforhold: boolean;
    aapnedeYtesler: Ytelse[];
}

const initialState: YtelserState = {
    visAlleArbeidsforhold: false,
    aapnedeYtesler: []
};

enum actionKeys {
    TOGGLE_VIS_ALLE_ARBEIDSFORHOLD = 'TOGGLE / VIS ALLE ARBEIDSFORHOLD',
    TOGGLE_APNEYTELSE = 'TOGGLE_APNEYTELSE'
}

interface ToggleVisAlleArbeidsforhold extends Action {
    type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD;
}

interface ToggleVisYtelse extends Action {
    type: actionKeys.TOGGLE_APNEYTELSE;
    ytelse: Ytelse;
    vis: boolean;
}

type Actions = ToggleVisAlleArbeidsforhold | ToggleVisYtelse;

export function toggleVisAlleArbeidsforholdActionCreator(): ToggleVisAlleArbeidsforhold {
    return {
        type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD
    };
}

export function toggleVisYtesle(ytelse: Ytelse, vis: boolean): ToggleVisYtelse {
    return {
        type: actionKeys.TOGGLE_APNEYTELSE,
        ytelse: ytelse,
        vis: vis
    };
}

export function ytelserReducer(state: YtelserState = initialState, action: Actions): YtelserState {
    switch (action.type) {
        case actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD:
            return {
                ...state,
                visAlleArbeidsforhold: !state.visAlleArbeidsforhold
            };
        case actionKeys.TOGGLE_APNEYTELSE:
            const aapnedeYtelser = action.vis
                ? [...state.aapnedeYtesler, action.ytelse]
                : state.aapnedeYtesler.filter(it => it !== action.ytelse);
            return {
                ...state,
                aapnedeYtesler: aapnedeYtelser
            };
        default:
            return state;
    }
}

export default ytelserReducer;
