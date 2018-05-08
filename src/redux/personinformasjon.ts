import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { hentNavKontor, settBrukerUtenNavKontor } from './navkontor';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';
import { BegrensetInnsyn, Person, PersonRespons } from '../models/person/person';

const { reducer, action, actionNames} = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string, dispatch: Function) {
    return action(() => getPerson(fødselsnummer)
        .then(person => {
            console.log('HMMM: ' + instanceofPerson(person));
            if (instanceofPerson(person)) {
                console.log('Vel? ' + person.geografiskTilknytning);
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

export function instanceofPerson(person: PersonRespons): person is Person {
    return 'navn' in person;
}

export function instanceofBegrensetInnsyn(person: PersonRespons): person is BegrensetInnsyn {
    return 'begrunnelse' in person;
}

export function hentAllPersonData(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(hentPerson(fødselsnummer, dispatch));
    dispatch(hentKontaktinformasjon(fødselsnummer));
    dispatch(erEgenAnsatt(fødselsnummer));
    dispatch(hentVergemal(fødselsnummer));
}
export const personinformasjonActionNames = actionNames;

export default reducer;
