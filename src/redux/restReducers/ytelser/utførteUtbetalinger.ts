import { createActionsAndReducer } from '../restResource';
import { getUtbetalinger } from '../../../api/utbetaling-api';

const { reducer, action, reload, tilbakestill } = createActionsAndReducer('utførteUtbetalingerYtelser');

export function hentUtførteUtbetalinger(fødselsnummer: string, fraOgMed: Date) {
    return action(() => getUtbetalinger(fødselsnummer, fraOgMed, new Date()));
}

export function reloadUtførteUtbetalinger(fødselsnummer: string, fraOgMed: Date) {
    return reload(() => getUtbetalinger(fødselsnummer, fraOgMed, new Date()));
}

export function resetUtførteUtbetalingerResource() {
    return tilbakestill;
}

export default reducer;
