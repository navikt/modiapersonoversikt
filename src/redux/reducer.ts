import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import personinformasjonReducer from './personinformasjon';
import navkontorReducer from './navkontor';
import oppgaverReducer from './oppgaver';
import kontaktinformasjonReducer from './kontaktinformasjon';
import egenAnsattReducer from './egenansatt';
import vergemalReducer from './vergemal';
import { STATUS } from './utils';
import { Person } from '../models/person/person';
import { Oppgave } from '../models/oppgave';
import { NavKontor } from '../models/navkontor';
import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { Egenansatt } from '../models/egenansatt';
import { Vergemal } from '../models/vergemal/vergemal';

export interface AppState {
    personinformasjon: Reducer<Person>;
    brukersNavKontor: Reducer<NavKontor>;
    oppgaver: Reducer<Oppgave[]>;
    kontaktinformasjon: Reducer<Kontaktinformasjon>;
    egenAnsatt: Reducer<Egenansatt>;
    vergemal: Reducer<Vergemal>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    brukersNavKontor: navkontorReducer,
    oppgaver: oppgaverReducer,
    kontaktinformasjon: kontaktinformasjonReducer,
    egenAnsatt: egenAnsattReducer,
    vergemal: vergemalReducer,
    router: routerReducer
});

export interface Reducer<T> {
    status: STATUS;
    data?: T;
    error?: String;
}
