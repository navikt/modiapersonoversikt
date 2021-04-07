import { UtbetalingerResponse } from '../../models/utbetalinger';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import { getUtbetalingerForSiste30DagerDatoer } from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import dayjs from 'dayjs';
import { backendDatoformat } from '../../utils/date-utils';

function getUtbetalingerFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;

    const datoer = getUtbetalingerForSiste30DagerDatoer();
    const fra = dayjs(datoer.fra).format(backendDatoformat);
    const til = dayjs(datoer.til).format(backendDatoformat);

    return `${apiBaseUri}/utbetaling/${fodselsnummer}?startDato=${fra}&sluttDato=${til}`;
}

export default createRestResourceReducerAndActions<UtbetalingerResponse>(
    'utbetalinger-oversikt',
    getUtbetalingerFetchUri
);
