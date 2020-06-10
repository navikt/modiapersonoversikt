import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { GsakTema } from '../../../models/meldinger/oppgave';

function getGsakTemaFetchUri(): string {
    return `${apiBaseUri}/dialogoppgave/tema`;
}

export default createRestResourceReducerAndActions<GsakTema[]>('oppgaverGsakTema', getGsakTemaFetchUri);
