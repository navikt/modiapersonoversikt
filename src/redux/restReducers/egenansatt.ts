import { Egenansatt } from '../../models/egenansatt';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';

function getEgenAnsattFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/egenansatt/${fnr}`;
}

export default createRestResourceReducerAndActions<Egenansatt>('egenansatt', getEgenAnsattFetchUri);
