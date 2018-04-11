import { apiBaseUri } from './config';
import { NavKontorInterface } from '../models/navkontor';

export function getNavkontor(geografiskTilknytning: string, diskresjonsKode?: string): Promise<NavKontorInterface> {
    const uri =
        `${apiBaseUri}/enheter/geo/${geografiskTilknytning}${diskresjonsKode ? '?dkode=' + diskresjonsKode : ''}`;
    return fetch(uri)
        .then((response) => response.json());
}
