import { initialState, SaksoversikState, SaksoversiktActions, SaksoversiktActionTypes } from './types';

export function saksoversiktReducer(
    state: SaksoversikState = initialState,
    action: SaksoversiktActions
): SaksoversikState {
    switch (action.type) {
        case SaksoversiktActionTypes.SetViktigÅViteÅpen: {
            return {
                ...state,
                viktigÅViteÅpen: action.åpen
            };
        }
        case SaksoversiktActionTypes.SetErStandaloneVindu: {
            return {
                ...state,
                erStandaloneVindu: action.standaloneVindu
            };
        }
        case SaksoversiktActionTypes.SetDokumentAvsenderFilter:
            return {
                ...state,
                avsenderFilter: {
                    ...state.avsenderFilter,
                    ...action.filterEndring
                }
            };
        default:
            return state;
    }
}
