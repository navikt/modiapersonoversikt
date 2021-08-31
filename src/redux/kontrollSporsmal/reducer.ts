import { Actions, ActionTypes, initState, KontrollSporsmaalState } from './types';

function reducer(state: KontrollSporsmaalState = initState, action: Actions): KontrollSporsmaalState {
    switch (action.type) {
        case ActionTypes.SetSporsmaal:
            return {
                ...state,
                sporsmaal: action.sporsmaal
            };
        case ActionTypes.Roter:
            if (state.sporsmaal) {
                const nySporsmaal = [...state.sporsmaal.slice(1, state.sporsmaal.length), state.sporsmaal[0]];
                return {
                    ...state,
                    sporsmaal: nySporsmaal
                };
            } else {
                return {
                    ...state
                };
            }
        case ActionTypes.Lukk:
            return {
                ...state,
                open: false
            };
        case ActionTypes.Reset:
            return initState;
        default:
            return state;
    }
}

export default reducer;
