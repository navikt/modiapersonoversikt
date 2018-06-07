import { apiBaseUri, postConfig } from '../config';

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
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/telefon/`;

    return fetch(uri, postConfig(request))
        .then((response) => {
            if (response.ok) {
                return {};
            } else {
                throw response.statusText;
            }
        });
}