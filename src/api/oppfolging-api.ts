import { apiBaseUri } from './config';
import { Oppfolging } from '../models/oppfolging';

export function getOppfolging(fodselsnummer: string): Promise<Oppfolging> {
    const uri = `${apiBaseUri}/oppfolging/${fodselsnummer}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
