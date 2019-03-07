import { getPerson } from '../../api/person-api';
import { createActionsAndReducer, isLoaded, Loaded, RestReducer } from './restReducer';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';
import { resetNavKontorReducer } from './navkontor';
import { resetUtbetalingerReducer } from './utbetalinger';
import { resetSykepengerReducer } from './ytelser/sykepenger';
import { resetPleiepengerReducer } from './ytelser/pleiepenger';
import { resetForeldrepengerReducer } from './ytelser/foreldrepenger';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { AsyncDispatch } from '../ThunkTypes';
import { resetUtførteUtbetalingerReducer } from './ytelser/utførteUtbetalinger';
import { hentFeatureToggles } from './featureToggles';
import { resetKontrollSpørsmål } from '../kontrollSporsmal/actions';
import { Person, PersonRespons } from '../../models/person/person';

const { reducer, action, actionNames, reload } = createActionsAndReducer('personinformasjon');

function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export function reloadPerson(fødselsnummer: string) {
    return reload(() => getPerson(fødselsnummer));
}

export function hentAllPersonData(dispatch: AsyncDispatch, fødselsnummer: string) {
    if (!erGyldigFødselsnummer(fødselsnummer)) {
        console.warn('Ugyldig fødselsnummer: ', fødselsnummer);
    }
    dispatch(hentPerson(fødselsnummer));
    dispatch(hentKontaktinformasjon(fødselsnummer));
    dispatch(erEgenAnsatt(fødselsnummer));
    dispatch(hentVergemal(fødselsnummer));
    dispatch(hentFeatureToggles());
    dispatch(resetNavKontorReducer());
    dispatch(resetUtbetalingerReducer());
    dispatch(resetSykepengerReducer());
    dispatch(resetPleiepengerReducer());
    dispatch(resetForeldrepengerReducer());
    dispatch(resetUtførteUtbetalingerReducer());
    dispatch(resetKontrollSpørsmål());
}

export function isLoadedPerson(person: RestReducer<PersonRespons>): person is Loaded<Person> {
    return isLoaded(person) && person.data.hasOwnProperty('fødselsnummer');
}

export function getFnrFromPerson(person: RestReducer<PersonRespons>): string | undefined {
    return isLoadedPerson(person) ? person.data.fødselsnummer : undefined;
}

export const personinformasjonActionNames = actionNames;

export default reducer;
