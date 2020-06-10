import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { SykepengerResponse } from '../../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';

function getSykepenger(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/ytelse/sykepenger/${fnr}`;
}

export default createRestResourceReducerAndActions<SykepengerResponse>('sykepenger', getSykepenger);
