import { validatorPersonsok } from './PersonsokSkjema';
import { PersonSokFormState } from './personsokUtils';

const initialValues: PersonSokFormState = {
    fornavn: '',
    etternavn: '',
    gatenavn: '',
    husnummer: '',
    husbokstav: '',
    postnummer: '',
    kontonummer: '',
    kommunenummer: '',
    fodselsdatoFra: '',
    fodselsdatoTil: '',
    alderFra: '',
    alderTil: '',
    kjonn: ''
};

const ingenFeil = {
    fornavn: undefined,
    etternavn: undefined,
    gatenavn: undefined,
    husnummer: undefined,
    husbokstav: undefined,
    postnummer: undefined,
    kontonummer: undefined,
    kommunenummer: undefined,
    fodselsdatoFra: undefined,
    fodselsdatoTil: undefined,
    alderFra: undefined,
    alderTil: undefined,
    kjonn: undefined
};

test('Valider alle felter som må være tall', () => {
    const validator = validatorPersonsok(
        {
            ...initialValues,
            alderFra: 'a',
            alderTil: 'b',
            gatenavn: 'Karl Johans Gate',
            husnummer: 'a',
            kommunenummer: 'aaa',
            postnummer: 'abcd'
        },
        {}
    );

    expect(validator).toEqual({
        ...ingenFeil,
        husnummer: 'Husnummer må være tall',
        postnummer: 'Postnummer må være tall',
        kommunenummer: 'Bosted må være tall med 4 siffer',
        alderFra: 'Alder må være tall',
        alderTil: 'Alder må være tall'
    });
});

test('Validerer check om minimumskrav for personsøk', () => {
    const validator = validatorPersonsok(initialValues, {});
    expect(validator).toEqual({ ...ingenFeil, kontonummer: ' ', fornavn: ' ', gatenavn: ' ' });
});

test('Valider krav om gatenavn ved husnummer', () => {
    const validator = validatorPersonsok({ ...initialValues, husnummer: '10', fornavn: 'Aremark' }, {});
    expect(validator).toEqual({ ...ingenFeil, gatenavn: 'Gatenavn må være satt hvis husnummer er satt' });
});

test('Valider krav om gatenavn ved postnummer', () => {
    const validator = validatorPersonsok({ ...initialValues, postnummer: '0000', fornavn: 'Aremark' }, {});
    expect(validator).toEqual({ ...ingenFeil, gatenavn: 'Gatenavn må være satt hvis postnummer er satt' });
});

test('Valider krav om gatenavn ved husbokstav', () => {
    const validator = validatorPersonsok({ ...initialValues, husbokstav: 'A', fornavn: 'Aremark' }, {});
    expect(validator).toEqual({ ...ingenFeil, gatenavn: 'Gatenavn må være satt hvis husbokstav er satt' });
});

test('Valider krav korrekt kontonummer', () => {
    const validator = validatorPersonsok({ ...initialValues, kontonummer: '12345678910' }, {});
    expect(validator).toEqual({ ...ingenFeil, kontonummer: 'Kontonummer må være gyldig' });
});
