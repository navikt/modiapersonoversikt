import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import personinformasjonReducer from './personinformasjon';
import navkontorReducer from './navkontor';
import oppgaverReducer from './oppgaver';
import { STATUS } from './utils';
import { Person } from '../models/person';
import { Oppgave } from '../models/oppgave';
import { NavKontorInterface } from '../models/navkontor';

export interface AppState {
    personinformasjon: Reducer<Person>;
    brukersNavKontor: Reducer<NavKontorInterface>;
    oppgaver: Reducer<Oppgave[]>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    brukersNavKontor: navkontorReducer,
    oppgaver: oppgaverReducer,
    router: routerReducer
});

export interface Reducer<T> {
    status: STATUS;
    data: T;
    error?: String;
}
