import { apiBaseUri } from './config';
import { Vergemal } from '../models/vergemal/vergemal';

export function getVergemal(fødeselsnummer: string): Promise<Vergemal> {
    const uri =
        `${apiBaseUri}/person/${fødeselsnummer}/vergemal`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}
