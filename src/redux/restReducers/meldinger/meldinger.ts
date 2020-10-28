import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';
import { Traad } from '../../../models/meldinger/meldinger';

function getMeldingerFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    const enhet = state.session.valgtEnhetId;
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/dialog/${fnr}/meldinger${header}`;
}

export default createRestResourceReducerAndActions<Traad[]>('meldinger', getMeldingerFetchUri);
