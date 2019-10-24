import { Action, Dispatch } from 'redux';
import { ActionTypes, FetchUriCreator } from './restResource';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { AppState } from '../../redux/reducers';
import { loggError } from '../../utils/frontendLogger';

const notFound = new Error();

export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    NOT_FOUND = 'NOT_FOUND',
    RELOADING = 'RELOADING',
    FAILED = 'FAILED'
}

export interface FetchSuccess<T> extends Action {
    data: T;
    fetchUrl: string;
}

export interface SetData<T> extends Action {
    data: T;
}

export interface FetchError extends Action {
    error: string;
}

export interface Fetching extends Action {
    fetchUrl: string;
}

function parseResponse(response: Response) {
    if (response.ok) {
        return response.json();
    } else if (response.status === 404) {
        throw notFound;
    } else {
        throw response;
    }
}

function dispatchDataTilRedux<T>(dispatch: Dispatch<Action>, action: string, fetchUrl: string) {
    return (data: T) => {
        dispatch({
            type: action,
            data: data,
            fetchUrl: fetchUrl
        });
        return Promise.resolve(data);
    };
}

function handterFeil(dispatch: Dispatch<Action>, actionNames: ActionTypes, fetchUri: string) {
    return (error: Error | Response) => {
        if (error === notFound) {
            dispatch({ type: actionNames.NOTFOUND });
            return;
        }
        dispatch({
            type: actionNames.FAILED,
            error: 'Kunne ikke hente data'
        });
        if (error instanceof Response) {
            loggError(new Error(`Kunne ikke fetche data på ${fetchUri}. Status ${error.status}: ${error.statusText}`));
            return;
        }
        loggError(error, `Kune ikke fetche data på ${fetchUri}. ${error.message}`);
    };
}

export function fetchDataAndDispatchToRedux<T>(
    fetchUriCreator: FetchUriCreator,
    actionNames: ActionTypes,
    reload?: boolean
) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const uri = fetchUriCreator(getState());
        dispatch({ type: reload ? actionNames.RELOADING : actionNames.STARTING, fetchUrl: uri });
        return fetch(uri, { credentials: 'include' })
            .then(parseResponse)
            .then(dispatchDataTilRedux(dispatch, actionNames.FINISHED, uri))
            .catch(handterFeil(dispatch, actionNames, uri));
    };
}

export function dispatchReset(actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.INITIALIZE });
    };
}
