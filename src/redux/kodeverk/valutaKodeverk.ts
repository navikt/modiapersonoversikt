import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-valuta');

export function hentValutaer() {
    return action(() => fetchKodeverk('Valutaer'));
}

export const valutaerActionNames = actionNames;
export default reducer;
