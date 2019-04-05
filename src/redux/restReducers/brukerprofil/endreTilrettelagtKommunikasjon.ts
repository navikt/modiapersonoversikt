import { createActionsAndReducerDeprecated } from '../deprecatedRestResource';
import { EndreTilrettelagtKommunikasjonrequest } from './endreTilrettelagtKommunikasjonrequest';
import { postEndreTilrettelagtKommunikasjon } from '../../../api/brukerprofil/endretilrettelagtkommunikasjon-api';

const { reducer, action, tilbakestill, actionNames } = createActionsAndReducerDeprecated(
    'endretilrettelagtkommunikasjon'
);

export function endreTilrettelagtKommunikasjon(request: EndreTilrettelagtKommunikasjonrequest) {
    return action(() => postEndreTilrettelagtKommunikasjon(request));
}

export function reset() {
    return tilbakestill;
}

export { actionNames };
export default reducer;
