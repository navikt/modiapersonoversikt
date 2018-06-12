import { createActionsAndReducer } from '../restReducer';
import { EndreTilrettelagtKommunikasjonrequest } from './endreTilrettelagtKommunikasjonrequest';
import { postEndreTilrettelagtKommunikasjon } from '../../api/brukerprofil/endretilrettelagtkommunikasjon-api';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endretilrettelagtkommunikasjon');

export function endreTilrettelagtKommunikasjon(request: EndreTilrettelagtKommunikasjonrequest) {
    return action(() => postEndreTilrettelagtKommunikasjon(request));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;
