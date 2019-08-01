import { UtbetalingerResponse } from '../../models/utbetalinger';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import moment from 'moment';
import {
    getFraDateFromFilter,
    getTilDateFromFilter
} from '../../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';

export const tidligsteTilgjengeligeDatoUtbetalingerRestkonto = moment()
    .subtract(5, 'year')
    .startOf('year')
    .toDate();

export function getUtbetalingerFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;

    const utbetalingerFilter = state.utbetalinger.filter;
    const startDato = getFraDateFromFilter(utbetalingerFilter);
    const sluttDato = getTilDateFromFilter(utbetalingerFilter);
    const fra = moment(startDato).format('YYYY-MM-DD');
    const til = moment(sluttDato).format('YYYY-MM-DD');

    return `${apiBaseUri}/utbetaling/${fodselsnummer}?startDato=${fra}&sluttDato=${til}`;
}

export default createRestResourceReducerAndActions<UtbetalingerResponse>('utbetalinger', getUtbetalingerFetchUri);
