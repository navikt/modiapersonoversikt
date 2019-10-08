import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { Enhet } from '../../../models/meldinger/oppgave';

function getEnheterUri(state: AppState): string {
    return `${apiBaseUri}/enheter/dialog/oppgave/alle`;
}

export default createRestResourceReducerAndActions<Enhet[]>('oppgaveAlleEnheter', getEnheterUri);
