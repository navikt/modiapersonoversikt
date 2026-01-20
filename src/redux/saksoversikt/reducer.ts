import { initialState, type SaksoversikState, type SaksoversiktActions, SaksoversiktActionTypes } from './types';

export function saksoversiktReducer(
    // biome-ignore lint/style/useDefaultParameterLast: biome migration
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
