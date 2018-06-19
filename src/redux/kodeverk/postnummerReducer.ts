import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action } = createActionsAndReducer('kodeverk-postnummer');

export function hentPostnummere() {
    return action(() => fetchKodeverk('Postnummer'));
}
export default reducer;