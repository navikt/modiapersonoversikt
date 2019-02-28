import { default as pleiepengerReducer, PleiepengerState } from './pleiepengerReducer';
import { combineReducers } from 'redux';

export interface YtelserState {
    pleiepenger: PleiepengerState;
}

export default combineReducers<YtelserState>({
    pleiepenger: pleiepengerReducer
});
