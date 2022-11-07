import { buildFieldError } from '../../components/form/formUtils';
import { PersonSokFormStateV3, resolver } from './personsokUtils';

const initialValues: PersonSokFormStateV3 = {
    navn: '',
    kontonummer: '',
    utenlandskID: '',
    fodselsdatoFra: '',
    fodselsdatoTil: '',
    alderFra: '',
    alderTil: '',
    kjonn: '',
    adresse: '',
    _minimumskrav: ''
};

const ingenFeil = {
    navn: undefined,
    kontonummer: undefined,
    utenlandskID: undefined,
    fodselsdatoFra: undefined,
    fodselsdatoTil: undefined,
    alderFra: undefined,
    alderTil: undefined,
    kjonn: undefined,
    adresse: undefined,
    _minimumskrav: undefined
};

test('Valider alle felter som må være tall', () => {
    const validator = resolver({
        ...initialValues,
        alderFra: 'a',
        alderTil: 'b',
        adresse: 'Karl Johans gate 1 0100'
    });

    expect(validator.errors).toEqual({
        ...ingenFeil,
        alderFra: buildFieldError('Alder må være tall'),
        alderTil: buildFieldError('Alder må være tall')
    });
});

test('Validerer minimumskrav for personsøk', () => {
    const validator = resolver(initialValues);
    expect(validator.errors).toEqual({
        ...ingenFeil,
        _minimumskrav: buildFieldError(
            'Du må minimum fylle inn navn, adresse, kontonummer eller utenlandsk ID for å gjøre søk'
        )
    });
});

test('Valider utenlandskID kan søkes på sammen med navn om pdl-søk er aktivert', () => {
    const validator = resolver({ ...initialValues, utenlandskID: '1231', navn: 'Aremark' });
    expect(validator.errors).toEqual({
        ...ingenFeil,
        utenlandskID: undefined
    });
});

test('Valider kontonummer må være eneste felt om pdl-søk er aktivert', () => {
    const validator = resolver({ ...initialValues, kontonummer: '12345678911', navn: 'Aremark' });
    expect(validator.errors).toEqual({
        ...ingenFeil,
        kontonummer: buildFieldError('Kan ikke kombinere søk på kontonummer med andre felt')
    });
});

test('Valider søk på kontonummer passerer validering', () => {
    const validator = resolver({ ...initialValues, kontonummer: '12345678911' });
    expect(validator.errors).toEqual({
        ...ingenFeil
    });
});

test('Valider krav om korrekt lengde på kontonummer', () => {
    const validator = resolver({ ...initialValues, kontonummer: '123' });
    expect(validator.errors).toEqual({
        ...ingenFeil,
        kontonummer: buildFieldError('Kontonummer må kun bestå av tall og være 11 siffer')
    });
});

test('Valider krav om korrekt kontonummer', () => {
    const validator = resolver({ ...initialValues, kontonummer: '12345678910' });
    expect(validator.errors).toEqual({
        ...ingenFeil,
        kontonummer: buildFieldError('Kontonummer må være et gyldig norsk kontonummer')
    });
});
