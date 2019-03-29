import { apiBaseUri } from './config';
import { Traad } from '../models/meldinger/meldinger';

export function getMeldinger(fodselsnummer: string): Promise<Traad[]> {
    const uri = `${apiBaseUri}/meldinger/${fodselsnummer}/traader`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
