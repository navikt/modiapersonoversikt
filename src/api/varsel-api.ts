import { apiBaseUri } from './config';
import { VarselResponse } from '../models/varsel';

export function getVarsel(fodselsnummer: string): Promise<VarselResponse> {
    const uri = `${apiBaseUri}/varsel/${fodselsnummer}/data`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
