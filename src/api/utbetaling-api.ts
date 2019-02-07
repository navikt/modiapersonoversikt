import { UtbetalingerResponse } from '../models/utbetalinger';
import { apiBaseUri } from './config';
import moment from 'moment';

export function getUtbetalinger(
    fodselsnummer: string,
    startDato: Date,
    sluttDato: Date)
: Promise<UtbetalingerResponse> {
    const fra = moment(startDato).format('YYYY-MM-DD');
    const til = moment(sluttDato).format('YYYY-MM-DD');
    const uri = `${apiBaseUri}/utbetaling/${fodselsnummer}?startDato=${fra}&sluttDato=${til}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}