import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';
import { resetNavKontorReducer } from './navkontor';

const { reducer, action, actionNames } = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export function hentAllPersonData(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(hentPerson(fødselsnummer));
    dispatch(hentKontaktinformasjon(fødselsnummer));
    dispatch(erEgenAnsatt(fødselsnummer));
    dispatch(hentVergemal(fødselsnummer));
    dispatch(resetNavKontorReducer());
}
export const personinformasjonActionNames = actionNames;

export default reducer;
