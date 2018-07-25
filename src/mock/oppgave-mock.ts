import * as faker from 'faker/locale/nb_NO';
import { Oppgave } from '../models/oppgave';
import { randomFodselsnummer } from './utils/fnr-utils';
import { vektetSjanse } from './utils/mock-utils';

export function getTilfeldigeOppgaver(): Oppgave[] {
    if (vektetSjanse(faker, 0.1)) {
        return [];
    }

    return Array.from({length: faker.random.number({min: 1, max: 4})}, () => {
        return {fodselsnummer: randomFodselsnummer(), henvendelseId: '123'};
    });
}
