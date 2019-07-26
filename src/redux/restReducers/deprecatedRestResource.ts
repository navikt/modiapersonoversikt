import { doThenDispatch, FetchError, FetchSuccess, reloadThenDispatch, STATUS } from './utils';
import { Action, Dispatch } from 'redux';

export interface ActionTypes {
    STARTING: string;
    RELOADING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

export interface DeprecatedRestResource<T> {
    status: STATUS;
}

export interface Success<T> extends DeprecatedRestResource<T> {
    status: STATUS.SUCCESS;
    data: T;
}

export interface Reloading<T> extends DeprecatedRestResource<T> {
    status: STATUS.RELOADING;
    data: T;
}

export interface NotStarted<T> extends DeprecatedRestResource<T> {
    status: STATUS.NOT_STARTED;
}

export interface Loading<T> extends DeprecatedRestResource<T> {
    status: STATUS.LOADING;
}

export interface Failed<T> extends DeprecatedRestResource<T> {
    status: STATUS.FAILED;
    error: string;
}

export type Loaded<T> = Success<T> | Reloading<T>;

export function isSuccess<T>(restResource: DeprecatedRestResource<T>): restResource is Success<T> {
    return restResource.status === STATUS.SUCCESS;
}

export function isLoaded<T>(restResource: DeprecatedRestResource<T>): restResource is Loaded<T> {
    return restResource.status === STATUS.SUCCESS || restResource.status === STATUS.RELOADING;
}

export function isReloading<T>(restResource: DeprecatedRestResource<T>): restResource is Reloading<T> {
    return restResource.status === STATUS.RELOADING;
}

export function isNotStarted<T>(restResource: DeprecatedRestResource<T>): restResource is NotStarted<T> {
    return restResource.status === STATUS.NOT_STARTED;
}

export function isLoading<T>(restResource: DeprecatedRestResource<T>): restResource is Loading<T> {
    return restResource.status === STATUS.LOADING;
}

export function isFailed<T>(restResource: DeprecatedRestResource<T>): restResource is Failed<T> {
    return restResource.status === STATUS.FAILED;
}

function getActionTypes(resourceNavn: string): ActionTypes {
    const navnUppercase = resourceNavn.toUpperCase() + ' / ';
    return {
        STARTING: navnUppercase + 'STARTING',
        RELOADING: navnUppercase + 'RELOADING',
        FINISHED: navnUppercase + 'FINISHED',
        FAILED: navnUppercase + 'FAILED',
        INITIALIZE: navnUppercase + 'INITIALIZE'
    };
}

export function createActionsAndReducerDeprecated<T>(resourceNavn: string) {
    const actionTypes = getActionTypes(resourceNavn);

    const actionFunction = (fn: () => Promise<T>) => doThenDispatch(fn, actionTypes);
    const reload = (fn: () => Promise<T>) => reloadThenDispatch(fn, actionTypes);

    const tilbakestill = (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionTypes.INITIALIZE });
    };

    const initialState: DeprecatedRestResource<T> = {
        status: STATUS.NOT_STARTED
    };
    return {
        action: actionFunction,
        reload,
        tilbakestill: tilbakestill,
        reducer: (state: DeprecatedRestResource<T> = initialState, action: Action): DeprecatedRestResource<T> => {
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
                        data: (action as FetchSuccess<T>).data
                    } as Loaded<T>;
                case actionTypes.FAILED:
                    return {
                        status: STATUS.FAILED,
                        error: (action as FetchError).error
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
