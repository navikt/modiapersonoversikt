import { Actions, ActionTypes, initState, KontrollSporsmalState } from './types';

function reducer(state: KontrollSporsmalState = initState, action: Actions): KontrollSporsmalState {
    switch (action.type) {
        case ActionTypes.SetSporsmal:
            return {
                ...state,
                sporsmal: action.sporsmal
            };
        case ActionTypes.Roter:
            if (state.sporsmal) {
                const nySporsmal = [...state.sporsmal.slice(1, state.sporsmal.length), state.sporsmal[0]];
                return {
                    ...state,
                    sporsmal: nySporsmal
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
