import { createActionsAndReducerDeprecated } from '../deprecatedRestResource';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('kodeverk-tilrettelagt-kommunikasjon');

export function hentTilrettelagtKommunikasjon() {
    return action(() => fetchKodeverk('TilrettelagtKommunikasjon'));
}

export const tilrettelagtKommunikasjonActionNames = actionNames;
export default reducer;
