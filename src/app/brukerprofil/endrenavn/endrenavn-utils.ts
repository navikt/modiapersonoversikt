import { erDnummer } from '../../../utils/fnr-utils';
import { BostatusTyper, Person } from '../../../models/person/person';
import { VeilederRoller } from '../../../models/veilederRoller';

export function brukersNavnKanEndres(person: Person): boolean {
    if (erDnummer(person.fødselsnummer)) {
        return true;
    } else if (person.personstatus.bostatus && person.personstatus.bostatus.kodeRef === BostatusTyper.Utvandret) {
        return true;
    }

    return false;
}

export function validerNavn(input: string) {
    if (input.trim().length === 0) {
        throw new Error('Navn kan ikke være tomt');
    }
}

export function veilederHarPåkrevdRolle(veiledersRoller?: VeilederRoller) {
    if (!veiledersRoller) {
        return false;
    }
    return veiledersRoller.roller.includes('0000-GA-BD06_EndreNavn');
}