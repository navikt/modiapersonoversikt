import { Action } from 'redux';
import { Dispatch } from 'react-redux';
import { ActionTypes } from './restReducer';

export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    OK = 'OK',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR'
}

export interface FetchSuccess<T> {
    type: string;
    data: T;
}

export interface FetchError {
    type: STATUS.ERROR;
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

export function doThenDispatch<T>(fn: () => Promise<T>, actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({type: actionNames.STARTING});
        return fn()
            .then(sendResultatTilDispatch(dispatch, actionNames.FINISHED))
            .catch(handterFeil(dispatch, actionNames.FAILED));
    };
}

export function reloadThenDispatch<T>(fn: () => Promise<T>, actionNames: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({type: actionNames.RELOADING});
        return fn()
            .then(sendResultatTilDispatch(dispatch, actionNames.FINISHED))
            .catch(handterFeil(dispatch, actionNames.FAILED));
    };
}
