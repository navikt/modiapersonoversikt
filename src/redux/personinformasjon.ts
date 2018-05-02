import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { hentNavKontor, settBrukerUtenNavKontor } from './navkontor';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';

const { reducer, action, actionNames} = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string, dispatch: Function) {
    return action(() => getPerson(fødselsnummer)
        .then(person => {
            if (person.geografiskTilknytning) {
                dispatch(hentNavKontor(person.geografiskTilknytning));
            } else {
                dispatch(settBrukerUtenNavKontor());
            }
            return person;
        })
    );
}

export function hentAllPersonData(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(hentPerson(fødselsnummer, dispatch));
    dispatch(hentKontaktinformasjon(fødselsnummer));
    dispatch(erEgenAnsatt(fødselsnummer));
    dispatch(hentVergemal(fødselsnummer));
}
export const personinformasjonActionNames = actionNames;

export default reducer;
