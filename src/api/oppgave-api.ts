import { apiBaseUri } from './config';
import { Oppgave } from '../models/oppgave';

export function plukkOppgaveFraServer(enhet: string, temagruppe: string): Promise<Oppgave[]> {
    const postConfig = {
        body: JSON.stringify({enhet: enhet, temagruppe: temagruppe}),
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

    const uri = `${apiBaseUri}/oppgave/plukk`;
    return fetch(uri, postConfig)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}