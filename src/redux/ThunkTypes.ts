import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { AppState } from './reducers';

export type AsyncDispatch = ThunkDispatch<AppState, null, AnyAction>;
export type AsyncAction = ThunkAction<void, AppState, null, AnyAction>;
