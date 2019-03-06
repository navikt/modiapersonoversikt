import { formatNumber } from './stringFormatting';
import { erTall } from './string-utils';

it('Formaterer telefonnummer', () => {
    const format = '### ## ###';
    const rawTelefonnummer = '94224466';

    const result = formatNumber(format, rawTelefonnummer);

    expect(result).toEqual('942 24 466');
});

describe('Streng er tall', () => {
    it('tall er tall', () => {
        expect(erTall('5')).toBe(true);
    });

    it('bokstav er ikke tall', () => {
        expect(erTall('a')).toBe(false);
    });
});
