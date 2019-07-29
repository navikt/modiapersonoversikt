import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { VeilederRoller } from '../../models/veilederRoller';
import { apiBaseUri } from '../../api/config';

export default createRestResourceReducerAndActions<VeilederRoller>(
    'veileder_roller',
    () => `${apiBaseUri}/veileder/roller`
);
