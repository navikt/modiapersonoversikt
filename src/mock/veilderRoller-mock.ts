import { fakerNB_NO as faker } from '@faker-js/faker';

import { VeilederRoller } from '../models/veilederRoller';
import { vektetSjanse } from './utils/mock-utils';
import { SaksbehandlerRoller } from '../app/personside/dialogpanel/RollerUtils';

export function getMockVeilederRoller(): VeilederRoller {
    const roller = [];

    if (vektetSjanse(faker, 0.9)) {
        roller.push(SaksbehandlerRoller.HentOppgave);
    }

    return { roller: roller };
}
