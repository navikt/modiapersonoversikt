import { getMeldinger } from '../../api/meldinger-api';
import { createActionsAndReducer } from './restResource';

const { reducer, action, reload, tilbakestill } = createActionsAndReducer('meldinger');

export function hentMeldinger(fødselsnummer: string) {
    return action(() => getMeldinger(fødselsnummer));
}

export function reloadMeldinger(fødselsnummer: string) {
    return reload(() => getMeldinger(fødselsnummer));
}

export function resetMeldingerResource() {
    return tilbakestill;
}

export default reducer;
