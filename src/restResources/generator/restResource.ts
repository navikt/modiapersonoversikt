import { dispatchReset, fetchDataAndDispatchToRedux, FetchError, FetchSuccess, STATUS } from './utils';
import { Action } from 'redux';
import { AppState } from '../../redux/reducers';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { loggEvent } from '../../utils/frontendLogger';

export interface ActionTypes {
    STARTING: string;
    RELOADING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

export interface RestResource<T> {
    status: STATUS;
    actions: {
        fetch: (dispatch: AsyncDispatch, getState: () => AppState) => Promise<T>;
        fetchWithCustomUri: (uri: string) => (dispatch: AsyncDispatch, getState: () => AppState) => Promise<T>;
        reload: (dispatch: AsyncDispatch, getState: () => AppState) => Promise<T>;
        reset: (dispatch: AsyncDispatch) => void;
    };
}

export interface Success<T> extends RestResource<T> {
    status: STATUS.SUCCESS;
    data: T;
}

export interface Reloading<T> extends RestResource<T> {
    status: STATUS.RELOADING;
    data: T;
}

export interface NotStarted<T> extends RestResource<T> {
    status: STATUS.NOT_STARTED;
}

export interface Loading<T> extends RestResource<T> {
    status: STATUS.LOADING;
}

export interface Failed<T> extends RestResource<T> {
    status: STATUS.FAILED;
    error: string;
}

export type Loaded<T> = Success<T> | Reloading<T>;

export function isSuccess<T>(restResource: RestResource<T>): restResource is Success<T> {
    return restResource.status === STATUS.SUCCESS;
}

export function isLoaded<T>(restResource: RestResource<T>): restResource is Loaded<T> {
    return restResource.status === STATUS.SUCCESS || restResource.status === STATUS.RELOADING;
}

export function isReloading<T>(restResource: RestResource<T>): restResource is Reloading<T> {
    return restResource.status === STATUS.RELOADING;
}

export function isNotStarted<T>(restResource: RestResource<T>): restResource is NotStarted<T> {
    return restResource.status === STATUS.NOT_STARTED;
}

export function isLoading<T>(restResource: RestResource<T>): restResource is Loading<T> {
    return restResource.status === STATUS.LOADING;
}

export function isFailed<T>(restResource: RestResource<T>): restResource is Failed<T> {
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

export type FetchUriGenerator = (state: AppState) => string;

export function createActionsAndReducer<T>(resourceNavn: string, fetchUriGenerator: FetchUriGenerator) {
    const actionNames = getActionTypes(resourceNavn);
    const fetch = fetchDataAndDispatchToRedux(fetchUriGenerator, actionNames);
    const fetchWithCustomUri = (uri: string) => fetchDataAndDispatchToRedux(() => uri, actionNames);
    const reload = fetchDataAndDispatchToRedux(fetchUriGenerator, actionNames, true);
    const reset = dispatchReset(actionNames);

    const initialState: RestResource<T> = {
        status: STATUS.NOT_STARTED,
        actions: {
            fetch,
            fetchWithCustomUri,
            reload,
            reset
        }
    };

    return {
        reducer: (state: RestResource<T> = initialState, action: Action): RestResource<T> => {
            switch (action.type) {
                case actionNames.STARTING:
                    loggEvent('Fetch', resourceNavn);
                    return {
                        ...state,
                        status: STATUS.LOADING
                    };
                case actionNames.RELOADING:
                    loggEvent('Re-Fetch', resourceNavn);
                    if (state.status === STATUS.SUCCESS || state.status === STATUS.RELOADING) {
                        return {
                            ...state,
                            status: STATUS.RELOADING
                        };
                    } else {
                        return {
                            ...state,
                            status: STATUS.LOADING
                        };
                    }
                case actionNames.FINISHED:
                    return {
                        ...state,
                        status: STATUS.SUCCESS,
                        data: (<FetchSuccess<T>>action).data
                    } as Loaded<T>;
                case actionNames.FAILED:
                    loggEvent('Fetch-Failed', resourceNavn);
                    return {
                        ...state,
                        status: STATUS.FAILED,
                        error: (<FetchError>action).error
                    } as Failed<T>;
                case actionNames.INITIALIZE:
                    return initialState;
                default:
                    return state;
            }
        },
        actionNames: actionNames
    };
}
