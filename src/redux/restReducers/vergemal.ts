import { createActionsAndReducer } from './restResource';
import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';

function generateVergemålFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fnr}/vergemal`;
}

const { reducer, actionNames } = createActionsAndReducer('vergemal', generateVergemålFetchUri);

export { actionNames };
export default reducer;
