import { Egenansatt } from '../../models/egenansatt';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducer } from '../../rest/utils/restResource';
import { AppState } from '../reducers';

export function getEgenAnsattFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/egenansatt/${fnr}`;
}

const { reducer, actionNames } = createRestResourceReducer<Egenansatt>('egenansatt', getEgenAnsattFetchUri);

export { actionNames };
export default reducer;
