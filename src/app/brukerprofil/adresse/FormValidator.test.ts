import FormValidator, { Valideringsregel } from './FormValidator';
import { removeWhitespace } from '../../../utils/string-utils';
import { Gateadresse } from '../../../models/personadresse';

const rule: Valideringsregel<Gateadresse> = {
    felt: 'gatenavn',
    feilmelding: 'Gatenavn kan ikke være tom',
    validator: (gateadresse: Gateadresse) => erIkkeTomStreng(gateadresse.gatenavn)
};

function erIkkeTomStreng(input: string) {
    return removeWhitespace(input).length !== 0;
}

test('Invaliderer ugyldig gateadresse', () => {
    const testAdresse: Gateadresse = {
        husnummer: 'test',
        gatenavn: '',
        poststed: '',
        postnummer: ''
    };
    const gateadresseValidator = new FormValidator<Gateadresse>([rule]);

    const validering = gateadresseValidator.valider(testAdresse);

    expect(validering.felter.gatenavn.erGyldig).toEqual(false);
    expect(validering.formErGyldig).toEqual(false);
});

test('Validerer gyldig gateadresse', () => {
    const testAdresse: Gateadresse = {
        husnummer: 'test',
        gatenavn: 'Rådhusgata',
        poststed: '',
        postnummer: ''
    };
    const gateadresseValidator = new FormValidator<Gateadresse>([rule]);

    const validering = gateadresseValidator.valider(testAdresse);

    expect(validering.felter.gatenavn.erGyldig).toEqual(true);
    expect(validering.formErGyldig).toEqual(true);
});
