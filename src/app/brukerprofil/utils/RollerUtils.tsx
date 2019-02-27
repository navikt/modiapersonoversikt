import { VeilederRoller } from '../../../models/veilederRoller';

export function veilederHarPåkrevdRolleForEndreNavn(veiledersRoller: VeilederRoller) {
    return veiledersRoller.roller.includes('0000-GA-BD06_EndreNavn');
}

export function veilederHarPåkrevdRolleForEndreAdresse(veiledersRoller: VeilederRoller) {
    return veiledersRoller.roller.includes('0000-GA-BD06_EndreKontaktAdresse');
}

export function veilederHarPåkrevdRolleForEndreKontonummer(veiledersRoller: VeilederRoller) {
    return veiledersRoller.roller.includes('0000-GA-BD06_EndreKontonummer');
}
