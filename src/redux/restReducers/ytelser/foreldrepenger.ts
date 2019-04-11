import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';
import { ForeldrepengerResponse } from '../../../models/ytelse/foreldrepenger';

export function getForeldrepengerFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/ytelse/foreldrepenger/${fnr}`;
}

export default createRestResourceReducerAndActions<ForeldrepengerResponse>('foreldrepenger', getForeldrepengerFetchUri);
