import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { Traad } from '../../models/meldinger/meldinger';

export function getMeldingerFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/meldinger/${fnr}/traader`;
}

const { reducer } = createRestResourceReducerAndActions<Traad[]>('meldinger', getMeldingerFetchUri);

export default reducer;
