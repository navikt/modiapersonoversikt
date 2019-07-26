import { AppState } from './reducers';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type AsyncDispatch = ThunkDispatch<AppState, null, AnyAction>;
export type AsyncAction = ThunkAction<void, AppState, null, AnyAction>;
