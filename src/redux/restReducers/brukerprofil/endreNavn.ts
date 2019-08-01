import { EndreNavnRequest } from './endreNavnRequest';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';

function getEndreNavnPostUri(state: AppState, request: EndreNavnRequest) {
    return `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/navn/`;
}

export default createPostResourceReducerAndActions<EndreNavnRequest>('endrenavn', getEndreNavnPostUri);
