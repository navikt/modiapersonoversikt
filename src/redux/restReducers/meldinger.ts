import { getMeldinger } from '../../api/meldinger-api';
import { createActionsAndReducerDeprecated } from './deprecatedRestResource';

const { reducer, action, reload, tilbakestill } = createActionsAndReducerDeprecated('meldinger');

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
