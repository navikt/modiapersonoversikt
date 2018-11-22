import { ViktigÅViteActions, ViktigÅViteActionTypes, ViktigÅViteTema } from './types';

export function setViktigÅViteTema(tema?: ViktigÅViteTema): ViktigÅViteActions {
    return {
        type: ViktigÅViteActionTypes.VIKTIGÅVITE_TEMA,
        tema: tema
    };
}

export function setViktigÅViteÅpen(åpen: boolean): ViktigÅViteActions {
    return {
        type: ViktigÅViteActionTypes.VIKTIGÅVITE_ÅPEN,
        åpen: åpen
    };
}