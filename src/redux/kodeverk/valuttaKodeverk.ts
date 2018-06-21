import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-valutta');

export function hentValuttaer() {
    return action(() => fetchKodeverk('Valutaer'));
}

export const valuttaerActionNames = actionNames;
export default reducer;
