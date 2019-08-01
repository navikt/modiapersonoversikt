import { EndreKontonummerRequest } from './endreKontonummerRequest';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';

function getEndreKontonummerPostUri(state: AppState, request: EndreKontonummerRequest) {
    const fødselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/brukerprofil/${fødselsnummer}/kontonummer/`;
}

export default createPostResourceReducerAndActions<EndreKontonummerRequest>(
    'endre-kontonummer',
    getEndreKontonummerPostUri
);
