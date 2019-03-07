import { AsyncDispatch } from '../ThunkTypes';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { hentKontaktinformasjon } from './kontaktinformasjon';
import { erEgenAnsatt } from './egenansatt';
import { hentVergemal } from './vergemal';
import { hentFeatureToggles } from './featureToggles';
import { resetNavKontorReducer } from './navkontor';
import { resetUtbetalingerReducer } from './utbetalinger';
import { resetSykepengerReducer } from './ytelser/sykepenger';
import { resetPleiepengerReducer } from './ytelser/pleiepenger';
import { resetForeldrepengerReducer } from './ytelser/foreldrepenger';
import { resetUtførteUtbetalingerReducer } from './ytelser/utførteUtbetalinger';
import { resetKontrollSpørsmål } from '../kontrollSporsmal/actions';
import { hentPerson } from './personinformasjon';
import { loggError } from '../../utils/frontendLogger';

export function oppslagNyBruker(dispatch: AsyncDispatch, fødselsnummer: string) {
    if (!erGyldigFødselsnummer(fødselsnummer)) {
        loggError(new Error('Ugyldig fødselsnummer: ' + fødselsnummer));
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
