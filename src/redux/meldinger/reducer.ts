import { initialState, MeldingerActions, MeldingerActionTypes, MeldingerState } from './types';

export function meldingerReducer(state: MeldingerState = initialState, action: MeldingerActions): MeldingerState {
    switch (action.type) {
        case MeldingerActionTypes.SetValgtTraad:
            return {
                ...state,
                valgtTraad: action.traad
            };
        default:
            return state;
    }
}
