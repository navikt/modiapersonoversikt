import { Utlandsadresse } from '../../../../models/personadresse';
import FormValidator, { Valideringsregel } from '../../../../utils/forms/FormValidator';
import {
    lagDatoErInnenEtÅrRegel
} from '../../../../utils/forms/commonValidatorRegler';
import { erTomStreng } from '../../../../utils/string-utils';

const gyldigTilRegel = lagDatoErInnenEtÅrRegel<Utlandsadresse>('periode', utenlandsAdresse =>
    utenlandsAdresse.periode ? utenlandsAdresse.periode.til : '');

const regler: Valideringsregel<Utlandsadresse>[] = [
    gyldigTilRegel,
    {
        felt: 'adresselinjer',
        feilmelding: 'Du må skrive en adresse',
        validator: (utenlandsadresse: Utlandsadresse) =>
            !erTomStreng(utenlandsadresse.adresselinjer.join(''))
    }, {
        felt: 'landkode',
        feilmelding: 'Du må velge et land',
        validator: (utenlandsadresse: Utlandsadresse) =>
            utenlandsadresse.landkode ? !erTomStreng(utenlandsadresse.landkode.kodeRef) : false
    }

];

export function validerUtenlandsAdresse(utlandsadresse: Utlandsadresse) {
    return new FormValidator<Utlandsadresse>(regler).valider(utlandsadresse);
}

export function getValidUtlandsadresseForm(utenlandsAdresse: Utlandsadresse) {
    return new FormValidator<Utlandsadresse>([]).valider(utenlandsAdresse);
}
