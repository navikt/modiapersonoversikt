import { apiBaseUri, postConfig } from './config';
import { Oppgave } from '../models/oppgave';

export function plukkOppgaveFraServer(enhet: string, temagruppe: string): Promise<Oppgave[]> {
    const uri = `${apiBaseUri}/oppgave/plukk`;

    return fetch(uri, postConfig({enhet: enhet, temagruppe: temagruppe}))
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        });
}