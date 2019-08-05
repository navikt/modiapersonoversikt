import { EndreTilrettelagtKommunikasjonrequest } from './endreTilrettelagtKommunikasjonrequest';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';

function getEndreTilrettelagtKommunikasjonPostUri(state: AppState, request: EndreTilrettelagtKommunikasjonrequest) {
    return `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/tilrettelagtkommunikasjon/`;
}

export default createPostResourceReducerAndActions<EndreTilrettelagtKommunikasjonrequest>(
    'endretilrettelagtkommunikasjon',
    getEndreTilrettelagtKommunikasjonPostUri
);
