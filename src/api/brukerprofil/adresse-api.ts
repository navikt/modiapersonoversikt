import { apiBaseUri } from '../config';
import { post } from '../api';
import { Gateadresse, Matrikkeladresse } from '../../models/personadresse';

export interface EndreAdresseRequest {
    norskAdresse: {
        gateadresse: Gateadresse | null;
        matrikkeladresse: Matrikkeladresse | null;
    } | null;
}

export function postEndreAdresse(fødselsnummer: string, request: EndreAdresseRequest): Promise<{}> {
    console.log(request);
    return post(`${apiBaseUri}/brukerprofil/${fødselsnummer}/adresse/`, request);
}