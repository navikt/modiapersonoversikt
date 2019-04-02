import { Oppgave } from '../models/oppgave';
import navfaker from 'nav-faker';

export function getTilfeldigeOppgaver(): Oppgave[] {
    if (navfaker.random.vektetSjanse(0.05)) {
        return [];
    }

    return Array.from({ length: navfaker.random.integer(4, 1) }, () => {
        return { fødselsnummer: navfaker.personIdentifikator.fødselsnummer(), henvendelseId: '123', oppgaveid: '456' };
    });
}
