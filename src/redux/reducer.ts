import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import personinformasjonReducer from '../ducks/personinformasjon';
import oppgaverReducer from '../ducks/oppgaver';
import { STATUS } from '../ducks/utils';
import { Person } from '../models/person';
import { Oppgave } from '../models/oppgave';

export interface AppState {
    personinformasjon: Reducer<Person>;
    oppgaver: Reducer<Oppgave[]>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    oppgaver: oppgaverReducer,
    router: routerReducer
});

export interface Reducer<T> {
    status: STATUS;
    data: T;
}