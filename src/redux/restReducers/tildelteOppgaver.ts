import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { Oppgave } from '../../models/meldinger/oppgave';

export default createRestResourceReducerAndActions<Oppgave[]>(
    'tildelteoppgaver',
    () => `${apiBaseUri}/oppgaver/tildelt`
);
