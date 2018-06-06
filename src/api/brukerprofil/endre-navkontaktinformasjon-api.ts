import { apiBaseUri } from '../config';

export interface Request {
    mobil?: Telefon;
    jobb?: Telefon;
    hjem?: Telefon;
    fødselsnummer: string;
}

interface Telefon {
    retningsnummer: string;
    identifikator: string;
}

export function fetchEndreNavKontaktinformasjon(request: Request): Promise<{}> {
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
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/telefon/`;
    return fetch(uri, postConfig)
        .then((response) => {
            if (response.ok) {
                return {};
            } else {
                throw response.statusText;
            }
        });
}