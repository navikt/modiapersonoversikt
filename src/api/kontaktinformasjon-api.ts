import { KRRKontaktinformasjon } from '../models/kontaktinformasjon';
import { apiBaseUri } from './config';

export function getKontaktinformasjon(fodselsnummer: string): Promise<KRRKontaktinformasjon> {
    const uri = `${apiBaseUri}/person/${fodselsnummer}/kontaktinformasjon`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
