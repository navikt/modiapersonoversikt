import { PersonsokRequestV3 } from '../../models/person/personsok';
import {
    erGyldigNorskKontonummer,
    removeWhitespaceAndDot,
    validerLengdeOgTallPaKontonummer
} from './kontonummer/kontonummerUtils';
import { erTall } from '../../utils/string-utils';
import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import { buildFieldError } from '../../components/form/formUtils';
import { FieldError } from 'react-hook-form';

export type PersonSokFormStateV3 = {
    navn: string;
    kontonummer: string;
    utenlandskID: string;
    fodselsdatoFra: string;
    fodselsdatoTil: string;
    alderFra: string;
    alderTil: string;
    kjonn: string;
    adresse: string;
    _minimumskrav: string;
};

export function resolver(values: PersonSokFormStateV3) {
    const errors: Record<string, FieldError | undefined> = {};

    const andreFelter = [
        values.navn,
        values.adresse,
        values.utenlandskID,
        values.alderFra,
        values.alderTil,
        values.fodselsdatoFra,
        values.fodselsdatoTil,
        values.kjonn
    ];

    const andreFelterErSatt = andreFelter.some((it) => it?.length);

    if (values.kontonummer && !validerLengdeOgTallPaKontonummer(values.kontonummer)) {
        errors.kontonummer = buildFieldError('Kontonummer må kun bestå av tall og være 11 siffer');
    } else if (values.kontonummer && !erGyldigNorskKontonummer(values.kontonummer)) {
        errors.kontonummer = buildFieldError('Kontonummer må være et gyldig norsk kontonummer');
    } else if (values.kontonummer && andreFelterErSatt) {
        errors.kontonummer = buildFieldError('Kan ikke kombinere søk på kontonummer med andre felt');
    }

    const fra = dayjs(values.fodselsdatoFra).toDate();
    const til = dayjs(values.fodselsdatoTil).toDate();

    if (values.fodselsdatoFra && !isISODateString(values.fodselsdatoFra)) {
        errors.fodselsdatoFra = buildFieldError('Fra-dato må være en gyldig dato');
    } else if (fra > til) {
        errors.fodselsdatoFra = buildFieldError('Fra-dato kan ikke være senere enn til-dato');
    }
    if (values.fodselsdatoTil && !isISODateString(values.fodselsdatoTil)) {
        errors.fodselsdatoTil = buildFieldError('Til-dato må være en gyldig dato');
    } else if (til > new Date()) {
        errors.fodselsdatoTil = buildFieldError('Du kan ikke velge til-dato frem i tid');
    }

    if (values.alderFra && !erTall(values.alderFra)) {
        errors.alderFra = buildFieldError('Alder må være tall');
    }

    if (values.alderTil && !erTall(values.alderTil)) {
        errors.alderTil = buildFieldError('Alder må være tall');
    }

    if (!values.utenlandskID && !values.adresse && !values.kontonummer && !values.navn) {
        errors._minimumskrav = buildFieldError(
            'Du må minimum fylle inn navn, adresse, kontonummer eller utenlandsk ID for å gjøre søk'
        );
    }

    return { values, errors };
}

export function stringToNumber(input?: string): number | undefined {
    if (!input || input.length === 0) {
        return undefined;
    }
    return parseInt(input);
}

function emptyString(input?: string): string | undefined {
    if (!input || input.length === 0) {
        return undefined;
    }
    return input;
}

export function lagRequestV3(enhet: string, form: PersonSokFormStateV3): PersonsokRequestV3 {
    return {
        enhet,
        navn: emptyString(form.navn),
        kontonummer: emptyString(removeWhitespaceAndDot(form.kontonummer)),
        utenlandskID: emptyString(form.utenlandskID),
        fodselsdatoFra: emptyString(form.fodselsdatoFra),
        fodselsdatoTil: emptyString(form.fodselsdatoTil),
        alderFra: stringToNumber(form.alderFra),
        alderTil: stringToNumber(form.alderTil),
        kjonn: emptyString(form.kjonn),
        adresse: emptyString(form.adresse)
    };
}
