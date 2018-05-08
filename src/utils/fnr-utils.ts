import { Kjønn } from '../models/person/person';

export function utledKjønnFraFødselsnummer(fødselsnummer: string): Kjønn {
    return Number(fødselsnummer.charAt(8)) % 2 === 1 ? Kjønn.Mann : Kjønn.Kvinne;
}