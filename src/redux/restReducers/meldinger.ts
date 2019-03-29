import { createActionsAndReducer } from './restReducer';
import { getMeldinger } from '../../api/meldinger-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('meldinger');

export function hentMeldinger(fødselsnummer: string) {
    return action(() => getMeldinger(fødselsnummer));
}

export function reloadMeldinger(fødselsnummer: string) {
    return reload(() => getMeldinger(fødselsnummer));
}

export function resetMeldingerReducer() {
    return tilbakestillReducer;
}

export default reducer;
