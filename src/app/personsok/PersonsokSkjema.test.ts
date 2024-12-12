import { buildFieldError } from '../../components/form/formUtils';
import { type PersonSokFormStateV3, resolver } from './personsokUtils';

const initialValues: PersonSokFormStateV3 = {
    navn: '',
    utenlandskID: '',
    fodselsdatoFra: '',
    fodselsdatoTil: '',
    alderFra: '',
    alderTil: '',
    kjonn: '',
    adresse: '',
    telefonnummer: '',
    _minimumskrav: ''
};

const ingenFeil = {
    navn: undefined,
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
            'Du må minimum fylle inn navn, adresse, telefonnummer eller utenlandsk ID for å gjøre søk'
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
