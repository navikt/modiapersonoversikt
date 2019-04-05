import { createRestResourceReducer } from '../../../rest/utils/restResource';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';
import { PleiepengerResponse } from '../../../models/ytelse/pleiepenger';

export function getPleiepengerFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/ytelse/pleiepenger/${fnr}`;
}

const { reducer } = createRestResourceReducer<PleiepengerResponse>('pleiepenger', getPleiepengerFetchUri);

export default reducer;
