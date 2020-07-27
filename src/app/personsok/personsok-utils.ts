import { PersonsokRequest } from '../../models/person/personsok';
import { Mapped, Values } from '@nutgaard/use-formstate';

export type PersonSokFormState = {
    fornavn: string;
    etternavn: string;
    gatenavn: string;
    husnummer: string;
    husbokstav: string;
    postnummer: string;
    kontonummer: string;
    kommunenummer: string;
    fodselsdatoFra: string;
    fodselsdatoTil: string;
    alderFra: string;
    alderTil: string;
    kjonn: string;
    _minimumskrav: string;
};

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
        kontonummer: emptyString(form.kontonummer),
        kommunenummer: emptyString(form.kommunenummer),
        fodselsdatoFra: emptyString(form.fodselsdatoFra),
        fodselsdatoTil: emptyString(form.fodselsdatoTil),
        alderFra: stringToNumber(form.alderFra),
        alderTil: stringToNumber(form.alderTil),
        kjonn: emptyString(form.kjonn)
    };
}
