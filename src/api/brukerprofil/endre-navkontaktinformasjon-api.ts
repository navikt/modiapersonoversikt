import { apiBaseUri } from '../config';
import { post } from '../api';

export interface Request {
    mobil?: Telefon;
    jobb?: Telefon;
    hjem?: Telefon;
}

interface Telefon {
    retningsnummer: string;
    identifikator: string;
}

export function postEndreNavKontaktinformasjon(request: Request, fødselsnummer: string): Promise<{}> {
    const uri = `${apiBaseUri}/brukerprofil/${fødselsnummer}/telefonnummer/`;
    return post(uri, request);
}
