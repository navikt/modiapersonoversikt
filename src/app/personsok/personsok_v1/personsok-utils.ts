import { PersonsokRequest } from '../../../models/person/personsok';
import { Mapped, Values } from '@nutgaard/use-formstate';
import {
    erGyldigNorskKontonummer,
    removeWhitespaceAndDot,
    validerLengdeOgTallPaKontonummer
} from '../kontonummer/kontonummerUtils';
import { erTall } from '../../../utils/string-utils';
import dayjs from 'dayjs';

export type PersonSokFormState = {
    fornavn: string;
    etternavn: string;
    gatenavn: string;
    husnummer: string;
    husbokstav: string;
    postnummer: string;
    kontonummer: string;
    utenlandskID: string;
    kommunenummer: string;
    fodselsdatoFra: string;
    fodselsdatoTil: string;
    alderFra: string;
    alderTil: string;
    kjonn: string;
    _minimumskrav: string;
};

export function validatorPersonsok(values: PersonSokFormState) {
    let fornavn = undefined;
    if (!values.fornavn && values.etternavn) {
        fornavn = 'Fornavn må være utfylt hvis etternavn er satt';
    }

    const etternavn = undefined;

    let gatenavn = undefined;
    if (!values.gatenavn && values.husnummer) {
        gatenavn = 'Gatenavn må være satt hvis husnummer er satt';
    }
    if (!values.gatenavn && values.husbokstav) {
        gatenavn = 'Gatenavn må være satt hvis husbokstav er satt';
    }
    if (!values.gatenavn && values.postnummer) {
        gatenavn = 'Gatenavn må være satt hvis postnummer er satt';
    }

    const husnummer = !erTall(values.husnummer) ? 'Husnummer må være tall' : undefined;

    const husbokstav = undefined;

    const postnummer = !erTall(values.postnummer) ? 'Postnummer må være tall' : undefined;

    let kontonummer = undefined;
    let utenlandskID = undefined;
    const navnFelter = [values.fornavn, values.etternavn];
    const adresseFelter = [values.gatenavn, values.husnummer, values.husbokstav, values.postnummer];

    const andreFelter = navnFelter.concat(adresseFelter).concat([values.utenlandskID]);
    const andreFelterErSatt = andreFelter.some((it) => it.length > 0);
    if (values.kontonummer && !validerLengdeOgTallPaKontonummer(values.kontonummer)) {
        kontonummer = 'Kontonummer må kun bestå av tall og være 11 siffer';
    } else if (values.kontonummer && !erGyldigNorskKontonummer(values.kontonummer)) {
        kontonummer = 'Kontonummer må være et gyldig norsk kontonummer';
    } else if (values.kontonummer && andreFelterErSatt) {
        kontonummer = 'Kan ikke kombinere søk på kontonummer med andre felt';
    }

    const kommunenummer =
        !erTall(values.kommunenummer) && values.kommunenummer.length !== 4
            ? 'Bosted må være tall med 4 siffer'
            : undefined;

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
        if (!values.gatenavn && !values.kontonummer && !values.fornavn) {
            _minimumskrav = 'Du må minimum fylle inn navn, adresse, kontonummer eller utenlandsk ID for å gjøre søk';
            fornavn = '';
            gatenavn = '';
            kontonummer = '';
            utenlandskID = '';
        }
    }

    return {
        fornavn,
        etternavn,
        gatenavn,
        husnummer,
        husbokstav,
        postnummer,
        kontonummer,
        utenlandskID,
        kommunenummer,
        fodselsdatoFra,
        fodselsdatoTil,
        alderFra,
        alderTil,
        kjonn,
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

export function lagRequest(form: Mapped<Values<PersonSokFormState>, string>): PersonsokRequest {
    return {
        fornavn: emptyString(form.fornavn),
        etternavn: emptyString(form.etternavn),
        gatenavn: emptyString(form.gatenavn),
        husnummer: stringToNumber(form.husnummer),
        husbokstav: emptyString(form.husbokstav),
        postnummer: emptyString(form.postnummer),
        kontonummer: emptyString(removeWhitespaceAndDot(form.kontonummer)),
        utenlandskID: emptyString(form.utenlandskID),
        kommunenummer: emptyString(form.kommunenummer),
        fodselsdatoFra: emptyString(form.fodselsdatoFra),
        fodselsdatoTil: emptyString(form.fodselsdatoTil),
        alderFra: stringToNumber(form.alderFra),
        alderTil: stringToNumber(form.alderTil),
        kjonn: emptyString(form.kjonn)
    };
}
