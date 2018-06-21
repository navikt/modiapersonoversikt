import { apiBaseUri } from '../config';
import { post } from '../api';
import { EndreKontonummerRequest } from '../../redux/brukerprofil/endreKontonummerRequest';

export function postEndreKontonummer(fødselsnummer: string, request: EndreKontonummerRequest): Promise<{}> {
    const uri = `${apiBaseUri}/brukerprofil/${fødselsnummer}/kontonummer/`;
    console.log(request);
    return post(uri, request);
}
