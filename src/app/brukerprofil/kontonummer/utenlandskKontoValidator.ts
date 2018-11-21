import { EndreBankkontoState, tomBankkonto } from './kontonummerUtils';
import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';
import { erIkkeTomStreng } from '../../../utils/string-utils';

const BANK_UTLAND_NAVN_REGEX = RegExp('^\\s*.{0,36}\\s*$');
const BANK_UTLAND_ADRESSE_REGEX = RegExp('^\\s*.{0,34}\\s*$');
const BANK_UTLAND_KODE_REGEX = RegExp('^\\s*.{0,36}\\s*$');
const BANK_UTLAND_KONTONUMMER_REGEX = RegExp('^\\s*.{0,36}\\s*$');
const SWIFT_REGEX = RegExp('^\\s*.{0,11}\\s*$');

const regler: Valideringsregel<EndreBankkontoState>[] = [{
    felt: 'landkode',
    feilmelding: 'Du må velge et land',
    validator: (konto: EndreBankkontoState) => erIkkeTomStreng(konto.landkode.kodeRef)
}, {
    felt: 'valuta',
    feilmelding: 'Du må velge en valuta',
    validator: (konto: EndreBankkontoState) => erIkkeTomStreng(konto.valuta.kodeRef)
}, {
    felt: 'utenlandskKontonummer',
    feilmelding: 'Kontonummer må ikke være tom',
    validator: (konto: EndreBankkontoState) => erIkkeTomStreng(konto.utenlandskKontonummer)
}, {
    felt: 'utenlandskKontonummer',
    feilmelding: 'Kontonummer må være 36 eller færre tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_KONTONUMMER_REGEX.test(konto.utenlandskKontonummer)
}, {
    felt: 'banknavn',
    feilmelding: 'Banknavn må være 36 eller færre tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_NAVN_REGEX.test(konto.banknavn || '')
}, {
    felt: 'bankkode',
    feilmelding: 'Bankkode må være 36 eller færre tegn',
    validator: (konto: EndreBankkontoState) =>
        BANK_UTLAND_KODE_REGEX.test(konto.bankkode)
}, {
    felt: 'swift',
    feilmelding: 'Swift må være 11 eller færre tegn',
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

export function validerUtenlandskKonto(bankKonto: EndreBankkontoState) {
    return new FormValidator<EndreBankkontoState>(regler).valider(bankKonto);
}

export function getValidUtenlandskKontoForm() {
    return new FormValidator<EndreBankkontoState>([]).valider(tomBankkonto);
}
