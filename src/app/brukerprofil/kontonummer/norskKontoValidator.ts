import { EndreBankkontoState, removeWhitespaceAndDot, tomBankkonto, validerKontonummer } from './kontonummerUtils';
import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';

function erTomStreng(streng: string): boolean {
    return streng.length === 0;
}

const regler: Valideringsregel<EndreBankkontoState>[] = [
    {
        felt: 'norskKontonummer',
        feilmelding: 'Kontonummer må være elleve tall',
        validator: (konto: EndreBankkontoState) =>
            erTomStreng(konto.norskKontonummer) || removeWhitespaceAndDot(konto.norskKontonummer).length === 11
    },
    {
        felt: 'norskKontonummer',
        feilmelding: 'Kontonummer er ikke gyldig',
        validator: (konto: EndreBankkontoState) =>
            erTomStreng(konto.norskKontonummer) || validerKontonummer(removeWhitespaceAndDot(konto.norskKontonummer))
    }
];

export function validerNorskBankKonto(bankkonto: EndreBankkontoState) {
    return new FormValidator<EndreBankkontoState>(regler).valider(bankkonto);
}

export function getValidNorskBankKontoForm() {
    return new FormValidator<EndreBankkontoState>([]).valider(tomBankkonto);
}
