import { formatertKontonummerString } from './FormatertKontonummer';

describe('FormatertkontonummerString', () => {
    it('Gir riktig formattert kontonummer', () => {
        const input = '12345678900';
        const korrekt = '1234.56.78900';

        const output = formatertKontonummerString(input);

        expect(output).toBe(korrekt);
    });

    it('Setter ingen punktum om færre enn 11 tegn', () => {
        expect(formatertKontonummerString('123456')).toBe('123456');
    });

    it('Setter ingen punktum om flere enn 11', () => {
        expect(formatertKontonummerString('123456789000')).toBe('123456789000');
    });

});