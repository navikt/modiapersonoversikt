import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { SendSpørsmålRequest } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

export function getSendSpørsmålPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/sendsporsmal`;
}

export default createPostResourceReducerAndActions<SendSpørsmålRequest>('send-spørsmål', getSendSpørsmålPostUri);
