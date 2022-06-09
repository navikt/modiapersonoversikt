import { beholdKunBokstaverOgMellomrom, splitNavn } from './navnUtils';

it('Validerer splitting av navn til fornavn og etternavn', () => {
    const navn = 'Aremark Tester Testfamilien';

    expect(splitNavn(navn)).toEqual({ fornavn: 'Aremark Tester', etternavn: 'Testfamilien' });
});

it('Validerer splitting av navn til fornavn og etternavn med anforselstegn rundt en del av navn ', () => {
    const navn = '"Aremark" Tester Testfamilien';

    expect(splitNavn(beholdKunBokstaverOgMellomrom(navn))).toEqual({
        fornavn: 'Aremark Tester',
        etternavn: 'Testfamilien'
    });
});

it('Validerer splitting av navn til fornavn og etternavn med anforselstegn rundt alle deler av navn ', () => {
    const navn = '"Aremark" "Tester" "Testfamilien"';

    expect(splitNavn(beholdKunBokstaverOgMellomrom(navn))).toEqual({
        fornavn: 'Aremark Tester',
        etternavn: 'Testfamilien'
    });
});

it('Validerer splitting av navn til fornavn hvor et navn har bindestrek ', () => {
    const navn = 'Aremark-Tester Testfamilien';

    expect(splitNavn(beholdKunBokstaverOgMellomrom(navn))).toEqual({
        fornavn: 'Aremark-Tester',
        etternavn: 'Testfamilien'
    });
});

it('Validerer splitting av navn til fornavn hvor et navn har bindestrek med anforselstegn rundt', () => {
    const navn = '"Aremark-Tester" Testfamilien';

    expect(splitNavn(beholdKunBokstaverOgMellomrom(navn))).toEqual({
        fornavn: 'Aremark-Tester',
        etternavn: 'Testfamilien'
    });
});
