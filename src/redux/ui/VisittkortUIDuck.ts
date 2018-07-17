import { Action } from 'redux';

export const TOGGLE_VISITTKORT = 'TOGGLE_VISITTKORT';

export interface VisittkortUi {
    visittkortÅpent: boolean;
}

const initialState: VisittkortUi = {
    visittkortÅpent: false
};

export function toggleVisittkort() {
    return {
        type: TOGGLE_VISITTKORT
    };
}

export default function reducer(state: VisittkortUi = initialState, action: Action) {
    switch (action.type) {
        case TOGGLE_VISITTKORT:
            return {
                ...state,
                visittkortÅpent: !state.visittkortÅpent
            };
        default:
            return state;
    }
}