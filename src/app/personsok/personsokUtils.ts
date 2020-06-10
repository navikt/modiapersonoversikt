import { ValideringsResultat } from '../../utils/forms/FormValidator';
import { PersonsokRequest } from '../../models/person/personsok';

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
    valideringsResultat: ValideringsResultat<PersonSokFormState>;
}

function stringToNumber(input: string): number | undefined {
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

export function lagRequest(form: PersonsokSkjemaProps): PersonsokRequest {
    return {
        fornavn: emptyString(form.state.fornavn),
        etternavn: emptyString(form.state.etternavn),
        gatenavn: emptyString(form.state.gatenavn),
        husnummer: stringToNumber(form.state.husnummer),
        husbokstav: emptyString(form.state.husbokstav),
        postnummer: emptyString(form.state.postnummer),
        kontonummer: emptyString(form.state.kontonummer),
        kommunenummer: emptyString(form.state.kommunenummer),
        fodselsdatoFra: form.state.fodselsdatoFra,
        fodselsdatoTil: form.state.fodselsdatoTil,
        alderFra: stringToNumber(form.state.alderFra),
        alderTil: stringToNumber(form.state.alderTil),
        kjonn: emptyString(form.state.kjonn)
    };
}
