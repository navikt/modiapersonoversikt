import { apiBaseUri } from './config';
import { EndreNavnRequest } from '../redux/brukerprofil/endreNavnRequest';

export function postEndreNavn(request: EndreNavnRequest): Promise<{}> {
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
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/navn/`;
    return fetch(uri, postConfig)
        .then((response) => {
            if (response.ok) {
                return {};
            } else {
                throw response.statusText;
            }
        });
}