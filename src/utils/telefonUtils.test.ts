import { formaterMobiltelefonnummer, formaterTelefonnummer, gyldigTelefonnummer } from './telefon-utils';

it('returnerer formatert mobiltelefon', () => {
    const telefonnummer = '90000000';

    const formatertTelefonnummer = formaterMobiltelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('90 00 00 00');
});

it('returnerer formatert mobiltelefon med retningskode', () => {
    const telefonnummer = '+4790000000';

    const formatertTelefonnummer = formaterMobiltelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('+47 90 00 00 00');
});

it('returnerer formatert 800-telefonnummer basert på tre første siffer', () => {
    const telefonnummer = '80000000';

    const formatertTelefonnummer = formaterTelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('800 00 000');
});

it('returnerer formatert hustelefon basert på første siffer', () => {
    const telefonnummer = '20000000';

    const formatertTelefonnummer = formaterTelefonnummer(telefonnummer);

    expect(formatertTelefonnummer).toEqual('20 00 00 00');
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
