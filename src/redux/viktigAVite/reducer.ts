import { initalState, ViktigÅViteActions, ViktigÅViteActionTypes, ViktigÅViteState } from './types';

export default function reducer(state: ViktigÅViteState = initalState, action: ViktigÅViteActions): ViktigÅViteState {
    switch (action.type) {
        case ViktigÅViteActionTypes.VIKTIGÅVITE_TEMA: {
            return {
                ...state,
                åpentTema: action.tema
            };
        }
        case ViktigÅViteActionTypes.VIKTIGÅVITE_ÅPEN: {
            return {
                ...state,
                åpen: action.åpen
            };
        }
        default: {
            return state;
        }
    }
}