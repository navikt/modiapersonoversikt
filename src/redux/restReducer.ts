import { doThenDispatch, FetchError, FetchSuccess, STATUS } from './utils';
import { Action } from 'redux';
import { Dispatch } from 'react-redux';

export interface ActionTypes {
    PENDING: string;
    OK: string;
    ERROR: string;
    INITIALIZED: string;
}

function getActionTypes(reducerNavn: string): ActionTypes {
    const navnUppercase = reducerNavn.toUpperCase() + '/';
    return {
        PENDING: navnUppercase + STATUS.PENDING,
        OK: navnUppercase + STATUS.OK,
        ERROR: navnUppercase + STATUS.ERROR,
        INITIALIZED: navnUppercase + STATUS.NOT_STARTED
    };
}

export function createActionsAndReducer<T>(reducerNavn: string) {
    const actionTypes = getActionTypes(reducerNavn);

    const actionFunction = (fn: () => Promise<T>) => doThenDispatch(fn, actionTypes);

    const initialState = {
        data: {},
        status: STATUS.NOT_STARTED
    };
    const tilbakestillReducer = (dispatch: Dispatch<Action>) => { dispatch({type: actionTypes.INITIALIZED}); };
    return {
        action: actionFunction,
        tilbakestillReducer: tilbakestillReducer,
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
                case actionTypes.INITIALIZED:
                    return {
                        ...state,
                        status: STATUS.NOT_STARTED
                    };
                default:
                    return state;
            }
        },
        actionNames: actionTypes
    };
}