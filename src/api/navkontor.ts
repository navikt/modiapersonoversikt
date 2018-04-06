import { apiBaseUri } from './config';
import { NavKontorInterface } from '../models/navkontor';

export function getNavkontor(geografiskTilknytning: string): Promise<NavKontorInterface> {
    const uri = `${apiBaseUri}/navkontor/${geografiskTilknytning}`;
    return fetch(uri)
        .then((response) => response.json());
}
