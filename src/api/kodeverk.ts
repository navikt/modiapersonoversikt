import { apiBaseUri } from './config';
import { KodeverkResponse } from '../models/kodeverk';

export function fetchKodeverk(kodeverkRef: string): Promise<KodeverkResponse> {
    const uri =
        `${apiBaseUri}/kodeverk/${kodeverkRef}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}
