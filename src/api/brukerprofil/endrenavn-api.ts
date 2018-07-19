import { apiBaseUri } from '../config';
import { EndreNavnRequest } from '../../redux/restReducers/brukerprofil/endreNavnRequest';
import { post } from '../api';

export function postEndreNavn(request: EndreNavnRequest): Promise<{}> {
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/navn/`;
    return post(uri, request);
}