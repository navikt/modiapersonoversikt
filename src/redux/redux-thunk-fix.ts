import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './reducers';
import { Action } from 'redux';

export type Thunk = ThunkAction<Promise<any>, AppState, null, Action>;
export type Dispatch<S> = ThunkDispatch<S, null, Action>;