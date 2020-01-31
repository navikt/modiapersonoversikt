import { Action, Dispatch } from 'redux';
import { ActionTypes, FetchUriCreator, getActionTypes } from './restResource';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { AppState } from '../../redux/reducers';
import { loggError, loggEvent } from '../../utils/logger/frontendLogger';
import { Timer } from '../../utils/timer';
import { includeCredentials } from '../../api/config';

const notFound = new Error();
const forbidden = new Error();
export const abortFetch = '';

export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    NOT_FOUND = 'NOT_FOUND',
    RELOADING = 'RELOADING',
    FAILED = 'FAILED',
    FORBIDDEN = 'FORBIDDEN'
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
    } else if (response.status === 403) {
        throw forbidden;
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

function handterFeil(dispatch: Dispatch<Action>, resourceNavn: string, fetchUri: string) {
    const actionNames = getActionTypes(resourceNavn);
    return (error: Error | Response) => {
        if (error === notFound) {
            dispatch({ type: actionNames.NOTFOUND });
            return;
        }
        if (error === forbidden) {
            dispatch({ type: actionNames.FORBIDDEN });
            return;
        }

        dispatch({
            type: actionNames.FAILED,
            error: 'Kunne ikke hente data'
        });

        if (error instanceof Response) {
            loggError(
                new Error(`Kunne ikke fetche data på ${fetchUri}. Status ${error.status}: ${error.statusText}`),
                undefined,
                { response: JSON.stringify(error) },
                { action: 'Fetch-Failed', location: resourceNavn }
            );
            return;
        }
        loggError(error, `Kunne ikke fetche data på ${fetchUri}. ${error.message}`, undefined, {
            action: 'Fetch-Failed',
            location: resourceNavn
        });
    };
}

const timer = new Timer();

export function fetchDataAndDispatchToRedux<T>(
    fetchUriCreator: FetchUriCreator,
    resourceNavn: string,
    reload?: boolean
) {
    const actionNames = getActionTypes(resourceNavn);
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const uri = fetchUriCreator(getState());
        if (uri === abortFetch) {
            console.info('Empty fetch-uri, aborting fetch in: ' + actionNames.STARTING);
            return Promise.resolve();
        }
        dispatch({ type: reload ? actionNames.RELOADING : actionNames.STARTING, fetchUrl: uri });
        timer.startTimer();
        return fetch(uri, includeCredentials)
            .then(parseResponse)
            .then(dispatchDataTilRedux(dispatch, actionNames.FINISHED, uri))
            .catch(handterFeil(dispatch, resourceNavn, uri))
            .finally(() => loggEvent(reload ? 'Re-Fetch' : 'Fetch', resourceNavn, undefined, { ms: timer.getTime() }));
    };
}

export function dispatchReset(actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.INITIALIZE });
    };
}
