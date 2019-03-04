import { convertBoolTilJaNei, datoEllerNull, NOKellerNull, prosentEllerNull } from './descriptionListHelpers';

test('convertBoolTilJaNei returnerer Ja ved true', () => {
    const result = convertBoolTilJaNei(true);
    expect(result).toEqual('Ja');
});

test('convertBoolTilJaNei returnerer Nei ved false', () => {
    const result = convertBoolTilJaNei(false);
    expect(result).toEqual('Nei');
});

test('convertBoolTilJaNei returnerer null ved null', () => {
    const result = convertBoolTilJaNei(null);
    expect(result).toEqual(null);
});

test('prosentEllerNull returnerer Ja ved true', () => {
    const result = prosentEllerNull(10);
    expect(result).toEqual('10%');
});

test('prosentEllerNull returnerer null ved null', () => {
    const result = prosentEllerNull(null);
    expect(result).toEqual(null);
});

test('datoEllerNull returnerer Ja ved true', () => {
    const result = datoEllerNull('2018-01-01');
    expect(result).toEqual('01.01.2018');
});

test('datoEllerNull returnerer null ved null', () => {
    const result = datoEllerNull(null);
    expect(result).toEqual(null);
});

test('NOKellerNull returnerer Ja ved true', () => {
    const result = NOKellerNull(150);
    expect(result).toEqual('150.00 NOK');
});

test('NOKellerNull returnerer null ved null', () => {
    const result = NOKellerNull(null);
    expect(result).toEqual(null);
});
