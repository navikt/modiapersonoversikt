import { PersonsokRequestV3 } from '../../models/person/personsok';
import { erTall } from '../../utils/string-utils';
import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import { buildFieldError } from '../../components/form/formUtils';
import { FieldError } from 'react-hook-form';

export type PersonSokFormStateV3 = {
    navn: string;
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

    if (!values.utenlandskID && !values.adresse && !values.navn) {
        errors._minimumskrav = buildFieldError(
            'Du må minimum fylle inn navn, adresse eller utenlandsk ID for å gjøre søk'
        );
    }

    return { values, errors };
}

function stringToNumber(input?: string): number | undefined {
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
        utenlandskID: emptyString(form.utenlandskID),
        fodselsdatoFra: emptyString(form.fodselsdatoFra),
        fodselsdatoTil: emptyString(form.fodselsdatoTil),
        alderFra: stringToNumber(form.alderFra),
        alderTil: stringToNumber(form.alderTil),
        kjonn: emptyString(form.kjonn),
        adresse: emptyString(form.adresse)
    };
}
