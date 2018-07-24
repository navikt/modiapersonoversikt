import { doThenDispatch, FetchError, FetchSuccess, STATUS } from './utils';
import { Action } from 'redux';
import { Dispatch } from 'react-redux';

export interface ActionTypes {
    STARTING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

export interface RestReducer<T> {
    status: STATUS;
    data: T;
    error?: String;
}

function getActionTypes(reducerNavn: string): ActionTypes {
    const navnUppercase = reducerNavn.toUpperCase() + ' / ';
    return {
        STARTING: navnUppercase + 'STARTING',
        FINISHED: navnUppercase + 'FINISHED',
        FAILED: navnUppercase + 'FAILED',
        INITIALIZE: navnUppercase + 'INITIALIZE'
    };
}

export function createActionsAndReducer<T>(reducerNavn: string) {
    const actionTypes = getActionTypes(reducerNavn);

    const actionFunction = (fn: () => Promise<T>) => doThenDispatch(fn, actionTypes);

    const tilbakestillReducer = (dispatch: Dispatch<Action>) => { dispatch({type: actionTypes.INITIALIZE}); };

    const initialState = {
        data: {},
        status: STATUS.NOT_STARTED
    };
    return {
        action: actionFunction,
        tilbakestillReducer: tilbakestillReducer,
        reducer: (state = initialState, action: Action) => {
            switch (action.type) {
                case actionTypes.STARTING:
                    const status: STATUS = state.status === STATUS.OK ? STATUS.RELOADING : STATUS.LOADING;
                    return {
                        ...state,
                        status: status
                    };
                case actionTypes.FINISHED:
                    return {
                        ...state,
                        status: STATUS.OK,
                        data: (<FetchSuccess<object>> action).data
                    };
                case actionTypes.FAILED:
                    return {
                        ...state,
                        status: STATUS.ERROR,
                        error: (<FetchError> action).error
                    };
                case actionTypes.INITIALIZE:
                    return initialState;
                default:
                    return state;
            }
        },
        actionNames: actionTypes
    };
}