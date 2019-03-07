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
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { AsyncDispatch } from '../ThunkTypes';
import { resetUtførteUtbetalingerReducer } from './ytelser/utførteUtbetalinger';
import { hentFeatureToggles } from './featureToggles';
import { resetKontrollSpørsmål } from '../kontrollSporsmal/actions';

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

export const personinformasjonActionNames = actionNames;

export default reducer;
