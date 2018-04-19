import { Kjønn } from '../models/person';

export function utledbarnFraFødselsnummer(fødselsnummer: string) {
    return Number(fødselsnummer.charAt(8)) % 2 === 1 ? Kjønn.Mann : Kjønn.Kvinne;
}