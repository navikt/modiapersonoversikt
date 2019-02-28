import { createActionsAndReducer } from '../restReducer';
import { getUtbetalinger } from '../../../api/utbetaling-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('historiskeUtbetalingerYtelser');

export function hentHistoriskeUtbetalinger(fødselsnummer: string, fraOgMed: Date) {
    return action(() => getUtbetalinger(fødselsnummer, fraOgMed, new Date()));
}

export function reloadHistoriskeUtbetalinger(fødselsnummer: string, fraOgMed: Date) {
    return reload(() => getUtbetalinger(fødselsnummer, fraOgMed, new Date()));
}

export function resetHistoriskeUtbetalingerReducer() {
    return tilbakestillReducer;
}

export default reducer;
