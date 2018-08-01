import { Oppgave } from '../models/oppgave';
import navfaker from 'nav-faker';

export function getTilfeldigeOppgaver(): Oppgave[] {
    if (navfaker.random.vektetSjanse(0.05)) {
        return [];
    }

    return Array.from({length: navfaker.random.number({min: 1, max: 4})}, () => {
        return {fødselsnummer: navfaker.fødselsnummer.generer(), henvendelseId: '123', oppgaveid: '456'};
    });
}
