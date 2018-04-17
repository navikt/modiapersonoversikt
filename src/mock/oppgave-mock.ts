import { Oppgave } from '../models/oppgave';
import { randomFodselsnummer } from './utils/fnr-utils';

export function getTilfeldigeOppgaver(): Oppgave[] {
    return [
        {
            fodselsnummer: randomFodselsnummer(),
            henvendelseId: '123'
        }
    ];
}
