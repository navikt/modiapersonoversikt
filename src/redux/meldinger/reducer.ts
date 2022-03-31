import { initialState, MeldingerActions, MeldingerActionTypes, MeldingerState } from './types';

export function meldingerReducer(state: MeldingerState = initialState, action: MeldingerActions): MeldingerState {
    switch (action.type) {
        case MeldingerActionTypes.HuskSok:
            return {
                ...state,
                forrigeSok: action.sok
            };
        default:
            return state;
    }
}
