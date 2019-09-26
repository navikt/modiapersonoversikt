import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendDelsvarRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

export function getSendDelsvarPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/delvis-svar`;
}

export default createPostResourceReducerAndActions<SendDelsvarRequest>('send-delsvar', getSendDelsvarPostUri);
