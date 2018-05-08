import { formatNumber } from './helpers';

export function formaterMobiltelefonnummer(telefonnummer: string) {
    if (telefonnummer.startsWith('+') && telefonnummer.length === 11) {
        return formatNumber('### ### ## ###', telefonnummer);
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
