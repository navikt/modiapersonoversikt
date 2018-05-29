import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-retningsnummer');

export function hentRetningsnummere() {
    return action(() => fetchKodeverk('Retningsnummer'));
}

export const retningsnummerActionNames = actionNames;
export default reducer;