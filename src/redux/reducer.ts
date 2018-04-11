import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import personinformasjonReducer from './personinformasjon';
import oppgaverReducer from './oppgaver';
import kontaktinformasjonReducer from './kontaktinformasjon';
import { STATUS } from './utils';
import { Person } from '../models/person';
import { Oppgave } from '../models/oppgave';
import { Kontaktinformasjon } from '../models/kontaktinformasjon';

export interface AppState {
    personinformasjon: Reducer<Person>;
    oppgaver: Reducer<Oppgave[]>;
    kontaktinformasjon: Reducer<Kontaktinformasjon>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    oppgaver: oppgaverReducer,
    kontaktinformasjon: kontaktinformasjonReducer,
    router: routerReducer
});

export interface Reducer<T> {
    status: STATUS;
    data: T;
    error?: String;
}