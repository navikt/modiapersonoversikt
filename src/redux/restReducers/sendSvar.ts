import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendSvarRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

export function getSendSvarPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendsvar`;
}

export default createPostResourceReducerAndActions<SendSvarRequest>('send-svar', getSendSvarPostUri);
