import { apiBaseUri, postConfig } from '../config';
import { EndreTilrettelagtKommunikasjonrequest } from '../../redux/brukerprofil/endreTilrettelagtKommunikasjonrequest';

export function postEndreTilrettelagtKommunikasjon(request: EndreTilrettelagtKommunikasjonrequest): Promise<{}> {
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/tilrettelagtkommunikasjon/`; // TODO

    return fetch(uri, postConfig(request))
        .then((response) => {
            if (response.ok) {
                return {};
            } else {
                throw response.statusText;
            }
        });
}
