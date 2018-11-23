import { SakstemaResponse } from '../models/saksoversikt/sakstema';
import { apiBaseUri } from './config';

export function getSaksoversikt(fodselsnummer: string): Promise<SakstemaResponse> {
    const uri = `${apiBaseUri}/saker/${fodselsnummer}/sakstema`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}