import { apiBaseUri } from './config';
import { Varsel } from '../models/varsel';

export function getVarsel(fodselsnummer: string): Promise<Varsel[]> {
    const uri = `${apiBaseUri}/varsel/${fodselsnummer}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
