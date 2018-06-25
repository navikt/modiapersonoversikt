import { formatNumber } from '../../../utils/string-utils';
import { BankAdresse, Person } from '../../../models/person/person';
import { Kodeverk } from '../../../models/kodeverk';

export function formaterNorskKontonummer(kontonummer: string): string {
    const rensetKontonummer: string = removeWhitespaceAndDot(kontonummer);
    if (rensetKontonummer.length >= 11) {
        return formatNumber('#### ## #####', rensetKontonummer);
    }
    return kontonummer;
}

export function erBrukersKontonummerUtenlandsk(person: Person) {
    return person.bankkonto && person.bankkonto.landkode && person.bankkonto.landkode.kodeRef !== 'NOR';
}

export function validerKontonummer(kontonummer?: string) {
    if (!kontonummer) {
        return false;
    }

    kontonummer = removeWhitespaceAndDot(kontonummer);
    if (kontonummer.length !== 11) {
        return false;
    }

    return parseInt(kontonummer.charAt(kontonummer.length - 1), 10)
        === mod11FraTallMedKontrollsiffer(kontonummer);
}

export function removeWhitespaceAndDot(kontonummer: string): string {
    return kontonummer.toString().replace(/[. ]/g, '');
}

export function mod11FraTallMedKontrollsiffer(kontonummer: string) {
    let controlNumber: number = 2,
        sumForMod: number = 0;

    for (let i = kontonummer.length - 2; i >= 0; --i) {
        sumForMod += parseInt(kontonummer.charAt(i), 10) * controlNumber;
        if (++controlNumber > 7) {
            controlNumber = 2;
        }
    }

    const result = (11 - sumForMod % 11);
    return result === 11 ? 0 : result;
}

export interface EndreBankkontoState {
    kontonummer: string;
    banknavn: string | null;
    bankkode: string;
    swift: string;
    landkode: Kodeverk;
    adresse: BankAdresse;
    valuta: Kodeverk;
    sistEndret: string;
    sistEndretAv: string;
}

export const tomBankkonto: EndreBankkontoState = {
    kontonummer: '',
    banknavn: '',
    bankkode: '',
    swift: '',
    landkode: {
        kodeRef: '',
        beskrivelse: ''
    },
    adresse: {
        linje1: '',
        linje2: '',
        linje3: ''
    },
    valuta: {
        kodeRef: '',
        beskrivelse: ''
    },
    sistEndret: '',
    sistEndretAv: ''
};