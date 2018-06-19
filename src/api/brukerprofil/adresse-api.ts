import { apiBaseUri } from '../config';
import { post } from '../api';

export interface EndreAdresseRequest {
}

export function postEndreAdresse(fødselsnummer: string, request: EndreAdresseRequest): Promise<{}> {
    console.log(request);
    return post(`${apiBaseUri}/brukerprofil/${fødselsnummer}/adresse/`, request);
}