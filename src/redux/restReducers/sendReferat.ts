import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendReferatRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

export function getSendReferatPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendreferat`;
}

export default createPostResourceReducerAndActions<SendReferatRequest>('send-melding', getSendReferatPostUri);
