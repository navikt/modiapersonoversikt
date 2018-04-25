import { apiBaseUri } from './config';
import { Egenansatt } from '../models/egenansatt';

export function getEgenAnsatt(fødeselsnummer: string): Promise<Egenansatt> {
    const uri =
        `${apiBaseUri}/egenansatt/${fødeselsnummer}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}
