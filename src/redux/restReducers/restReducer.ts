import { doThenDispatch, FetchError, FetchSuccess, reloadThenDispatch, STATUS } from './utils';
import { Action, Dispatch } from 'redux';

export interface ActionTypes {
    STARTING: string;
    RELOADING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

export type RestReducer<T> =
    RestOk<T> |
    RestNotStarted |
    RestLoading |
    RestReloading<T> |
    RestError;

export interface RestOk<T> {
    status: STATUS.OK;
    data: T;
}

export interface RestNotStarted {
    status: STATUS.NOT_STARTED;
}

export interface RestLoading {
    status: STATUS.LOADING;
}

export interface RestReloading<T> {
    status: STATUS.RELOADING;
    data: T;
}

export interface RestError {
    status: STATUS.ERROR;
    error: string;
}


function getActionTypes(reducerNavn: string): ActionTypes {
    const navnUppercase = reducerNavn.toUpperCase() + ' / ';
    return {
        STARTING: navnUppercase + 'STARTING',
        RELOADING: navnUppercase + 'RELOADING',
        FINISHED: navnUppercase + 'FINISHED',
        FAILED: navnUppercase + 'FAILED',
        INITIALIZE: navnUppercase + 'INITIALIZE'
    };
}

export function createActionsAndReducer<T>(reducerNavn: string) {
    const actionTypes = getActionTypes(reducerNavn);

    const actionFunction = (fn: () => Promise<T>) => doThenDispatch(fn, actionTypes);
    const reload = (fn: () => Promise<T>) => reloadThenDispatch(fn, actionTypes);

    const tilbakestillReducer = (dispatch: Dispatch<Action>) => { dispatch({type: actionTypes.INITIALIZE}); };

    const initialState : RestReducer<T> = {
        status: STATUS.NOT_STARTED
    };
    return {
        action: actionFunction,
        reload,
        tilbakestillReducer: tilbakestillReducer,
        reducer: (state : RestReducer<T> = initialState, action: Action) : RestReducer<T> => {
            switch (action.type) {
                case actionTypes.STARTING:
                    return {
                        status: STATUS.LOADING
                    };
                case actionTypes.RELOADING:
                    if(state.status === STATUS.OK || state.status === STATUS.RELOADING) {
                        return {
                            ...state,
                            status: STATUS.RELOADING
                        };
                    }else {
                        return {
                            status: STATUS.LOADING
                        };
                    }
                case actionTypes.FINISHED:
                    return {
                        status: STATUS.OK,
                        data: (<FetchSuccess<T>> action).data
                    };
                case actionTypes.FAILED:
                    return {
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