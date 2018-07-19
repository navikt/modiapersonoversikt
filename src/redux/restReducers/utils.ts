import { Action } from 'redux';
import { Dispatch } from 'react-redux';
import { ActionTypes } from './restReducer';

export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
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
         dispatch({type: action, data});
         return Promise.resolve(data);
    };
}

function handterFeil(dispatch: Dispatch<Action>, action: string) {
    return (error: Error) => {
        console.error(error);
        dispatch({type: action, error: error.message});
        return Promise.reject(error);
    };
}

export function doThenDispatch<T>(fn: () => Promise<T>, { PENDING, OK, ERROR }: ActionTypes) {
    return (dispatch: Dispatch<Action>) => {
        if (PENDING) {
            dispatch({type: PENDING});
        }
        return fn()
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, ERROR));
    };
}