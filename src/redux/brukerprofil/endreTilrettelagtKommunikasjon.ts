import { createActionsAndReducer } from '../restReducer';
import { EndreTilrettelagtKommunikasjonrequest } from './endreTilrettelagtKommunikasjonrequest';
import { postEndreTilrettelagtKommunikasjon } from '../../api/endretilrettelagtkommunikasjon-api';

const { reducer, action, resetReducer, actionNames } = createActionsAndReducer('endretilrettelagtkommunikasjon');

export function endreTilrettelagtKommunikasjon(request: EndreTilrettelagtKommunikasjonrequest) {
    return action(() => postEndreTilrettelagtKommunikasjon(request));
}

export function reset() {
    return resetReducer;
}

export { actionNames };
export default reducer;
