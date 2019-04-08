import { Egenansatt } from '../../models/egenansatt';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';

export function getEgenAnsattFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/egenansatt/${fnr}`;
}

const { reducer, actionNames } = createRestResourceReducerAndActions<Egenansatt>('egenansatt', getEgenAnsattFetchUri);

export { actionNames };
export default reducer;
