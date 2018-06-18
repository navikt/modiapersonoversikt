import { apiBaseUri } from './config';
import { BrukersNavKontorResponse } from '../models/navkontor';

export function getNavkontor(geografiskTilknytning?: string, diskresjonsKode?: string)
: Promise<BrukersNavKontorResponse> {
    const uri =
        `${apiBaseUri}/enheter?gt=${geografiskTilknytning}${diskresjonsKode ? '&dkode=' + diskresjonsKode : ''}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return transformResponse(response);
            } else if (response.status === 404) {
                return {
                    navKontor: null
                };
            } else {
                throw response.statusText;
            }
        });
}

function transformResponse(response: Response): Promise<BrukersNavKontorResponse> {
    return response.json().then(navKontor => {
        return {
            navKontor
        };
    });
}