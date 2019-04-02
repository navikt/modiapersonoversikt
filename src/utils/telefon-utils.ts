import { removeWhitespace } from './string-utils';
import { Kodeverk, KodeverkResponse } from '../models/kodeverk';
import { formatNumber } from './stringFormatting';

export function formaterMobiltelefonnummer(telefonnummer: string) {
    if (telefonnummer.startsWith('+') && telefonnummer.length === 11) {
        return formatNumber('### ### ## ###', telefonnummer);
    } else if (telefonnummer.length === 8) {
        return formatNumber('### ## ###', telefonnummer);
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

export function sorterRetningsnummerMedNorgeFørst(retningsnummerKodeverk: KodeverkResponse) {
    const NORSK_RETNINGSNUMMER_PREFIX = '+47';
    const retningsnummerNorge = retningsnummerKodeverk.kodeverk.find(
        retningsnummer => retningsnummer.kodeRef === NORSK_RETNINGSNUMMER_PREFIX
    );

    sorterRetningsnummerListe(retningsnummerKodeverk);

    const utlandskeRetningsnummer = retningsnummerKodeverk.kodeverk.filter(
        retningsnummer => retningsnummer.kodeRef !== NORSK_RETNINGSNUMMER_PREFIX
    );

    if (retningsnummerNorge && utlandskeRetningsnummer) {
        retningsnummerKodeverk.kodeverk = [retningsnummerNorge].concat(utlandskeRetningsnummer);
    }
    return retningsnummerKodeverk;
}

function sorterRetningsnummerListe(retningsnummerKodeverk: KodeverkResponse) {
    retningsnummerKodeverk.kodeverk.sort(function(a: Kodeverk, b: Kodeverk) {
        var x = a.beskrivelse.toLowerCase();
        var y = b.beskrivelse.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });
}

export function gyldigTelefonnummer(telefonnummer: string): boolean {
    return /^[\d ]+$/.test(telefonnummer);
}
