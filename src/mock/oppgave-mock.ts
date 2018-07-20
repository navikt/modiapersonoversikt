import * as faker from 'faker/locale/nb_NO';
import { Oppgave } from '../models/oppgave';
import { randomFodselsnummer } from './utils/fnr-utils';

export function getTilfeldigeOppgaver(): Oppgave[] {
    return Array.from({length: faker.random.number({min: 0, max: 4})}, () => {
        return {fodselsnummer: randomFodselsnummer(), henvendelseId: '123'};
    });
}
