import { Action, Dispatch } from 'redux';
import { ActionTypes, FetchUriCreator } from './restResource';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { AppState } from '../../redux/reducers';

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

function dispatchDataTilRedux<T>(dispatch: Dispatch<Action>, action: string) {
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

export function fetchDataAndDispatchToRedux<T>(
    fetchUriCreator: FetchUriCreator,
    actionNames: ActionTypes,
    reload?: boolean
) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        dispatch({ type: reload ? actionNames.RELOADING : actionNames.STARTING });
        const uri = fetchUriCreator(getState());
        return fetchData(uri)
            .then(dispatchDataTilRedux(dispatch, actionNames.FINISHED))
            .catch(handterFeil(dispatch, actionNames.FAILED));
    };
}

export function dispatchReset(actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.INITIALIZE });
    };
}
