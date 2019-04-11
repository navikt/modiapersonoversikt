import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import { Vergemal } from '../../models/vergemal/vergemal';

export function getVergemal(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fnr}/vergemal`;
}

export default createRestResourceReducerAndActions<Vergemal>('vergemal', getVergemal);
