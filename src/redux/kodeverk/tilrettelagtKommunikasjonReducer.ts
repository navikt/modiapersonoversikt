import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-tilrettelagt-kommunikasjon');

export function hentTilrettelagtKommunikasjon() {
    return action(() => fetchKodeverk('TilrettelagtKommunikasjon'));
}

export const tilrettelagtKommunikasjonActionNames = actionNames;
export default reducer;
