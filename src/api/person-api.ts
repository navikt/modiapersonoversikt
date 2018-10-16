import { PersonRespons } from '../models/person/person';
import { apiBaseUri } from './config';
import { loggEvent } from '../utils/frontendLogger';

export function getPerson(fodselsnummer: string): Promise<PersonRespons> {
    loggEvent('fetch.person');
    const uri = `${apiBaseUri}/person/${fodselsnummer}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}
