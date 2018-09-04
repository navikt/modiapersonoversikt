import { createActionsAndReducer } from './restReducer';
import { getUtbetalinger } from '../../api/utbetaling-api';

const { reducer, action, reload, tilbakestillReducer, actionNames } = createActionsAndReducer('utbetalinger');

export function hentUtbetalinger(fødselsnummer: string, startDato: Date, sluttDato: Date) {
    return action(() => getUtbetalinger(fødselsnummer, startDato, sluttDato));
}

export function reloadUtbetalinger(fødselsnummer: string, startDato: Date, sluttDato: Date) {
    return reload(() => getUtbetalinger(fødselsnummer, startDato, sluttDato));
}

export function resetUtbetalingerReducer() {
    return tilbakestillReducer;
}

export const utbetalingerActions = actionNames;
export default reducer;