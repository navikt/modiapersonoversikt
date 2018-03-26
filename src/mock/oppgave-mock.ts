import { Oppgave } from '../models/oppgave';
import fnrGenerator from 'fnr-generator';

export function getTilfeldigeOppgaver(): Oppgave[] {
    return [
        {
            fodselsnummer: randomFodselsnummer(),
            henvendelseId: '123'
        }
    ];
}

function randomFodselsnummer(): string {
    const tilfeldigDato = lagTilfeldigDato(new Date(1900, 0, 1), new Date());
    return fnrGenerator(tilfeldigDato).next().value;
}

function lagTilfeldigDato(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
