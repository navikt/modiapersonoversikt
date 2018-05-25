import { apiBaseUri } from './config';
import { VeilederRoller } from '../models/veilederRoller';

export function fetchVeilederRoller(): Promise<VeilederRoller> {
    const uri =
        `${apiBaseUri}/veileder/roller`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}
