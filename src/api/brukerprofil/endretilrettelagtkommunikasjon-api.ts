import { apiBaseUri } from '../config';
import { EndreTilrettelagtKommunikasjonrequest } from '../../redux/brukerprofil/endreTilrettelagtKommunikasjonrequest';
import { post } from '../api';

export function postEndreTilrettelagtKommunikasjon(request: EndreTilrettelagtKommunikasjonrequest): Promise<{}> {
    const uri = `${apiBaseUri}/brukerprofil/${request.fødselsnummer}/tilrettelagtkommunikasjon/`;
    return post(uri, request);
}
