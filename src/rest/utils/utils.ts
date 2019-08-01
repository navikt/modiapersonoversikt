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

export interface FetchSuccess<T> {
    type: string;
    data: T;
}

export interface FetchError {
    type: STATUS.FAILED;
    error: string;
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

function dispatchDataTilRedux<T>(dispatch: Dispatch<Action>, action: string) {
    return (data: T) => {
        dispatch({
            type: action,
            data: data
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
            loggError(new Error(`${error.status} ${error.statusText}. Kunne ikke fetche data på: ${fetchUri}`));
            return;
        }
        loggError(error);
    };
}

export function fetchDataAndDispatchToRedux<T>(
    fetchUriCreator: FetchUriCreator,
    actionNames: ActionTypes,
    reload?: boolean
) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        dispatch({ type: reload ? actionNames.RELOADING : actionNames.STARTING });
        const uri = fetchUriCreator(getState());
        return fetch(uri, { credentials: 'include' })
            .then(parseResponse)
            .then(dispatchDataTilRedux(dispatch, actionNames.FINISHED))
            .catch(handterFeil(dispatch, actionNames, uri));
    };
}

export function dispatchReset(actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.INITIALIZE });
    };
}
