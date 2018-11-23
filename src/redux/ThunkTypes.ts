import { AppState } from './reducers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AsyncDispatch = ThunkDispatch<AppState, null, AnyAction>;