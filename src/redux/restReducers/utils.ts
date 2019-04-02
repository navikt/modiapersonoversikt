import { Action, Dispatch } from 'redux';
import { ActionTypes, FetchUriGenerator } from './restResource';
import { AsyncDispatch } from '../ThunkTypes';
import { AppState } from '../reducers';

export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    RELOADING = 'RELOADING',
    FAILED = 'FAILED'
}

export interface FetchSuccess<T> {
    type: string;
    data: T;
}

export interface FetchError {
    type: STATUS.FAILED;
    error: string;
}

function sendResultatTilDispatch<T>(dispatch: Dispatch<Action>, action: string) {
    return (data: T) => {
        dispatch({
            type: action,
            data: data
        });
        return Promise.resolve(data);
    };
}

function handterFeil(dispatch: Dispatch<Action>, action: string) {
    return (error: Error) => {
        console.error(error);
        dispatch({
            type: action,
            error: error.message
        });
        return Promise.reject(error);
    };
}

function fetchData(uri: string) {
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}

export function doThenDispatch<T>(fetchUriGenerator: FetchUriGenerator, actionNames: ActionTypes, reload?: boolean) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        dispatch({ type: reload ? actionNames.RELOADING : actionNames.STARTING });
        const uri = fetchUriGenerator(getState());
        return fetchData(uri)
            .then(sendResultatTilDispatch(dispatch, actionNames.FINISHED))
            .catch(handterFeil(dispatch, actionNames.FAILED));
    };
}

export function dispatchReset(actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.INITIALIZE });
    };
}
