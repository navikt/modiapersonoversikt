import { apiBaseUri } from './config';
import { EndreTilrettelagtKommunikasjonrequest } from '../redux/brukerprofil/endreTilrettelagtKommunikasjonrequest';

export function postEndreTilrettelagtKommunikasjon(request: EndreTilrettelagtKommunikasjonrequest): Promise<{}> {
    const postConfig = {
        body: JSON.stringify(request),
        cache: 'no-cache' as RequestCache ,
        credentials: 'include' as RequestCredentials,
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors' as RequestMode,
        redirect: 'follow' as RequestRedirect,
    };
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/tilrettelagtkommunikasjon/`; // TODO
    return fetch(uri, postConfig)
        .then((response) => {
            if (response.ok) {
                return {};
            } else {
                throw response.statusText;
            }
        });
}
