import faker from 'faker/locale/nb_NO';

import { VeilederRoller } from '../models/veilederRoller';
import { vektetSjanse } from './utils/mock-utils';
import { SaksbehandlerRoller } from '../app/personside/dialogpanel/RollerUtils';

export function getMockVeilederRoller(): VeilederRoller {
    let roller = [];

    if (vektetSjanse(faker, 0.9)) {
        roller.push(SaksbehandlerRoller.HentOppgave);
    }

    return { roller: roller };
}
