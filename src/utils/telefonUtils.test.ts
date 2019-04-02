import {
    formaterMobiltelefonnummer,
    formaterTelefonnummer,
    gyldigTelefonnummer,
    sorterRetningsnummerMedNorgeFørst
} from './telefon-utils';
import { mockRetningsnummereKodeverk } from '../mock/kodeverk/retningsnummer-mock';

it('returnerer formatert mobiltelefon', () => {
    const telefonnummer = '90000000';

    const formatertTelefonnummer = formaterMobiltelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('900 00 000');
});

it('returnerer formatert mobiltelefon med retningskode', () => {
    const telefonnummer = '+4790000000';

    const formatertTelefonnummer = formaterMobiltelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('+47 900 00 000');
});

it('returnerer formatert mobiltelefon basert på første siffer', () => {
    const telefonnummer = '90000000';

    const formatertTelefonnummer = formaterTelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('900 00 000');
});

it('returnerer formatert hustelefon basert på første siffer', () => {
    const telefonnummer = '20000000';

    const formatertTelefonnummer = formaterTelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('20 00 00 00');
});

test('sorterer retningsnummer med norge først', () => {
    var kodeverkRepsonse = mockRetningsnummereKodeverk();

    const sorterteRetningsnummer = sorterRetningsnummerMedNorgeFørst(kodeverkRepsonse);

    expect(sorterteRetningsnummer.kodeverk[0].kodeRef).toBe('+47');
    expect(sorterteRetningsnummer.kodeverk[1].kodeRef).toBe('+54');
});

test('validerer et gyldig telefonnummer', () => {
    expect(gyldigTelefonnummer('55553333')).toBeTruthy();
});

test('validerer et gyldig telefonnummer med mellomrom', () => {
    expect(gyldigTelefonnummer('55 55 33 33')).toBeTruthy();
});

test('validerer ikke et ugyldig telefonnummer', () => {
    expect(gyldigTelefonnummer('❤❤ ❤❤ ❤❤ ❤❤')).toBeFalsy();
});

test('validerer ikke et tomt telefonnummer', () => {
    expect(gyldigTelefonnummer('')).toBeFalsy();
});
