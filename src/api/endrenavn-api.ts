import { apiBaseUri } from './config';
import { Oppgave } from '../models/oppgave';
import { EndreNavnRequest } from '../redux/brukerprofil/endreNavnRequest';

export function postEndreNavn(request: EndreNavnRequest): Promise<Oppgave[]> {
    const postConfig = {
        body: JSON.stringify(request),
        cache: 'no-cache' as RequestCache ,
        credentials: 'same-origin' as RequestCredentials,
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors' as RequestMode,
        redirect: 'follow' as RequestRedirect,
        referrer: 'no-referrer'
    };

    const uri = `${apiBaseUri}/person/${request.fødselsnummer}/brukerprofil/navn`;
    return fetch(uri, postConfig)
        .then((response) => response.json());
}