import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { GsakTema } from '../../../models/meldinger/oppgave';

function getGsakTemaFetchUri(): string {
    return `${apiBaseUri}/dialogoppgave/v2/tema`;
}

export default createRestResourceReducerAndActions<GsakTema[]>('oppgaverGsakTema', getGsakTemaFetchUri);
