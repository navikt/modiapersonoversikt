import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('tilrettelagtKommunikasjonKodeverk');

export function hentTilrettelagtKommunikasjon() {
    return action(() => fetchKodeverk('TilrettelagtKommunikasjon'));
}

export const tilrettelagtKommunikasjonActionNames = actionNames;
export default reducer;
