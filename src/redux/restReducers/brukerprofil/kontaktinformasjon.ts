import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';
import { EndreKontaktinformasjonRequest } from './endreKontaktinformasjonRequest';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';

function getEndreKontaktinformasjonPostUri(state: AppState, request: EndreKontaktinformasjonRequest) {
    const fødselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/brukerprofil/${fødselsnummer}/telefonnummer/`;
}

export default createPostResourceReducerAndActions<EndreKontaktinformasjonRequest>(
    'endre-kontaktinformasjon',
    getEndreKontaktinformasjonPostUri
);
