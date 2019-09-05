import { initialState, MeldingerActions, MeldingerActionTypes, MeldingerState } from './types';

export function meldingerReducer(state: MeldingerState = initialState, action: MeldingerActions): MeldingerState {
    switch (action.type) {
        case MeldingerActionTypes.HuskValgtTraad:
            return {
                ...state,
                forrigeValgteTraad: action.traad
            };
        default:
            return state;
    }
}
