import { combineReducers } from 'redux';

import personinformasjonReducer from '../../redux/personinformasjon';
import navkontorReducer from '../../redux/navkontor';
import kontaktinformasjonReducer from '../../redux/kontaktinformasjon';
import egenAnsattReducer from '../../redux/egenansatt';
import vergemalReducer from '../../redux/vergemal';
import { STATUS } from '../../redux/utils';
import { PersonRespons } from '../../models/person/person';
import { NavKontor } from '../../models/navkontor';
import { Kontaktinformasjon } from '../../models/kontaktinformasjon';
import { Egenansatt } from '../../models/egenansatt';
import { Vergemal } from '../../models/vergemal/vergemal';

export interface AppState {
    personinformasjon: Reducer<PersonRespons>;
    brukersNavKontor: Reducer<NavKontor>;
    kontaktinformasjon: Reducer<Kontaktinformasjon>;
    egenAnsatt: Reducer<Egenansatt>;
    vergemal: Reducer<Vergemal>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    brukersNavKontor: navkontorReducer,
    kontaktinformasjon: kontaktinformasjonReducer,
    egenAnsatt: egenAnsattReducer,
    vergemal: vergemalReducer
});

export interface Reducer<T> {
    status: STATUS;
    data?: T;
    error?: String;
}
