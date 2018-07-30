import { default as FormValidator, Valideringsregel } from '../../../utils/forms/FormValidator';
import { EndreKontaktinformasjonInputs } from './KontaktinformasjonForm';
import { erIkkeTomStreng, erTomStreng } from '../../../utils/string-utils';
import { gyldigTelefonnummer } from '../../../utils/telefon-utils';

function lagRetningsnummerRegelFor(felt: keyof EndreKontaktinformasjonInputs) {
    return {
        felt: felt,
        feilmelding: 'Mangler retningsnummer',
        validator: (kontaktinfo: EndreKontaktinformasjonInputs) =>
            erTomStreng(kontaktinfo[felt].identifikator) ||
            erIkkeTomStreng(kontaktinfo[felt].identifikator) && erIkkeTomStreng(kontaktinfo[felt].retningsnummer)
    };
}

function lagGyldigTelefonnummerRegelFor(felt: keyof EndreKontaktinformasjonInputs) {
    return {
        felt: felt,
        feilmelding: 'Ugyldig telefonnummer',
        validator: (kontaktinfo: EndreKontaktinformasjonInputs) =>
            kontaktinfo[felt].identifikator.length === 0 || gyldigTelefonnummer(kontaktinfo[felt].identifikator)
    };
}

const regler: Valideringsregel<EndreKontaktinformasjonInputs>[] = [
    lagRetningsnummerRegelFor('mobil'),
    lagGyldigTelefonnummerRegelFor('mobil'),
    lagRetningsnummerRegelFor( 'hjem'),
    lagGyldigTelefonnummerRegelFor('hjem'),
    lagRetningsnummerRegelFor('jobb'),
    lagGyldigTelefonnummerRegelFor('jobb')
];

export function validerTelefonInput(kontaktInfo: EndreKontaktinformasjonInputs) {
    return new FormValidator<EndreKontaktinformasjonInputs>(regler).valider(kontaktInfo);
}

export function getValidTelefonInputForm(kontaktInfo: EndreKontaktinformasjonInputs) {
    return new FormValidator<EndreKontaktinformasjonInputs>([]).valider(kontaktInfo);
}
