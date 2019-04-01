import { default as pleiepengerReducer, PleiepengerState } from './pleiepengerReducer';
import { combineReducers } from 'redux';
import sykepengerReducer, { SykepengerState } from './sykepengerReducer';

export interface YtelserState {
    pleiepenger: PleiepengerState;
    sykepenger: SykepengerState;
}

export default combineReducers<YtelserState>({
    pleiepenger: pleiepengerReducer,
    sykepenger: sykepengerReducer
});
