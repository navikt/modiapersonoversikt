import { dispatchReset, fetchDataAndDispatchToRedux, FetchError, FetchSuccess, STATUS } from './utils';
import { Action } from 'redux';
import { AppState } from '../../redux/reducers';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { loggEvent } from '../../utils/frontendLogger';

export interface ActionTypes {
    STARTING: string;
    RELOADING: string;
    FINISHED: string;
    NOTFOUND: string;
    FAILED: string;
    INITIALIZE: string;
}

type ThunkFetcher<T> = (dispatch: AsyncDispatch, getState: () => AppState) => Promise<T>;

export interface RestResource<T> {
    status: STATUS;
    actions: {
        fetch: ThunkFetcher<T>;
        reload: ThunkFetcher<T>;
        fetchWithCustomUriCreator: (uriCreator: FetchUriCreator) => ThunkFetcher<T>;
        reloadWithCustomUriCreator: (uriCreator: FetchUriCreator) => ThunkFetcher<T>;
        setData: (data: T) => Action;
        reset: (dispatch: AsyncDispatch) => void;
    };
}

export interface Success<T> extends RestResource<T> {
    status: STATUS.SUCCESS;
    data: T;
}

export interface NotFound<T> extends RestResource<T> {
    status: STATUS.NOT_FOUND;
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

export type HasData<T> = Success<T> | Reloading<T>;

export type IsLoaded<T> = Success<T> | Reloading<T> | NotFound<T>;

export function isSuccess<T>(restResource: RestResource<T>): restResource is Success<T> {
    return restResource.status === STATUS.SUCCESS;
}

export function hasData<T>(restResource: RestResource<T>): restResource is HasData<T> {
    return isSuccess(restResource) || isReloading(restResource);
}

export function isLoaded<T>(restResource: RestResource<T>): restResource is IsLoaded<T> {
    return isSuccess(restResource) || isReloading(restResource) || isNotFound(restResource);
}

export function isReloading<T>(restResource: RestResource<T>): restResource is Reloading<T> {
    return restResource.status === STATUS.RELOADING;
}

export function isNotFound<T>(restResource: RestResource<T>): restResource is NotFound<T> {
    return restResource.status === STATUS.NOT_FOUND;
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
        NOTFOUND: navnUppercase + 'NOT_FOUND',
        FAILED: navnUppercase + 'FAILED',
        INITIALIZE: navnUppercase + 'INITIALIZE'
    };
}

export type FetchUriCreator = (state: AppState) => string;

export function createRestResourceReducerAndActions<T>(resourceNavn: string, defaultUriCreator: FetchUriCreator) {
    const actionNames = getActionTypes(resourceNavn);
    const fetch = fetchDataAndDispatchToRedux(defaultUriCreator, actionNames);
    const reload = fetchDataAndDispatchToRedux(defaultUriCreator, actionNames, true);
    const fetchWithCustomUriCreator = (customUriCreator: FetchUriCreator) =>
        fetchDataAndDispatchToRedux(customUriCreator, actionNames);
    const reloadWithCustomUriCreator = (customUriCreator: FetchUriCreator) =>
        fetchDataAndDispatchToRedux(customUriCreator, actionNames, true);
    const setData = (data: T) => ({ type: actionNames.FINISHED, data: data });
    const reset = dispatchReset(actionNames);

    const initialState: RestResource<T> = {
        status: STATUS.NOT_STARTED,
        actions: {
            fetch,
            reload,
            fetchWithCustomUriCreator,
            reloadWithCustomUriCreator,
            setData,
            reset
        }
    };

    return (state: RestResource<T> = initialState, action: Action): RestResource<T> => {
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
                    data: (action as FetchSuccess<T>).data
                } as HasData<T>;
            case actionNames.NOTFOUND:
                return {
                    ...state,
                    status: STATUS.NOT_FOUND
                };
            case actionNames.FAILED:
                loggEvent('Fetch-Failed', resourceNavn);
                return {
                    ...state,
                    status: STATUS.FAILED,
                    error: (action as FetchError).error
                } as Failed<T>;
            case actionNames.INITIALIZE:
                return initialState;
            default:
                return state;
        }
    };
}
