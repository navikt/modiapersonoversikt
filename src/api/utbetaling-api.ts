import { UtbetalingerResponse } from '../models/utbetalinger';
import { apiBaseUri } from './config';

export function getUtbetalinger(fodselsnummer: string): Promise<UtbetalingerResponse> {
    const uri = `${apiBaseUri}/utbetaling/${fodselsnummer}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}