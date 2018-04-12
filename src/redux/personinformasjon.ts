import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentKontaktinformasjon } from './kontaktinformasjon';

const { reducer, action} = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export function hentAllPersonData(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(hentPerson(fødselsnummer));
    dispatch(hentKontaktinformasjon(fødselsnummer));
}

export default reducer;
