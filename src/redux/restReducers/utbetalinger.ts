import { createActionsAndReducer } from './restResource';
import { getUtbetalinger } from '../../api/utbetaling-api';

const { reducer, action, reload, tilbakestill, actionNames } = createActionsAndReducer('utbetalinger');

export function hentUtbetalinger(fødselsnummer: string, startDato: Date, sluttDato: Date) {
    return action(() => getUtbetalinger(fødselsnummer, startDato, sluttDato));
}

export function reloadUtbetalinger(fødselsnummer: string, startDato: Date, sluttDato: Date) {
    return reload(() => getUtbetalinger(fødselsnummer, startDato, sluttDato));
}

export function resetUtbetalingerResource() {
    return tilbakestill;
}

export const utbetalingerActions = actionNames;
export default reducer;
