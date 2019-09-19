import FormValidator, { Valideringsregel } from '../../utils/forms/FormValidator';
import { removeWhitespaceAndDot, validerKontonummer } from '../brukerprofil/kontonummer/kontonummerUtils';
import { PersonSokFormState } from './PersonsokSkjema';
import { erTall, erTomStreng } from '../../utils/string-utils';

const tomtSkjema: PersonSokFormState = {
    fornavn: '',
    etternavn: '',
    gatenavn: '',
    husnummer: '',
    husbokstav: '',
    postnummer: '',
    kontonummer: '',
    kommunenummer: '',
    fodselsdatoFra: undefined,
    fodselsdatoTil: undefined,
    alderFra: '',
    alderTil: '',
    kjonn: ''
};

const regler: Valideringsregel<PersonSokFormState>[] = [
    {
        felt: 'gatenavn',
        feilmelding: 'Gatenavn må være satt hvis husnummer er satt',
        validator: (form: PersonSokFormState) => {
            if (erTomStreng(form.husnummer)) {
                return true;
            } else {
                return !erTomStreng(form.gatenavn);
            }
        }
    },
    {
        felt: 'gatenavn',
        feilmelding: 'Gatenavn må være satt hvis husbokstav er satt',
        validator: (form: PersonSokFormState) => {
            if (erTomStreng(form.husbokstav)) {
                return true;
            } else {
                return !erTomStreng(form.gatenavn);
            }
        }
    },
    {
        felt: 'gatenavn',
        feilmelding: 'Gatenavn må være satt hvis postnummer er satt',
        validator: (form: PersonSokFormState) => {
            if (erTomStreng(form.postnummer)) {
                return true;
            } else {
                return !erTomStreng(form.gatenavn);
            }
        }
    },
    {
        felt: 'husnummer',
        feilmelding: 'Husnummer må være tall',
        validator: (form: PersonSokFormState) => erTomStreng(form.husnummer) || erTall(form.husnummer)
    },
    {
        felt: 'postnummer',
        feilmelding: 'Postnummer må være tall',
        validator: (form: PersonSokFormState) => erTomStreng(form.postnummer) || erTall(form.postnummer)
    },
    {
        felt: 'kommunenummer',
        feilmelding: 'Bosted må være 4 siffer',
        validator: (form: PersonSokFormState) => erTomStreng(form.kommunenummer) || form.kommunenummer.length === 4
    },
    {
        felt: 'kommunenummer',
        feilmelding: 'Bosted må være tall',
        validator: (form: PersonSokFormState) => erTomStreng(form.kommunenummer) || erTall(form.kommunenummer)
    },
    {
        felt: 'kontonummer',
        feilmelding: 'Kontonummer må være elleve siffer',
        validator: (form: PersonSokFormState) =>
            erTomStreng(form.kontonummer) || removeWhitespaceAndDot(form.kontonummer).length === 11
    },
    {
        felt: 'kontonummer',
        feilmelding: 'Kontonummer må være gyldig',
        validator: (form: PersonSokFormState) =>
            erTomStreng(form.kontonummer) || validerKontonummer(removeWhitespaceAndDot(form.kontonummer))
    },
    {
        felt: 'alderFra',
        feilmelding: 'Alder fra må være tall',
        validator: (form: PersonSokFormState) => erTomStreng(form.alderFra) || erTall(form.alderFra)
    },
    {
        felt: 'alderTil',
        feilmelding: 'Alder til må være tall',
        validator: (form: PersonSokFormState) => erTomStreng(form.alderTil) || erTall(form.alderTil)
    },
    {
        felt: 'alderFra',
        feilmelding: 'Alder fra må være før alder til',
        validator: (form: PersonSokFormState) => {
            if (erTomStreng(form.alderTil)) {
                return true;
            } else {
                return erTomStreng(form.alderFra) || parseInt(form.alderFra) < parseInt(form.alderTil);
            }
        }
    },
    {
        felt: 'alderTil',
        feilmelding: 'Alder til må være før alder fra',
        validator: (form: PersonSokFormState) => {
            if (erTomStreng(form.alderFra)) {
                return true;
            } else {
                return erTomStreng(form.alderTil) || parseInt(form.alderFra) < parseInt(form.alderTil);
            }
        }
    }
];

export function validerPersonsokSkjema(form: PersonSokFormState) {
    return new FormValidator(regler).valider(form);
}

export function getValidPersonSokState() {
    return new FormValidator<PersonSokFormState>([]).valider(tomtSkjema);
}
