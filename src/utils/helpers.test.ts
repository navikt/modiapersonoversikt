import { formatNumber } from './helpers';

it('Formaterer telefonnummer', () => {
    const format  = '### ## ###';
    const rawTelefonnummer = '94224466';

    const result = formatNumber(format, rawTelefonnummer);

    expect(result).toEqual('942 24 466');
});