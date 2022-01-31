import { Action } from 'redux';
import { Pending, STATUS } from '../rest/utils/utils';
import { assertUnreachable } from '../utils/assertUnreachable';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './reducers';
import { postConfig } from '../api/config';

enum Typekeys {
    HENT_INNSTILLINGER_REQUEST = 'innstillinger/HENT_INNSTILLINGER_REQUEST',
    HENT_INNSTILLINGER_OK = 'innstillinger/HENT_INNSTILLINGER_OK',
    HENT_INNSTILLINGER_ERROR = 'innstillinger/HENT_INNSTILLINGER_ERROR'
}

export interface SaksbehandlerInnstillinger {
    sistLagret: string;
    innstillinger: Innstillinger;
}
export interface Innstillinger {
    [key: string]: string;
}
export type InnstillingerKeys = keyof Innstillinger;

interface HentInnstillingerRequest extends Action<Typekeys.HENT_INNSTILLINGER_REQUEST> {}
interface HentInnstillingerOk extends Action<Typekeys.HENT_INNSTILLINGER_OK> {
    data: SaksbehandlerInnstillinger;
}
interface HentInnstillingerError extends Action<Typekeys.HENT_INNSTILLINGER_ERROR> {
    data: {
        httpStatusCode?: number;
        error: Error | string;
    };
}

type Actions = HentInnstillingerRequest | HentInnstillingerOk | HentInnstillingerError;
interface InitialState {
    status: STATUS.NOT_STARTED | STATUS.LOADING;
}
export interface OkState {
    status: STATUS.SUCCESS | STATUS.RELOADING;
    data: SaksbehandlerInnstillinger;
}

interface ErrorState {
    status: STATUS.FAILED | STATUS.FORBIDDEN | STATUS.NOT_FOUND;
    statusCode: number;
    error: Error | string;
}

export type State = InitialState | OkState | ErrorState;

export default function reducer(state: State = { status: STATUS.NOT_STARTED }, action: Actions): State {
    switch (action.type) {
        case Typekeys.HENT_INNSTILLINGER_REQUEST:
            if (isOk(state)) {
                return { ...state, status: STATUS.RELOADING };
            } else {
                return { ...state, status: STATUS.LOADING };
            }
        case Typekeys.HENT_INNSTILLINGER_OK:
            return { ...state, status: STATUS.SUCCESS, data: action.data };
        case Typekeys.HENT_INNSTILLINGER_ERROR:
            return {
                ...state,
                status: STATUS.FAILED,
                error: action.data.error,
                statusCode: action.data.httpStatusCode ?? 500
            };
        default:
            assertUnreachable(action);
            return state;
    }
}

export function fetchInnstillinger(): ThunkAction<void, AppState, void, Actions> {
    return async (dispatch, getState) => {
        try {
            const currentState = sliceSelector(getState());
            if (isOk(currentState)) {
                return;
            } else {
                console.log('FETCHING INNSTILLINGER', currentState);
            }

            dispatch({ type: Typekeys.HENT_INNSTILLINGER_REQUEST });
            const response = await fetch('/modiapersonoversikt-innstillinger/api/innstillinger');
            if (!response.ok) {
                dispatch({
                    type: Typekeys.HENT_INNSTILLINGER_ERROR,
                    data: { error: response.statusText, httpStatusCode: response.status }
                });
            } else {
                const data = await response.json();
                dispatch({ type: Typekeys.HENT_INNSTILLINGER_OK, data });
            }
        } catch (error: any) {
            dispatch({ type: Typekeys.HENT_INNSTILLINGER_ERROR, data: error });
        }
    };
}

export function oppdaterInnstillinger(
    innstillinger: Innstillinger
): ThunkAction<Promise<SaksbehandlerInnstillinger>, AppState, null, Actions> {
    return async (dispatch) => {
        try {
            const response = await fetch(
                '/modiapersonoversikt-innstillinger/api/innstillinger',
                postConfig(innstillinger)
            );
            const data = await response.json();
            dispatch({ type: Typekeys.HENT_INNSTILLINGER_OK, data });
            return data;
        } catch (error: any) {
            dispatch({ type: Typekeys.HENT_INNSTILLINGER_ERROR, data: { error } });
            return Promise.reject(error);
        }
    };
}

export const sliceSelector = (state: AppState) => state.innstillinger;
export function getInnstilling<T extends string>(appState: AppState, key: InnstillingerKeys, defaultValue: T): T {
    const state = sliceSelector(appState);
    if (isOk(state)) {
        return (state.data.innstillinger[key] as T) || defaultValue;
    } else {
        return defaultValue;
    }
}

export function getInnstillingPending<T extends string>(
    appState: AppState,
    key: InnstillingerKeys,
    defaultValue: T
): Pending<T> {
    const state = sliceSelector(appState);
    if (isOk(state)) {
        return { pending: false, data: (state.data.innstillinger[key] as T) || defaultValue };
    } else if (hasError(state)) {
        return { pending: false, data: defaultValue };
    } else {
        return { pending: true };
    }
}

export function getInnstillingerSistLagret(appState: AppState, key: Innstillinger, defaultValue: string): string {
    const state = sliceSelector(appState);
    if (isOk(state)) {
        return state.data.sistLagret;
    } else {
        return defaultValue;
    }
}

export function isOk(state: State): state is OkState {
    return [STATUS.SUCCESS, STATUS.RELOADING].includes(state.status);
}
export function hasError(state: State): state is ErrorState {
    return [STATUS.FAILED, STATUS.FORBIDDEN, STATUS.NOT_FOUND].includes(state.status);
}

export function setInnstillingerData(innstillinger: SaksbehandlerInnstillinger): HentInnstillingerOk {
    return { type: Typekeys.HENT_INNSTILLINGER_OK, data: innstillinger };
}
