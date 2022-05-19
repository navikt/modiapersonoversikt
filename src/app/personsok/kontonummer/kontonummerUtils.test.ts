import { erGyldigNorskKontonummer, removeWhitespaceAndDot, validerLengdeOgTallPaKontonummer } from './kontonummerUtils';

it('Validerer gyldig norsk kontonummer', () => {
    const kontonummer = '12345678911';

    expect(erGyldigNorskKontonummer(kontonummer)).toBe(true);
});

it('Validerer fjerning av punktum og whitespace', () => {
    const kontonummer = '1234.56 78911';

    expect(removeWhitespaceAndDot(kontonummer)).toHaveLength(11);
});

it('Validerer ugyldig når bokstaver i kontonummer', () => {
    const kontonummer = '12345.67 891a';

    expect(validerLengdeOgTallPaKontonummer(kontonummer)).toBe(false);
});

it('Validerer ugyldig kontonummer', () => {
    const kontonummer = '12345678910';

    expect(erGyldigNorskKontonummer(kontonummer)).toBe(false);
});
