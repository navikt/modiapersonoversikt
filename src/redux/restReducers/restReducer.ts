import { doThenDispatch, FetchError, FetchSuccess, reloadThenDispatch, STATUS } from './utils';
import { Action, Dispatch } from 'redux';

export interface ActionTypes {
    STARTING: string;
    RELOADING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

type RestReducer<T> =
    RestOk<T> |
    RestNotStarted |
    RestLoading |
    RestReloading |
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

export interface RestReloading {
    status: STATUS.RELOADING;
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

    const tilbakestillReducer = (dispatch: Dispatch<Action>) => {
        dispatch({type: actionTypes.INITIALIZE});
    };

    const initialState: RestReducer<T> = {
        status: STATUS.NOT_STARTED
    };
    return {
        action: actionFunction,
        reload,
        tilbakestillReducer: tilbakestillReducer,
        reducer: (state = initialState, action: Action): RestReducer<T> => {
            switch (action.type) {
                case actionTypes.STARTING:
                    return {
                        status: STATUS.LOADING
                    };
                case actionTypes.RELOADING:''
                    return {
                        ...state,
                        status: state.status === STATUS.OK || state.status === STATUS.RELOADING
                            ? STATUS.RELOADING : STATUS.LOADING
                    };
                case actionTypes.FINISHED:
                    return {
                        ...state,
                        status: STATUS.OK,
                        data: (<FetchSuccess<T>> action).data
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