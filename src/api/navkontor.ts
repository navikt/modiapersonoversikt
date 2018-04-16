import { apiBaseUri } from './config';
import { NavKontor } from '../models/navkontor';

export function getNavkontor(geografiskTilknytning: string, diskresjonsKode?: string): Promise<NavKontor> {
    const uri =
        `${apiBaseUri}/enheter/geo/${geografiskTilknytning}${diskresjonsKode ? '?dkode=' + diskresjonsKode : ''}`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => response.json());
}
