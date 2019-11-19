import * as React from 'react';
import { FormEvent, useState } from 'react';
import { PersonsokRequest } from '../../models/person/personsok';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import PersonsokSkjemaElementer from './PersonsokSkjemaElementer';
import { ValideringsResultat } from '../../utils/forms/FormValidator';
import {
    getValidPersonSokState,
    personsokSkjemaHarNokInformasjonTilÅGjøreSøk,
    validerPersonsokSkjema
} from './personsokValidator';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

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

function lagRequest(form: PersonsokSkjemaProps): PersonsokRequest {
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

function PersonsokSkjema() {
    const dispatch = useDispatch();
    const personsokResource = useSelector((state: AppState) => state.restResources.personsok);
    const [fornavn, settFornavn] = useState<string>('');
    const [etternavn, settEtternavn] = useState<string>('');
    const [gatenavn, settGatenavn] = useState<string>('');
    const [husnummer, settHusnummer] = useState<string>('');
    const [husbokstav, settHusbokstav] = useState<string>('');
    const [postnummer, settPostnummer] = useState<string>('');
    const [kontonummer, settKontonummer] = useState<string>('');
    const [kommunenummer, settKommunenummer] = useState<string>('');
    const [fodselsdatoFra, settFodselsdatoFra] = useState<string | undefined>(undefined);
    const [fodselsdatoTil, settFodselsdatoTil] = useState<string | undefined>(undefined);
    const [alderFra, settAlderFra] = useState<string>('');
    const [alderTil, settAlderTil] = useState<string>('');
    const [kjonn, settKjonn] = useState<string>('');
    const [valideringsResultat, settValideringsresultat] = useState<ValideringsResultat<PersonSokFormState>>(
        getValidPersonSokState()
    );
    const [minimumsKriterierOppfylt, setMinimumsKriterierOppfylt] = useState<boolean>(true);

    const formState: PersonsokSkjemaProps = {
        state: {
            fornavn,
            etternavn,
            gatenavn,
            husnummer,
            husbokstav,
            postnummer,
            kontonummer,
            kommunenummer,
            fodselsdatoFra,
            fodselsdatoTil,
            alderFra,
            alderTil,
            kjonn
        },
        actions: {
            settFornavn,
            settEtternavn,
            settGatenavn,
            settHusnummer,
            settHusbokstav,
            settPostnummer,
            settKontonummer,
            settKommunenummer,
            settFodselsdatoFra,
            settFodselsdatoTil,
            settAlderFra,
            settAlderTil,
            settKjonn
        },
        valideringsResultat: valideringsResultat
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!personsokSkjemaHarNokInformasjonTilÅGjøreSøk(formState.state)) {
            setMinimumsKriterierOppfylt(false);
            return;
        }
        setMinimumsKriterierOppfylt(true);
        const valideringsResultat = validerPersonsokSkjema(formState.state);
        if (valideringsResultat.formErGyldig) {
            settValideringsresultat(getValidPersonSokState());
            const request: PersonsokRequest = lagRequest(formState);
            dispatch(personsokResource.actions.post(request));
        } else {
            settValideringsresultat(valideringsResultat);
        }
    };

    const resetHandler = (event: FormEvent) => {
        settFornavn('');
        settEtternavn('');
        settGatenavn('');
        settHusnummer('');
        settHusbokstav('');
        settPostnummer('');
        settKontonummer('');
        settKommunenummer('');
        settFodselsdatoFra(undefined);
        settFodselsdatoTil(undefined);
        settAlderFra('');
        settAlderTil('');
        settKjonn('');
    };

    return (
        <form onSubmit={submitHandler} onReset={resetHandler}>
            <PersonsokSkjemaElementer form={formState} />
            {!minimumsKriterierOppfylt && (
                <AlertStripeInfo>
                    <span role="alert">Du må minimum fylle inn navn, adresse eller kontonummer for å gjøre søk</span>
                </AlertStripeInfo>
            )}
        </form>
    );
}

export default PersonsokSkjema;
