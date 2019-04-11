import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { Varsel } from '../../models/varsel';

export function getVarselFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/varsel/${fnr}`;
}

export default createRestResourceReducerAndActions<Varsel[]>('varsel', getVarselFetchUri);
