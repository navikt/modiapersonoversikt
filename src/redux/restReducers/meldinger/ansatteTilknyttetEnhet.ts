import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { Ansatt } from '../../../models/meldinger/oppgave';

function getAnsatteUri(state: AppState): string {
    return `${apiBaseUri}/enheter/${state.oppgaver.valgtEnhet!.enhetId}/ansatte`;
}

export default createRestResourceReducerAndActions<Ansatt[]>('ansatteTilknyttetEnhet', getAnsatteUri);
