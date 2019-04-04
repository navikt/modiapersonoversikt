import { getVeileder } from './OppfolgingDetaljerKomponent';

test('Viser informasjon om veileder dersom veileder finnes med navn og ident', () => {
    const veilederMedTommeFelter = {
        navn: 'Ident Identesen',
        ident: 'Z999999'
    };
    expect(getVeileder(veilederMedTommeFelter)).toBe('Ident Identesen (Z999999)');
});

test('Viser informasjon om veileder dersom veileder finnes med bare ident', () => {
    const veilederMedTommeFelter = {
        navn: '',
        ident: 'Z999999'
    };
    expect(getVeileder(veilederMedTommeFelter)).toBe(' (Z999999)');
});

test('Viser ikke informasjon om veileder med et veilederobjekt med tomme feilter', () => {
    const veilederMedTommeFelter = {
        navn: '',
        ident: ''
    };
    expect(getVeileder(veilederMedTommeFelter)).toBeNull();
});

test('Viser ikke informasjon om veileder med null-veilederobjekt', () => {
    const nullVeileder = null;
    expect(getVeileder(nullVeileder)).toBeNull();
});
