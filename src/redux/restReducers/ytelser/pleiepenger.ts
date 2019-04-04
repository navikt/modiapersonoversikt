import { createActionsAndReducer } from '../../../restResources/generator/restResource';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';

export function getPleiepengerFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/ytelse/pleiepenger/${fnr}`;
}

const { reducer } = createActionsAndReducer('pleiepenger', getPleiepengerFetchUri);

export default reducer;
