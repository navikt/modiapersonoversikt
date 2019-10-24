import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';
import { Traad } from '../../../models/meldinger/meldinger';

export function getMeldingerFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/dialog/${fnr}/meldinger`;
}

export default createRestResourceReducerAndActions<Traad[]>('meldinger', getMeldingerFetchUri);
