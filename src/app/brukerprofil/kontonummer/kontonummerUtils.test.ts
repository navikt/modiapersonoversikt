import { validerKontonummer } from './kontonummerUtils';

it('Validerer gyldig kontonummer', () => {
    const kontonummer = '12345678911';

    expect(validerKontonummer(kontonummer)).toBe(true);
});

it('Validerer gyldig kontonummer med punktum og mellomrom', () => {
    const kontonummer = '12345.67 8911';

    expect(validerKontonummer(kontonummer)).toBe(true);
});

it('Validerer ikke ugyldig kontonummer', () => {
    const kontonummer = '12345678910';

    expect(validerKontonummer(kontonummer)).toBe(false);
});
