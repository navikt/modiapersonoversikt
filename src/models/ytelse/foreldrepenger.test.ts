import { statiskForeldrepengeMock } from 'src/mock/ytelse/statiskForeldrepengeMock';
import { type Adopsjon, type Fodsel, type Foreldrepengerettighet, isAdopsjon, isFodsel } from './foreldrepenger';

test('typeguard isFodsel funker', () => {
    const foreldrepengeRettighet: Fodsel = {
        ...statiskForeldrepengeMock,
        termin: '2018-01-01'
    };

    expect(isFodsel(foreldrepengeRettighet)).toBe(true);
    expect(isAdopsjon(foreldrepengeRettighet)).toBe(false);
});

test('typeguard isAdopsjon funker', () => {
    // biome-ignore lint/correctness/noUnusedVariables: Biome migration
    const { termin, ...resten } = statiskForeldrepengeMock;
    const foreldrepengeRettighet: Adopsjon = {
        ...resten,
        omsorgsovertakelse: '2018-01-01'
    };

    expect(isAdopsjon(foreldrepengeRettighet)).toBe(true);
    expect(isFodsel(foreldrepengeRettighet)).toBe(false);
});

test('Hvis omsorgsovertakelse og termin er satt til null blir det ikke gjennkjent som adopsjon eller fødsel', () => {
    // biome-ignore lint/correctness/noUnusedVariables: Biome migration
    const { termin, ...resten } = statiskForeldrepengeMock;
    const foreldrepengeRettighet: Foreldrepengerettighet = {
        ...resten,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        omsorgsovertakelse: null,
        termin: null
    };

    expect(isAdopsjon(foreldrepengeRettighet)).toBe(false);
    expect(isFodsel(foreldrepengeRettighet)).toBe(false);
});
