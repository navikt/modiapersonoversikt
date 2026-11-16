import { useDispatch } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { AppState } from './reducers';

export type AsyncDispatch = ThunkDispatch<AppState, undefined, AnyAction>;
export type AsyncAction = ThunkAction<void, AppState, undefined, AnyAction>;

export const useAppDispatch = useDispatch.withTypes<AsyncDispatch>();
