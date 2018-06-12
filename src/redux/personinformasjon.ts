import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { hentNavKontor, settBrukerUtenNavKontor } from './navkontor';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';
import { erPersonResponsAvTypePerson } from '../models/person/person';
import { hentBaseUrls } from './baseurls';

const { reducer, action, actionNames} = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string, dispatch: Function) {
    return action(() => getPerson(fødselsnummer)
        .then(person => {
            if (erPersonResponsAvTypePerson(person)) {
                if (person.geografiskTilknytning || person.diskresjonskode) {
                    dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode));
                } else {
                    dispatch(settBrukerUtenNavKontor());
                }
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
    dispatch(hentBaseUrls());
}
export const personinformasjonActionNames = actionNames;

export default reducer;
