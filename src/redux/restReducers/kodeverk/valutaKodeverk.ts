import { createActionsAndReducerDeprecated } from '../deprecatedRestResource';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('kodeverk-valuta');

export function hentValutaer() {
    return action(() => fetchKodeverk('Valutaer'));
}

export const valutaerActionNames = actionNames;
export default reducer;
