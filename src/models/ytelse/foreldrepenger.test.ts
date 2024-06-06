import { statiskForeldrepengeMock } from '../../mock/ytelse/statiskForeldrepengeMock';
import { Adopsjon, Foreldrepengerettighet, Fødsel, isAdopsjon, isFødsel } from './foreldrepenger';

test('typeguard isFødsel funker', () => {
    const foreldrepengeRettighet: Fødsel = {
        ...statiskForeldrepengeMock,
        termin: '2018-01-01'
    };

    expect(isFødsel(foreldrepengeRettighet)).toBe(true);
    expect(isAdopsjon(foreldrepengeRettighet)).toBe(false);
});

test('typeguard isAdopsjon funker', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termin, ...resten } = statiskForeldrepengeMock;
    const foreldrepengeRettighet: Adopsjon = {
        ...resten,
        omsorgsovertakelse: '2018-01-01'
    };

    expect(isAdopsjon(foreldrepengeRettighet)).toBe(true);
    expect(isFødsel(foreldrepengeRettighet)).toBe(false);
});

test('Hvis omsorgsovertakelse og termin er satt til null blir det ikke gjennkjent som adopsjon eller fødsel', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termin, ...resten } = statiskForeldrepengeMock;
    const foreldrepengeRettighet: Foreldrepengerettighet = {
        ...resten,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        omsorgsovertakelse: null,
        termin: null
    };

    expect(isAdopsjon(foreldrepengeRettighet)).toBe(false);
    expect(isFødsel(foreldrepengeRettighet)).toBe(false);
});
