import { getVeileder } from './oppfolging-utils';

test('Viser informasjon om veileder dersom veileder finnes med navn og ident', () => {
    const veilederMedTommeFelter = {
        fornavn: 'Ident',
        etternavn: 'Identesen',
        navn: 'Ident Identesen',
        ident: 'Z999999'
    };
    expect(getVeileder(veilederMedTommeFelter)).toBe('Ident Identesen (Z999999)');
});

test('Viser informasjon om veileder dersom veileder finnes med bare ident', () => {
    const veilederMedTommeFelter = {
        fornavn: '',
        etternavn: '',
        navn: '',
        ident: 'Z999999'
    };
    expect(getVeileder(veilederMedTommeFelter)).toBe(' (Z999999)');
});

test('Viser ikke informasjon om veileder med et veilederobjekt med tomme feilter', () => {
    const veilederMedTommeFelter = {
        fornavn: '',
        etternavn: '',
        navn: '',
        ident: ''
    };
    expect(getVeileder(veilederMedTommeFelter)).toBe('\u2014');
});

test('Viser ikke informasjon om veileder med null-veilederobjekt', () => {
    const nullVeileder = null;
    expect(getVeileder(nullVeileder)).toBe('\u2014');
});
