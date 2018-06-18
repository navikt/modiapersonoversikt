import { formatNumber } from './string-utils';
import { Kodeverk, KodeverkResponse } from '../models/kodeverk';

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

export function sorterRetningsnummerMedNorgeFørst(retningsnummerKodeverk: KodeverkResponse) {
    let NORSK_RETNINGSNUMMER_PREFIX = '+47';
    const retningsnummerNorge = retningsnummerKodeverk.kodeverk.find(retningsnummer =>
        retningsnummer.kodeRef === NORSK_RETNINGSNUMMER_PREFIX);

    sorterRetningsnummerListe(retningsnummerKodeverk);

    const utlandskeRetningsnummer = retningsnummerKodeverk.kodeverk.filter(
        retningsnummer => retningsnummer.kodeRef !== NORSK_RETNINGSNUMMER_PREFIX);

    if (retningsnummerNorge && utlandskeRetningsnummer) {
        retningsnummerKodeverk.kodeverk = [retningsnummerNorge].concat(utlandskeRetningsnummer);
    }
    return retningsnummerKodeverk;
}

function sorterRetningsnummerListe(retningsnummerKodeverk: KodeverkResponse)  {
     retningsnummerKodeverk.kodeverk.sort(
        function (a: Kodeverk, b: Kodeverk) {
            var x = a.value.toLowerCase();
            var y = b.value.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });

}
