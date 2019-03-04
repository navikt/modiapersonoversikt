import { createActionsAndReducer } from '../restReducer';
import { getUtbetalinger } from '../../../api/utbetaling-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('utførteUtbetalingerYtelser');

export function hentUtførteUtbetalinger(fødselsnummer: string, fraOgMed: Date) {
    return action(() => getUtbetalinger(fødselsnummer, fraOgMed, new Date()));
}

export function reloadUtførteUtbetalinger(fødselsnummer: string, fraOgMed: Date) {
    return reload(() => getUtbetalinger(fødselsnummer, fraOgMed, new Date()));
}

export function resetUtførteUtbetalingerReducer() {
    return tilbakestillReducer;
}

export default reducer;
