import { convertBoolTilJaNei, datoEllerNull, formaterDato, NOKellerNull, prosentEllerNull } from './stringFormatting';

describe('convertBoolTilJaNei', () => {
    it('Returnerer Ja ved true', () => {
        const result = convertBoolTilJaNei(true);
        expect(result).toEqual('Ja');
    });

    it('Returnerer Nei ved false', () => {
        const result = convertBoolTilJaNei(false);
        expect(result).toEqual('Nei');
    });

    it('Returnerer null ved null', () => {
        const result = convertBoolTilJaNei(null);
        expect(result).toEqual(null);
    });
});

describe('prosentEllerNull', () => {
    it('Returnerer Ja ved true', () => {
        const result = prosentEllerNull(10);
        expect(result).toEqual('10%');
    });

    it('Returnerer null ved null', () => {
        const result = prosentEllerNull(null);
        expect(result).toEqual(null);
    });
});

describe('datoEllerNull', () => {
    it('Returnerer Ja ved true', () => {
        const result = datoEllerNull('2018-01-01');
        expect(result).toEqual('01.01.2018');
    });

    it('Returnerer null ved null', () => {
        const result = datoEllerNull(null);
        expect(result).toEqual(null);
    });
});

describe('NOKellerNull', () => {
    it('Returnerer Ja ved true', () => {
        const result = NOKellerNull(150);
        expect(result).toEqual('150.00 NOK');
    });

    it('Returnerer null ved null', () => {
        const result = NOKellerNull(null);
        expect(result).toEqual(null);
    });
});

it('Formaterer dato på backend-format til ønsket visningsformat', () => {
    const rawDate = '2014-02-10T08:09:36.000+0000';
    const formatertDato = formaterDato(rawDate);

    expect(formatertDato).toEqual('10.02.2014');
});
