import { Action } from 'redux';
import { Pleiepengerettighet } from '../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet } from '../../models/ytelse/foreldrepenger';
import { Sykepenger } from '../../models/ytelse/sykepenger';
import {PeriodeOptions, PeriodeValg} from "../utbetalinger/types";
import dayjs from "dayjs";
import {ISO_DATE_STRING_FORMAT} from "nav-datovelger/lib/utils/dateFormatUtils";

type Ytelse = Pleiepengerettighet | Foreldrepengerettighet | Sykepenger;

export interface YtelserState {
    visAlleArbeidsforhold: Ytelse[];
    aapnedeYtesler: Ytelse[];
    periode: PeriodeOptions;
}

const initialState: YtelserState = {
    visAlleArbeidsforhold: [],
    aapnedeYtesler: [],
    periode: {
        radioValg: PeriodeValg.SISTE_30_DAGER,
        egendefinertPeriode: {
            fra: dayjs().subtract(1, 'month').format(ISO_DATE_STRING_FORMAT),
            til: dayjs().format(ISO_DATE_STRING_FORMAT)
        }
    }
};

enum actionKeys {
    TOGGLE_VIS_ALLE_ARBEIDSFORHOLD = 'TOGGLE / VIS ALLE ARBEIDSFORHOLD',
    TOGGLE_APNEYTELSE = 'TOGGLE_APNEYTELSE'
}

interface ToggleVisAlleArbeidsforhold extends Action {
    type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD;
    ytelse: Ytelse;
    vis: boolean;
}

interface ToggleVisYtelse extends Action {
    type: actionKeys.TOGGLE_APNEYTELSE;
    ytelse: Ytelse;
    vis: boolean;
}

type Actions = ToggleVisAlleArbeidsforhold | ToggleVisYtelse;

export function toggleVisAlleArbeidsforhold(ytelse: Ytelse, vis: boolean): ToggleVisAlleArbeidsforhold {
    return {
        type: actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD,
        ytelse: ytelse,
        vis: vis
    };
}

function ytelserReducer(state: YtelserState = initialState, action: Actions): YtelserState {
    switch (action.type) {
        case actionKeys.TOGGLE_VIS_ALLE_ARBEIDSFORHOLD:
            // eslint-disable-next-line no-case-declarations
            const aapnedeArbeidsforhold = action.vis
                ? [...state.aapnedeYtesler, action.ytelse]
                : state.visAlleArbeidsforhold.filter((it) => it !== action.ytelse);
            return {
                ...state,
                visAlleArbeidsforhold: aapnedeArbeidsforhold
            };
        case actionKeys.TOGGLE_APNEYTELSE:
            // eslint-disable-next-line no-case-declarations
            const aapnedeYtelser = action.vis
                ? [...state.aapnedeYtesler, action.ytelse]
                : state.aapnedeYtesler.filter((it) => it !== action.ytelse);
            return {
                ...state,
                aapnedeYtesler: aapnedeYtelser
            };
        default:
            return state;
    }
}

export default ytelserReducer;
