import { formatNumber } from '../../../utils/string-utils';

export function formaterNorskKontonummer(kontonummer: string | number): string {
    const rensetKontonummer: string = removeWhitespaceAndDot(kontonummer);
    if (rensetKontonummer.length === 11) {
        return formatNumber('##### ## ####', rensetKontonummer);
    }
    return kontonummer.toString();
}

export function validerKontonummer(kontonummer?: string | number) {
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

export function removeWhitespaceAndDot(kontonummer: string | number): string {
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
