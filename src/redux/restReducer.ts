import { doThenDispatch, FetchError, FetchSuccess, STATUS } from './utils';
import { Action } from 'redux';

export interface ActionTypes {
    PENDING: string;
    OK: string;
    ERROR: string;
}

function getActionTypes(reducerNavn: string): ActionTypes {
    const navnUppercase = reducerNavn.toUpperCase() + '/';
    return {
        PENDING: navnUppercase + STATUS.PENDING,
        OK: navnUppercase + STATUS.OK,
        ERROR: navnUppercase + STATUS.ERROR
    };
}

export function createActionsAndReducer(reducerNavn: string) {
    const actionTypes = getActionTypes(reducerNavn);

    const actionFunction = (fn: () => Promise<object>) => doThenDispatch(fn, actionTypes);
    const initialState = {
        data: {}
    };
    return {
        action: actionFunction,
        reducer: (state = initialState, action: Action) => {
            switch (action.type) {
                case actionTypes.PENDING:
                    return {
                        ...state,
                        status: STATUS.PENDING
                    };
                case actionTypes.OK:
                    return {
                        ...state,
                        status: STATUS.OK,
                        data: (<FetchSuccess<object>> action).data
                    };
                case actionTypes.ERROR:
                    return {
                        ...state,
                        status: STATUS.ERROR,
                        error: (<FetchError> action).error
                    };
                default:
                    return state;
            }
        },
        actionNames: actionTypes
    };
}