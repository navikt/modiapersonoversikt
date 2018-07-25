import { apiBaseUri } from './config';
import { Oppgave } from '../models/oppgave';

export function plukkOppgaveFraServer(enhet: string, temagruppe: string): Promise<Oppgave[]> {
    const uri = `${apiBaseUri}/oppgaver/plukk/${temagruppe}`;

    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        });
}