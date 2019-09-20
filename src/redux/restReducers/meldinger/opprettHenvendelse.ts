import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { OpprettHenvendelseRequest } from '../../../models/meldinger/meldinger';

export function getOpprettHenvendelseUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/fortsett/opprett`;
}

export default createPostResourceReducerAndActions<OpprettHenvendelseRequest>(
    'opprett-henvendelse',
    getOpprettHenvendelseUri
);
