import {
    capitalizeAfterPunctuation,
    capitalizeName,
    convertBoolTilJaNei,
    datoEllerNull,
    erTall,
    formaterDato,
    formatNumber,
    NOKellerNull,
    prosentEllerNull
} from './string-utils';

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
        expect(result).toEqual('150,00 NOK');
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

it('capitalizeName gir store bokstaver der det skal være', () => {
    expect(capitalizeName('DANIEL WINSVOLD DEN STORE')).toEqual('Daniel Winsvold Den Store');
    expect(capitalizeName('jøRund aMsen')).toEqual('Jørund Amsen');
    expect(capitalizeName('jørund amsen')).toEqual('Jørund Amsen');
    expect(capitalizeName("o'helga natt")).toEqual("O'Helga Natt");
    expect(capitalizeName("TEST-TEST O'TESTESEN")).toEqual("Test-Test O'Testesen");
    expect(capitalizeName("test-test o'testesen")).toEqual("Test-Test O'Testesen");
});

it('capitalizeAfterPunctuation gir store bokstaver der det skal være', () => {
    expect(capitalizeAfterPunctuation('test')).toEqual('Test');
    expect(capitalizeAfterPunctuation('test nummer. to')).toEqual('Test nummer. To');
    expect(capitalizeAfterPunctuation('test? test! test.')).toEqual('Test? Test! Test.');
    expect(capitalizeAfterPunctuation('øvrig. åssen kan. ærlig')).toEqual('Øvrig. Åssen kan. Ærlig');
    expect(capitalizeAfterPunctuation('se www.nav.no')).toEqual('Se www.nav.no');
});
