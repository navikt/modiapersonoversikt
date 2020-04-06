import * as React from 'react';
import { FormEvent, useState } from 'react';
import { PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import PersonsokSkjemaElementer from './PersonsokSkjemaElementer';
import { ValideringsResultat } from '../../utils/forms/FormValidator';
import {
    getValidPersonSokState,
    personsokSkjemaHarNokInformasjonTilÅGjøreSøk,
    validerPersonsokSkjema
} from './personsokValidator';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { loggPersonsok } from './loggPersonsok';
import { apiBaseUri, postConfig } from '../../api/config';
import { FetchResponse, fetchToJson } from '../../utils/fetchToJson';
import { PersonSokFormState, PersonsokSkjemaProps, lagRequest } from './personsokUtils';

interface Props {
    setResponse: (response: FetchResponse<PersonsokResponse>) => void;
}

function PersonsokSkjema(props: Props) {
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
            const uri = `${apiBaseUri}/personsok`;
            fetchToJson<PersonsokResponse>(uri, postConfig(request)).then(response => {
                props.setResponse(response);
            });
            loggPersonsok(request);
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
