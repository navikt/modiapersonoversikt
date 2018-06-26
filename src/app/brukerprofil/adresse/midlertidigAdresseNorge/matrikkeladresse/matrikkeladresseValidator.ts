import { Matrikkeladresse } from '../../../../../models/personadresse';
import FormValidator, { Valideringsregel } from '../../../../../utils/forms/FormValidator';
import { erIkkeTomStreng, erTall } from '../../../../../utils/string-utils';

const eiendomsnavnRegel: Valideringsregel<Matrikkeladresse> = {
    felt: 'eiendomsnavn',
    feilmelding: 'Områdeadresse kan ikke være tom',
    validator: (matrikkeladresse: Matrikkeladresse) =>
        matrikkeladresse.eiendomsnavn ? erIkkeTomStreng(matrikkeladresse.eiendomsnavn) : false
};

const postnummerRegel: Valideringsregel<Matrikkeladresse> = {
    felt: 'postnummer',
    feilmelding: 'Postnummer må ha fire tall',
    validator: (matrikkeladresse: Matrikkeladresse) =>
        erTall(matrikkeladresse.postnummer) && matrikkeladresse.postnummer.length === 4
};

export function validerMatrikkeladresse(gateadresse: Matrikkeladresse) {
    return new FormValidator<Matrikkeladresse>([eiendomsnavnRegel, postnummerRegel]).valider(gateadresse);
}