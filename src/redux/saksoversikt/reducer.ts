import { initialState, SaksoversikState, SaksoversiktActions, SaksoversiktActionTypes } from './types';

export function saksoversiktReducer(state: SaksoversikState = initialState, action: SaksoversiktActions)
    : SaksoversikState {

    switch (action.type) {
        case SaksoversiktActionTypes.SetValgtSakstema:
            return {
                ...state,
                valgtSakstema: action.sakstema
            };
        case SaksoversiktActionTypes.SetVisDokument:
            return {
                ...state,
                visDokument: action.vis
            };
        case SaksoversiktActionTypes.SetValgtDokument:
            return {
                ...state,
                valgtDokument: action.dokument
            };
        case SaksoversiktActionTypes.SetValgtEnkeltdokument:
            return {
                ...state,
                valgtEnkeltdokument: action.enkeltdokument
            };
        case SaksoversiktActionTypes.SetViktigÅViteÅpen: {
            return {
                ...state,
                viktigÅViteÅpen: action.åpen
            };
        }
        default:
            return state;
    }
}
