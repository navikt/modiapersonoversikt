import { formatNumber, removeWhitespace } from './string-utils';

export function formaterMobiltelefonnummer(telefonnummer: string) {
    if (telefonnummer.startsWith('+') && telefonnummer.length === 11) {
        return formatNumber('### ## ## ## ##', telefonnummer);
    }
    if (telefonnummer.length === 8) {
        return formatNumber('## ## ## ##', telefonnummer);
    }
    return telefonnummer;
}

export function formaterTelefonnummer(telefonnummer: string) {
    const utenSpace = removeWhitespace(telefonnummer);
    if (utenSpace.length !== 8) {
        return telefonnummer;
    }
    if (utenSpace.startsWith('800')) {
        return formatNumber('### ## ###', utenSpace);
    }
    return formatNumber('## ## ## ##', utenSpace);
}

export function gyldigTelefonnummer(telefonnummer: string): boolean {
    return /^[\d ]+$/.test(telefonnummer);
}
