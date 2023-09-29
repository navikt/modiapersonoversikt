import { removeWhitespace } from './string-utils';
import { formatNumber } from './string-utils';

export function formaterMobiltelefonnummer(telefonnummer: string) {
    if (telefonnummer.startsWith('+') && telefonnummer.length === 11) {
        return formatNumber('### ## ## ## ##', telefonnummer);
    } else if (telefonnummer.length === 8) {
        return formatNumber('## ## ## ##', telefonnummer);
    } else {
        return telefonnummer;
    }
}

export function formaterHustelefonnummer(telefonnummer: string) {
    if (telefonnummer.length === 8) {
        return formatNumber('## ## ## ##', telefonnummer);
    } else {
        return telefonnummer;
    }
}

export function formaterTelefonnummer(telefonnummer: string) {
    const utenSpace = removeWhitespace(telefonnummer);
    if (utenSpace.length !== 8) {
        return telefonnummer;
    } else if ('489'.includes(utenSpace[0])) {
        return formatNumber('### ## ###', utenSpace);
    } else {
        return formatNumber('## ## ## ##', utenSpace);
    }
}

export function gyldigTelefonnummer(telefonnummer: string): boolean {
    return /^[\d ]+$/.test(telefonnummer);
}
