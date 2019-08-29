import { Oppgave } from '../../models/oppgave';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';

export default createRestResourceReducerAndActions<Oppgave[]>(
    'tildelteoppgaver',
    () => `${apiBaseUri}/oppgaver/tildelt`
);
