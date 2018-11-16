import { AnyAction } from 'redux';

import { getPerson } from '../../api/person-api';
import { createActionsAndReducer } from './restReducer';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';
import { resetNavKontorReducer } from './navkontor';
import { resetUtbetalingerReducer } from './utbetalinger';
import { resetSykepengerReducer } from './ytelser/sykepenger';
import { resetPleiepengerReducer } from './ytelser/pleiepenger';
import { resetForeldrepengerReducer } from './ytelser/foreldrepenger';
import { hentFeatureToggle } from './featuretoggle';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../reducers';

const {reducer, action, actionNames, reload} = createActionsAndReducer('personinformasjon');

function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export function reloadPerson(fødselsnummer: string) {
    return reload(() => getPerson(fødselsnummer));
}

export function hentAllPersonData(dispatch: ThunkDispatch<AppState, undefined, AnyAction>, fødselsnummer: string) {
    if (!erGyldigFødselsnummer(fødselsnummer)) {
        console.warn('Ugyldig fødselsnummer: ', fødselsnummer);
    }
    dispatch(hentPerson(fødselsnummer));
    dispatch(hentKontaktinformasjon(fødselsnummer));
    dispatch(erEgenAnsatt(fødselsnummer));
    dispatch(hentVergemal(fødselsnummer));
    dispatch(hentFeatureToggle('ny-brukerprofil'));
    dispatch(resetNavKontorReducer());
    dispatch(resetUtbetalingerReducer());
    dispatch(resetSykepengerReducer());
    dispatch(resetPleiepengerReducer());
    dispatch(resetForeldrepengerReducer());
}

export const personinformasjonActionNames = actionNames;

export default reducer;
