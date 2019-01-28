import { Actions, ActionTypes, initState, KontrollSpørsmålState } from './types';

function reducer(state: KontrollSpørsmålState = initState, action: Actions): KontrollSpørsmålState {
    switch (action.type) {
        case ActionTypes.SetSpørsmål:
            return {
                ...state,
                spørsmål: action.spørsmål
            };
        case ActionTypes.Roter:
            if (state.spørsmål) {
                const nySpørsmål = state.spørsmål.slice(1, state.spørsmål.length);
                nySpørsmål.push(state.spørsmål[0]);
                return {
                    ...state,
                    spørsmål: nySpørsmål
                };
            } else {
                return {
                    ...state
                };
            }
        case ActionTypes.ToggleSynlig:
            return {
                ...state,
                synlig: !state.synlig
            };
        default:
            return state;
    }
}

export default reducer;