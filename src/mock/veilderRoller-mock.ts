import * as faker from 'faker/locale/nb_NO';

import { VeilederRoller } from '../models/veilederRoller';
import { vektetSjanse } from './utils/mock-utils';

export function getMockVeilederRoller(): VeilederRoller {
    let roller = [];

    if (vektetSjanse(faker, 0.5)) {
        roller.push('0000-GA-BD06_EndreNavn');
    }

    if (vektetSjanse(faker, 0.5)) {
        roller.push('0000-GA-BD06_EndreKontonummer');
    }

    return { roller: roller };
}
