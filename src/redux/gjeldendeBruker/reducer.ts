import { type GjeldendeBrukerActions, type GjeldendeBrukerState, SetNyGjeldendeBrukerActionTypes } from './types';

const initialState: GjeldendeBrukerState = {
    fødselsnummer: ''
};

function gjeldendeBrukerReducer(state: GjeldendeBrukerState = initialState, action: GjeldendeBrukerActions) {
    switch (action.type) {
        case SetNyGjeldendeBrukerActionTypes.SetNyPerson:
            return {
                ...state,
                fødselsnummer: action.fnr,
                hasLoaded: true
            };
        default:
            return state;
    }
}

export default gjeldendeBrukerReducer;
