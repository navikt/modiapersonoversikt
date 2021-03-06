import { PersonSokFormState, validatorPersonsok } from './personsok-utils';

const initialValues: PersonSokFormState = {
    fornavn: '',
    etternavn: '',
    gatenavn: '',
    husnummer: '',
    husbokstav: '',
    postnummer: '',
    kontonummer: '',
    utenlandskID: '',
    kommunenummer: '',
    fodselsdatoFra: '',
    fodselsdatoTil: '',
    alderFra: '',
    alderTil: '',
    kjonn: '',
    _minimumskrav: ''
};

const ingenFeil = {
    fornavn: undefined,
    etternavn: undefined,
    gatenavn: undefined,
    husnummer: undefined,
    husbokstav: undefined,
    postnummer: undefined,
    kontonummer: undefined,
    utenlandskID: undefined,
    kommunenummer: undefined,
    fodselsdatoFra: undefined,
    fodselsdatoTil: undefined,
    alderFra: undefined,
    alderTil: undefined,
    kjonn: undefined,
    _minimumskrav: undefined
};

test('Valider alle felter som må være tall', () => {
    const validator = validatorPersonsok({
        ...initialValues,
        alderFra: 'a',
        alderTil: 'b',
        gatenavn: 'Karl Johans Gate',
        husnummer: 'a',
        kommunenummer: 'aaa',
        postnummer: 'abcd'
    });

    expect(validator).toEqual({
        ...ingenFeil,
        husnummer: 'Husnummer må være tall',
        postnummer: 'Postnummer må være tall',
        kommunenummer: 'Bosted må være tall med 4 siffer',
        alderFra: 'Alder må være tall',
        alderTil: 'Alder må være tall'
    });
});

test('Validerer minimumskrav for personsøk', () => {
    const validator = validatorPersonsok(initialValues);
    expect(validator).toEqual({
        ...ingenFeil,
        _minimumskrav: 'Du må minimum fylle inn navn, adresse, kontonummer eller utenlandsk ID for å gjøre søk',
        kontonummer: '',
        fornavn: '',
        gatenavn: '',
        utenlandskID: ''
    });
});

test('Valider utenlandskID må være eneste felt', () => {
    const validator = validatorPersonsok({ ...initialValues, utenlandskID: '1231', fornavn: 'Aremark' });
    expect(validator).toEqual({
        ...ingenFeil,
        utenlandskID: 'Kan ikke kombinere søk på utenlandsk ID med andre felt'
    });
});

test('Valider krav om gatenavn ved husnummer', () => {
    const validator = validatorPersonsok({ ...initialValues, husnummer: '10', fornavn: 'Aremark' });
    expect(validator).toEqual({ ...ingenFeil, gatenavn: 'Gatenavn må være satt hvis husnummer er satt' });
});

test('Valider krav om gatenavn ved postnummer', () => {
    const validator = validatorPersonsok({ ...initialValues, postnummer: '0000', fornavn: 'Aremark' });
    expect(validator).toEqual({ ...ingenFeil, gatenavn: 'Gatenavn må være satt hvis postnummer er satt' });
});

test('Valider krav om gatenavn ved husbokstav', () => {
    const validator = validatorPersonsok({ ...initialValues, husbokstav: 'A', fornavn: 'Aremark' });
    expect(validator).toEqual({ ...ingenFeil, gatenavn: 'Gatenavn må være satt hvis husbokstav er satt' });
});

test('Valider krav om korrekt kontonummer', () => {
    const validator = validatorPersonsok({ ...initialValues, kontonummer: '12345678910' });
    expect(validator).toEqual({ ...ingenFeil, kontonummer: 'Kontonummer må kun bestå av tall og være 11 siffer' });
});
