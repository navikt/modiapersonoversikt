import { PersonsokRequestV3 } from '../../models/person/personsok';
import { Mapped, Values } from '@nutgaard/use-formstate';
import {
    erGyldigNorskKontonummer,
    removeWhitespaceAndDot,
    validerLengdeOgTallPaKontonummer
} from './kontonummer/kontonummerUtils';
import { erTall } from '../../utils/string-utils';
import dayjs from 'dayjs';

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

export function validatorPersonsokV3(values: PersonSokFormStateV3) {
    let navn = undefined;
    let adresse = undefined;
    let kontonummer = undefined;
    let utenlandskID = undefined;

    const andreFelter = [values.navn].concat([values.adresse]).concat([values.utenlandskID]);
    const andreFelterErSatt = andreFelter.some((it) => it.length > 0);
    if (values.kontonummer && !validerLengdeOgTallPaKontonummer(values.kontonummer)) {
        kontonummer = 'Kontonummer må kun bestå av tall og være 11 siffer';
    } else if (values.kontonummer && !erGyldigNorskKontonummer(values.kontonummer)) {
        kontonummer = 'Kontonummer må være et gyldig norsk kontonummer';
    } else if (values.kontonummer && andreFelterErSatt) {
        kontonummer = 'Kan ikke kombinere søk på kontonummer med andre felt';
    }

    let fodselsdatoFra = undefined;
    let fodselsdatoTil = undefined;
    const fra = dayjs(values.fodselsdatoFra).toDate();
    const til = dayjs(values.fodselsdatoTil).toDate();
    if (fra > til) {
        fodselsdatoFra = 'Fra-dato kan ikke være senere enn til-dato';
    }
    if (til > new Date()) {
        fodselsdatoTil = 'Du kan ikke velge til-dato frem i tid';
    }
    const alderFra = !erTall(values.alderFra) ? 'Alder må være tall' : undefined;
    const alderTil = !erTall(values.alderTil) ? 'Alder må være tall' : undefined;
    const kjonn = undefined;

    let _minimumskrav = undefined;
    if (!values.utenlandskID) {
        if (!values.adresse && !values.kontonummer && !values.navn) {
            _minimumskrav = 'Du må minimum fylle inn navn, adresse, kontonummer eller utenlandsk ID for å gjøre søk';
            navn = '';
            adresse = '';
            kontonummer = '';
            utenlandskID = '';
        }
    }

    return {
        navn,
        kontonummer,
        utenlandskID,
        fodselsdatoFra,
        fodselsdatoTil,
        alderFra,
        alderTil,
        kjonn,
        adresse,
        _minimumskrav
    };
}

export function stringToNumber(input: string): number | undefined {
    if (input.length === 0) {
        return undefined;
    }
    return parseInt(input);
}

function emptyString(input: string): string | undefined {
    if (input.length === 0) {
        return undefined;
    }
    return input;
}

export function lagRequestV3(form: Mapped<Values<PersonSokFormStateV3>, string>): PersonsokRequestV3 {
    return {
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
