import { Kjønn } from '../models/person/person';

export function utledKjønnFraFødselsnummer(fødselsnummer: string): Kjønn {
    return Number(fødselsnummer.charAt(8)) % 2 === 1 ? Kjønn.Mann : Kjønn.Kvinne;
}

export function erDnummer(fødselsnummer: string) {
    const dag = Number(fødselsnummer.substring(0, 2));
    return dag > 40 && dag <= 71;
}