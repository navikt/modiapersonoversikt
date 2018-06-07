import { apiBaseUri, postConfig } from '../config';
import { EndreNavnRequest } from '../../redux/brukerprofil/endreNavnRequest';

export function postEndreNavn(request: EndreNavnRequest): Promise<{}> {
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/navn/`;

    return fetch(uri, postConfig(request))
        .then((response) => {
            if (response.ok) {
                return {};
            } else {
                throw response.statusText;
            }
        });
}