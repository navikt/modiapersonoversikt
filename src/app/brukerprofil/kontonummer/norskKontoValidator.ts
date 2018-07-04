import { EndreBankkontoState, removeWhitespaceAndDot, validerKontonummer } from './kontonummerUtils';
import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';

function erTomStreng(streng: string): boolean {
    return streng.length === 0;
}

const regler: Valideringsregel<EndreBankkontoState>[] = [{
    felt: 'kontonummer',
    feilmelding: 'Kontonummer må være elleve tall',
    validator: (konto: EndreBankkontoState) => erTomStreng(konto.kontonummer)
        || removeWhitespaceAndDot(konto.kontonummer).length === 11
}, {
    felt: 'kontonummer',
    feilmelding: 'Kontonummer er ikke gyldig',
    validator: (konto: EndreBankkontoState) => erTomStreng(konto.kontonummer)
        || validerKontonummer(removeWhitespaceAndDot(konto.kontonummer))
}];

export function validerNorskBankKonto(bankkonto: EndreBankkontoState) {
    return new FormValidator<EndreBankkontoState>(regler).valider(bankkonto);
}
