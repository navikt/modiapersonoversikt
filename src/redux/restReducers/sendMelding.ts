import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { Melding } from '../../models/meldinger/meldinger';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

export function getMeldingPostUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/meldinger/sendmelding`;
}

export default createPostResourceReducerAndActions<Melding>('meldinger', getMeldingPostUri);
