import { Person } from '../models/person';
import { apiBaseUri } from './config';

export function getPerson(fodselsnummer: string): Promise<Person> {
    const uri = `${apiBaseUri}/person/${fodselsnummer}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => response.json());
}
