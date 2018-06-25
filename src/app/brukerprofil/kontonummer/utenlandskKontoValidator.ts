import { EndreBankkontoState } from './kontonummerUtils';
import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';
import { erIkkeTomStreng } from '../../../utils/string-utils';

const BANK_UTLAND_NAVN_REGEX = RegExp('^\\s*.{0,36}\\s*$');
const BANK_UTLAND_ADRESSE_REGEX = RegExp('^\\s*.{0,34}\\s*$');
const BANK_UTLAND_KODE_REGEX = RegExp('^\\s*.{0,36}\\s*$');
const BANK_UTLAND_KONTONUMMER_REGEX = RegExp('^\\s*.{0,36}\\s*$');
const SWIFT_REGEX = RegExp('^\\s*.{0,11}\\s*$');

const regler: Valideringsregel<EndreBankkontoState>[] = [{
    felt: 'kontonummer',
    feilmelding: 'Kontonummer må ikke være tom',
    validator: (konto: EndreBankkontoState) => erIkkeTomStreng(konto.kontonummer)
}, {
    felt: 'kontonummer',
    feilmelding: 'Kontonummer må være under 36 tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_KONTONUMMER_REGEX.test(konto.kontonummer)
}, {
    felt: 'banknavn',
    feilmelding: 'Banknavn må være under 36 tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_NAVN_REGEX.test(konto.banknavn || '')
}, {
    felt: 'bankkode',
    feilmelding: 'Bankkode må være under 36 tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_KODE_REGEX.test(konto.bankkode)
}, {
    felt: 'swift',
    feilmelding: 'Swift må være under 11 tegn',
    validator: (konto: EndreBankkontoState) =>
        SWIFT_REGEX.test(konto.swift)
}, {
    felt: 'adresse',
    feilmelding: 'Hver enkelt adresselinje må være på under 34 tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_ADRESSE_REGEX.test(konto.adresse.linje1)
        && BANK_UTLAND_ADRESSE_REGEX.test(konto.adresse.linje2)
        && BANK_UTLAND_ADRESSE_REGEX.test(konto.adresse.linje3)
}];

export function validerUtenlandskKonto(gateadresse: EndreBankkontoState) {
    return new FormValidator<EndreBankkontoState>(regler).valider(gateadresse);
}
