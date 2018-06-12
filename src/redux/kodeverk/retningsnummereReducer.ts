import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action } = createActionsAndReducer('kodeverk-retningsnummer');

export function hentRetningsnummere() {
    return action(() => fetchKodeverk('Retningsnumre'));
}

export default reducer;