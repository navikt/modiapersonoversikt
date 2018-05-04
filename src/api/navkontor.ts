import { apiBaseUri } from './config';
import { NavKontor } from '../models/navkontor';

export function getNavkontor(geografiskTilknytning?: string, diskresjonsKode?: string): Promise<NavKontor> {
    const uri =
        `${apiBaseUri}/enheter/geo/?gt=${geografiskTilknytning}${diskresjonsKode ? '&dkode=' + diskresjonsKode : ''}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                return new Promise((resolve) => {
                    resolve(undefined);
                });
            } else {
                throw response.statusText;
            }
        });
}
