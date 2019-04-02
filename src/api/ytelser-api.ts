import { apiBaseUri } from './config';
import { SykepengerResponse } from '../models/ytelse/sykepenger';
import { ForeldrepengerResponse } from '../models/ytelse/foreldrepenger';
import { PleiepengerResponse } from '../models/ytelse/pleiepenger';

export function getSykepenger(fodselsnummer: string): Promise<SykepengerResponse> {
    const uri = `${apiBaseUri}/ytelse/sykepenger/${fodselsnummer}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}

export function getForeldrepenger(fodselsnummer: string): Promise<ForeldrepengerResponse> {
    const uri = `${apiBaseUri}/ytelse/foreldrepenger/${fodselsnummer}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}

export function getPleiepenger(fodselsnummer: string): Promise<PleiepengerResponse> {
    const uri = `${apiBaseUri}/ytelse/pleiepenger/${fodselsnummer}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
