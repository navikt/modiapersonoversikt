import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { apiBaseUri } from '../../../api/config';
import { KodeverkResponse } from '../../../models/kodeverk';

export default createRestResourceReducerAndActions<KodeverkResponse>(
    'kodeverk-land',
    () => `${apiBaseUri}/kodeverk/Landkoder`
);
