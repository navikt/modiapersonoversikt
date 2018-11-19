import { doThenDispatch, FetchError, FetchSuccess, reloadThenDispatch, STATUS } from './utils';
import { Action, Dispatch } from 'redux';

export interface ActionTypes {
    STARTING: string;
    RELOADING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

export interface RestReducer<T> {
    status: STATUS;
}

export interface Success<T> extends RestReducer<T> {
    status: STATUS.SUCCESS;
    data: T;
}

export interface Reloading<T> extends RestReducer<T> {
    status: STATUS.RELOADING;
    data: T;
}

export interface NotStarted<T> extends RestReducer<T> {
    status: STATUS.NOT_STARTED;
}

export interface Loading<T> extends RestReducer<T> {
    status: STATUS.LOADING;
}

export interface Failed<T> extends RestReducer<T> {
    status: STATUS.FAILED;
    error: string;
}

export type Loaded<T> = Success<T> | Reloading<T>;

export function isSuccess<T>(restReducer: RestReducer<T>): restReducer is Success<T> {
    return restReducer.status === STATUS.SUCCESS;
}

export function isLoaded<T>(restReducer: RestReducer<T>): restReducer is Loaded<T> {
    return restReducer.status === STATUS.SUCCESS || restReducer.status === STATUS.RELOADING;
}

export function isReloading<T>(restReducer: RestReducer<T>): restReducer is Reloading<T> {
    return restReducer.status === STATUS.RELOADING;
}

export function isNotStarted<T>(restReducer: RestReducer<T>): restReducer is NotStarted<T> {
    return restReducer.status === STATUS.NOT_STARTED;
}

export function isLoading<T>(restReducer: RestReducer<T>): restReducer is Loading<T> {
    return restReducer.status === STATUS.LOADING;
}

export function isFailed<T>(restReducer: RestReducer<T>): restReducer is Failed<T> {
    return restReducer.status === STATUS.FAILED;
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
        reducer: (state: RestReducer<T> = initialState, action: Action): RestReducer<T> => {
            switch (action.type) {
                case actionTypes.STARTING:
                    return {
                        status: STATUS.LOADING
                    };
                case actionTypes.RELOADING:
                    if (state.status === STATUS.SUCCESS || state.status === STATUS.RELOADING) {
                        return {
                            ...state,
                            status: STATUS.RELOADING
                        };
                    } else {
                        return {
                            status: STATUS.LOADING
                        };
                    }
                case actionTypes.FINISHED:
                    return {
                        status: STATUS.SUCCESS,
                        data: (<FetchSuccess<T>> action).data
                    } as Loaded<T>;
                case actionTypes.FAILED:
                    return {
                        status: STATUS.FAILED,
                        error: (<FetchError> action).error
                    } as Failed<T>;
                case actionTypes.INITIALIZE:
                    return initialState;
                default:
                    return state;
            }
        },
        actionNames: actionTypes
    };
}