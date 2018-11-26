import { actionKeys, Actions, initialState, SaksoversiktReduxState } from './types';

export function saksoversiktReducer(state: SaksoversiktReduxState = initialState, action: Actions) {
    switch (action.type) {
        case actionKeys.SetValgtSakstema:
            return {
                ...state,
                valgtSakstema: action.sakstema
            };
        case actionKeys.SetVisDokument:
            return {
                ...state,
                visDokument: action.vis
            };
        case actionKeys.SetValgtDokument:
            return {
                ...state,
                valgtDokument: action.dokument
            };
        case actionKeys.SetValgtEnkeltdokument:
            return {
                ...state,
                valgtEnkeltdokument: action.enkeltdokument
            };
        default:
            return state;
    }
}
