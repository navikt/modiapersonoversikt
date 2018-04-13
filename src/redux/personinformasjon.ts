import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { hentNavKontor } from './navkontor';

const { reducer, action, actionNames} = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string, dispatch: Function) {
    return action(() => getPerson(fødselsnummer)
        .then(person => {
            dispatch(hentNavKontor(person.geografiskTilknytning));
            return person;
        })
    );
}

export function hentAllPersonData(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(hentPerson(fødselsnummer, dispatch));
    dispatch(hentKontaktinformasjon(fødselsnummer));
}
export const personinformasjonActionNames = actionNames;

export default reducer;
