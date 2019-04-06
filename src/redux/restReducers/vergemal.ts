import { apiBaseUri } from '../../api/config';
import { createRestResourceReducer } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import { Vergemal } from '../../models/vergemal/vergemal';

export function getVergemal(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fnr}/vergemal`;
}

const { reducer, actionNames } = createRestResourceReducer<Vergemal>('vergemal', getVergemal);

export { actionNames };
export default reducer;
