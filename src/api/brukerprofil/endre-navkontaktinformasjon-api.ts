import { apiBaseUri } from '../config';
import { post } from '../api';

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
    return post(uri, request);
}