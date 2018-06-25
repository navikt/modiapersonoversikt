import { EndreBankkontoState, removeWhitespaceAndDot, validerKontonummer } from './kontonummerUtils';
import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';

const regler: Valideringsregel<EndreBankkontoState>[] = [{
    felt: 'kontonummer',
    feilmelding: 'Kontonummer må være eleve tall',
    validator: (konto: EndreBankkontoState) => removeWhitespaceAndDot(konto.kontonummer).length === 11
}, {
    felt: 'kontonummer',
    feilmelding: 'Kontonummer er ikke gyldig',
    validator: (konto: EndreBankkontoState) => validerKontonummer(removeWhitespaceAndDot(konto.kontonummer))
}];

export function validerNorskBankKonto(gateadresse: EndreBankkontoState) {
    return new FormValidator<EndreBankkontoState>(regler).valider(gateadresse);
}
