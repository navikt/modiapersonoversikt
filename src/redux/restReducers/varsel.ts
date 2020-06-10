import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { Varsel } from '../../models/varsel';

function getVarselFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/varsler/${fnr}`;
}

export default createRestResourceReducerAndActions<Varsel[]>('varsel', getVarselFetchUri);
