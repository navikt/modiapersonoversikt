import FormValidator, { Valideringsregel } from '../../utils/forms/FormValidator';
import { removeWhitespaceAndDot, validerKontonummer } from './kontonummer/kontonummerUtils';
import { erTall, erTomStreng } from '../../utils/string-utils';
import { PersonSokFormState } from './personsokUtils';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import React from 'react';

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
        feilmelding: <SkjemaelementFeilmelding>Gatenavn må være satt hvis husnummer er satt</SkjemaelementFeilmelding>,
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
        feilmelding: <SkjemaelementFeilmelding>Gatenavn må være satt hvis husbokstav er satt</SkjemaelementFeilmelding>,
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
        feilmelding: <SkjemaelementFeilmelding>Gatenavn må være satt hvis postnummer er satt</SkjemaelementFeilmelding>,
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
        feilmelding: <SkjemaelementFeilmelding>Husnummer må være tall</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) => erTomStreng(form.husnummer) || erTall(form.husnummer)
    },
    {
        felt: 'postnummer',
        feilmelding: <SkjemaelementFeilmelding>'Postnummer må være tall</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) => erTomStreng(form.postnummer) || erTall(form.postnummer)
    },
    {
        felt: 'kommunenummer',
        feilmelding: <SkjemaelementFeilmelding>Bosted må være 4 siffer</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) => erTomStreng(form.kommunenummer) || form.kommunenummer.length === 4
    },
    {
        felt: 'kommunenummer',
        feilmelding: <SkjemaelementFeilmelding>Bosted må være tall</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) => erTomStreng(form.kommunenummer) || erTall(form.kommunenummer)
    },
    {
        felt: 'kontonummer',
        feilmelding: <SkjemaelementFeilmelding>Kontonummer må være elleve siffer</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) =>
            erTomStreng(form.kontonummer) || removeWhitespaceAndDot(form.kontonummer).length === 11
    },
    {
        felt: 'kontonummer',
        feilmelding: <SkjemaelementFeilmelding>Kontonummer må være gyldig</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) =>
            erTomStreng(form.kontonummer) || validerKontonummer(removeWhitespaceAndDot(form.kontonummer))
    },
    {
        felt: 'alderFra',
        feilmelding: <SkjemaelementFeilmelding>Alder fra må være tall</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) => erTomStreng(form.alderFra) || erTall(form.alderFra)
    },
    {
        felt: 'alderTil',
        feilmelding: <SkjemaelementFeilmelding>Alder til må være tall</SkjemaelementFeilmelding>,
        validator: (form: PersonSokFormState) => erTomStreng(form.alderTil) || erTall(form.alderTil)
    },
    {
        felt: 'alderFra',
        feilmelding: <SkjemaelementFeilmelding>Alder fra må være før alder til</SkjemaelementFeilmelding>,
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
        feilmelding: <SkjemaelementFeilmelding>Alder til må være før alder fra</SkjemaelementFeilmelding>,
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

export function personsokSkjemaHarNokInformasjonTilÅGjøreSøk(skjema: PersonSokFormState) {
    return !erTomStreng(skjema.fornavn + skjema.etternavn + skjema.gatenavn + skjema.kontonummer);
}
