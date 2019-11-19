import { UtbetalingerResponse } from '../../models/utbetalinger';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import { getUtbetalingerForSiste30DagerDatoer } from '../../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import moment from 'moment';
import { backendDatoformat } from '../../mock/utils/mock-utils';

export function getUtbetalingerFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;

    const datoer = getUtbetalingerForSiste30DagerDatoer();
    const fra = moment(datoer.fra).format(backendDatoformat);
    const til = moment(datoer.til).format(backendDatoformat);

    return `${apiBaseUri}/utbetaling/${fodselsnummer}?startDato=${fra}&sluttDato=${til}`;
}

export default createRestResourceReducerAndActions<UtbetalingerResponse>(
    'utbetalinger-oversikt',
    getUtbetalingerFetchUri
);
