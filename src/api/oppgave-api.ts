import { apiBaseUri, postConfig } from './config';
import { Oppgave } from '../models/oppgave';

export function plukkOppgaveFraServer(temagruppe: string): Promise<Oppgave[]> {
    const uri = `${apiBaseUri}/oppgaver/plukk/${temagruppe}`;

    return fetch(uri, postConfig({}))
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        });
}