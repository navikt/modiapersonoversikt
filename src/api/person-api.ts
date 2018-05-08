import { PersonRespons } from '../models/person/person';
import { apiBaseUri } from './config';

export function getPerson(fodselsnummer: string): Promise<PersonRespons> {
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
