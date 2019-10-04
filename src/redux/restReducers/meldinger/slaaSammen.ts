import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { SlaaSammenRequest, SlaaSammenResponse } from '../../../models/meldinger/meldinger';

export function getSlaaSammenTraaderUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/slaasammen`;
}

export default createPostResourceReducerAndActions<SlaaSammenRequest, SlaaSammenResponse>(
    'slå-sammen',
    getSlaaSammenTraaderUri
);
