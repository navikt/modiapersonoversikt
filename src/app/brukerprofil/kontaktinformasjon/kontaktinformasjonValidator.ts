import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';
import { EndreKontaktinformasjonInputs, TelefonInput } from './KontaktinformasjonForm';
import { erIkkeTomStreng, erTomStreng } from '../../../utils/string-utils';
import { gyldigTelefonnummer } from '../../../utils/telefon-utils';

const regler: Valideringsregel<TelefonInput>[] = [
    {
        felt: 'retningsnummer',
        feilmelding: 'Mangler retningsnummer',
        validator: (input: TelefonInput) =>
            erTomStreng(input.identifikator) ||
            (erIkkeTomStreng(input.identifikator) && erIkkeTomStreng(input.retningsnummer))
    },
    {
        felt: 'identifikator',
        feilmelding: 'Ugyldig telefonnummer',
        validator: (input: TelefonInput) => input.identifikator.length === 0 || gyldigTelefonnummer(input.identifikator)
    }
];

export function validerTelefonInput(input: TelefonInput, felt: keyof EndreKontaktinformasjonInputs) {
    return new FormValidator<TelefonInput>(regler).valider(input);
}

const dummyInput: TelefonInput = {
    identifikator: '',
    retningsnummer: ''
};

export function getValidTelefonInput() {
    return new FormValidator<TelefonInput>([]).valider(dummyInput);
}
