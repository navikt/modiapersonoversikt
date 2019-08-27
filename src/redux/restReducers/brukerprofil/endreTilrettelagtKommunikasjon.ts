import { EndreTilrettelagtKommunikasjonrequest } from './endreTilrettelagtKommunikasjonrequest';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';

function getEndreTilrettelagtKommunikasjonPostUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/brukerprofil/${fnr}/tilrettelagtkommunikasjon/`;
}

export default createPostResourceReducerAndActions<EndreTilrettelagtKommunikasjonrequest>(
    'endretilrettelagtkommunikasjon',
    getEndreTilrettelagtKommunikasjonPostUri
);
