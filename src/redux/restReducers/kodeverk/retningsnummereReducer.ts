import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { KodeverkResponse } from '../../../models/kodeverk';
import { apiBaseUri } from '../../../api/config';

export default createRestResourceReducerAndActions<KodeverkResponse>(
    'kodeverk-retningsnummer',
    () => `${apiBaseUri}/kodeverk/Retningsnumre`
);
