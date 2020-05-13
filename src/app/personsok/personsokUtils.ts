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
    fodselsdatoFra?: string;
    fodselsdatoTil?: string;
    alderFra: string;
    alderTil: string;
    kjonn: string;
};

export interface PersonsokSkjemaProps {
    state: PersonSokFormState;
    actions: {
        settFornavn(fornavn: string): void;
        settEtternavn(etternavn: string): void;
        settGatenavn(gatenavn: string): void;
        settHusnummer(husnummer: string): void;
        settHusbokstav(husbokstav: string): void;
        settPostnummer(postnummer: string): void;
        settKontonummer(kontonummer: string): void;
        settKommunenummer(kommunenummer: string): void;
        settFodselsdatoFra(fodselsdatoFra: string | undefined): void;
        settFodselsdatoTil(fodselsdatoTil: string | undefined): void;
        settAlderFra(alderFra: string): void;
        settAlderTil(alderTil: string): void;
        settKjonn(kjonn: string): void;
    };
}

export function stringToNumber(input: string): number | undefined {
    if (input.length === 0) {
        return undefined;
    }
    return parseInt(input);
}

export function emptyString(input: string): string | undefined {
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
        fodselsdatoFra: form.fodselsdatoFra,
        fodselsdatoTil: form.fodselsdatoTil,
        alderFra: stringToNumber(form.alderFra),
        alderTil: stringToNumber(form.alderTil),
        kjonn: emptyString(form.kjonn)
    };
}
