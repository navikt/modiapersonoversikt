import { UtbetalingerResponse } from '../../models/utbetalinger';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import dayjs from 'dayjs';
import {
    getFraDateFromFilter,
    getTilDateFromFilter
} from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';

function getUtbetalingerFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;

    const utbetalingerFilter = state.utbetalinger.filter;
    const startDato = getFraDateFromFilter(utbetalingerFilter);
    const sluttDato = getTilDateFromFilter(utbetalingerFilter);
    const fra = dayjs(startDato).format('YYYY-MM-DD');
    const til = dayjs(sluttDato).format('YYYY-MM-DD');

    return `${apiBaseUri}/utbetaling/${fodselsnummer}?startDato=${fra}&sluttDato=${til}`;
}

export default createRestResourceReducerAndActions<UtbetalingerResponse>('utbetalinger', getUtbetalingerFetchUri);
