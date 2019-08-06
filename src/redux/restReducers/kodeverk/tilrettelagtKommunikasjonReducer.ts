import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { KodeverkResponse } from '../../../models/kodeverk';

export default createRestResourceReducerAndActions<KodeverkResponse>(
    'kodeverk-tilrettelagt-kommunikasjon',
    () => `${apiBaseUri}/kodeverk/TilrettelagtKommunikasjon`
);
