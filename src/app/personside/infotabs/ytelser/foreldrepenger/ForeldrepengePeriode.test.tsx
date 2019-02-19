import { convertBoolTilJaNei } from './ForeldrepengePeriode';

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
