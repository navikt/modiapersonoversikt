import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './reducers';
import { Action } from 'redux';

export type Thunk = ThunkAction<void, AppState, null, AppAction>;
export type Dispatch<S> = ThunkDispatch<S, null, Action>;