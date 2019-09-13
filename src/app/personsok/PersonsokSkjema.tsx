import * as React from 'react';
import { FormEvent, useState } from 'react';
import { PersonsokRequest } from '../../models/person/personsok';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { formatterDatoForBackendPost } from '../../utils/dateUtils';
import PersonsokSkjemaElementer from './PersonsokSkjemaElementer';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import { validerKontonummer } from '../brukerprofil/kontonummer/kontonummerUtils';

const ValideringsfeilStyle = styled.div`
    margin: ${theme.margin.layout};
    color: #d0021b;
`;

export interface PersonsokSkjemaProps {
    stateCriteria: {
        fornavn: string;
        etternavn: string;
        gatenavn: string;
        husnummer: string;
        husbokstav: string;
        postnummer: string;
        kontonummer: string;
    };
    stateLimit: {
        kommunenummer: string;
        fodselsdatoFra?: Date;
        fodselsdatoTil?: Date;
        alderFra: string;
        alderTil: string;
        kjonn: string;
    };
    actionsCriteria: {
        settFornavn(fornavn: string): void;
        settEtternavn(etternavn: string): void;
        settGatenavn(gatenavn: string): void;
        settHusnummer(husnummer: string): void;
        settHusbokstav(husbokstav: string): void;
        settPostnummer(postnummer: string): void;
        settKontonummer(kontonummer: string): void;
    };
    actionsLimit: {
        settKommunenummer(kommunenummer: string): void;
        settFodselsdatoFra(fodselsdatoFra: Date | undefined): void;
        settFodselsdatoTil(fodselsdatoTil: Date | undefined): void;
        settAlderFra(alderFra: string): void;
        settAlderTil(alderTil: string): void;
        settKjonn(kjonn: string): void;
    };
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

function erTomStreng(input?: string): boolean {
    if (!input) {
        return true;
    }

    if (input.trim().length === 0) {
        return true;
    }

    return false;
}

function alleFelterErTomme(props: PersonsokSkjemaProps): boolean {
    return (
        erTomStreng(props.stateCriteria.fornavn) &&
        erTomStreng(props.stateCriteria.etternavn) &&
        erTomStreng(props.stateCriteria.gatenavn) &&
        erTomStreng(props.stateCriteria.husnummer) &&
        erTomStreng(props.stateCriteria.husbokstav) &&
        erTomStreng(props.stateCriteria.postnummer) &&
        erTomStreng(props.stateCriteria.kontonummer)
    );
}

function lagRequest(form: PersonsokSkjemaProps): PersonsokRequest {
    return {
        fornavn: emptyString(form.stateCriteria.fornavn),
        etternavn: emptyString(form.stateCriteria.etternavn),
        gatenavn: emptyString(form.stateCriteria.gatenavn),
        husnummer: stringToNumber(form.stateCriteria.husnummer),
        husbokstav: emptyString(form.stateCriteria.husbokstav),
        postnummer: emptyString(form.stateCriteria.postnummer),
        kontonummer: emptyString(form.stateCriteria.kontonummer),
        kommunenummer: emptyString(form.stateLimit.kommunenummer),
        fodsesldatoFra: formatterDatoForBackendPost(form.stateLimit.fodselsdatoFra),
        fodsesldatoTil: formatterDatoForBackendPost(form.stateLimit.fodselsdatoTil),
        alderFra: stringToNumber(form.stateLimit.alderFra),
        alderTil: stringToNumber(form.stateLimit.alderTil),
        kjonn: emptyString(form.stateLimit.kjonn)
    };
}

function validerSkjema(props: PersonsokSkjemaProps): string | undefined {
    if (alleFelterErTomme(props)) {
        return 'Manglende søkekriterier. Angi navn og/eller gatenavn og trykk på "søk" igjen for å utføre et søk';
    }

    if (props.stateCriteria.kontonummer && !validerKontonummer(props.stateCriteria.kontonummer)) {
        return 'Kontonummer må ha 11 siffer';
    }

    if (!erTomStreng(props.stateCriteria.husnummer) && !props.stateCriteria.gatenavn) {
        return 'Gatenavn må fylles ut når husnummer er satt';
    }

    if (!erTomStreng(props.stateCriteria.husbokstav) && !props.stateCriteria.gatenavn) {
        return 'Gatenavn må fylles ut når husbokstav er satt';
    }

    if (!erTomStreng(props.stateCriteria.postnummer) && !props.stateCriteria.gatenavn) {
        return 'Gatenavn må fylles ut når postnummer er satt';
    }

    if (
        props.stateLimit.fodselsdatoFra &&
        props.stateLimit.fodselsdatoTil &&
        props.stateLimit.fodselsdatoFra > props.stateLimit.fodselsdatoTil
    ) {
        return 'Fødselsdato fra må være mindre enn fødselsdato til';
    }

    return undefined;
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
    const [fodselsdatoFra, settFodselsdatoFra] = useState<Date | undefined>(undefined);
    const [fodselsdatoTil, settFodselsdatoTil] = useState<Date | undefined>(undefined);
    const [alderFra, settAlderFra] = useState<string>('');
    const [alderTil, settAlderTil] = useState<string>('');
    const [kjonn, settKjonn] = useState<string>('');
    const [valideringsfeil, settValideringsfeil] = useState<string | undefined>(undefined);

    const formState: PersonsokSkjemaProps = {
        stateCriteria: {
            fornavn,
            etternavn,
            gatenavn,
            husnummer,
            husbokstav,
            postnummer,
            kontonummer
        },
        stateLimit: {
            kommunenummer,
            fodselsdatoFra,
            fodselsdatoTil,
            alderFra,
            alderTil,
            kjonn
        },
        actionsCriteria: {
            settFornavn,
            settEtternavn,
            settGatenavn,
            settHusnummer,
            settHusbokstav,
            settPostnummer,
            settKontonummer
        },
        actionsLimit: {
            settKommunenummer,
            settFodselsdatoFra,
            settFodselsdatoTil,
            settAlderFra,
            settAlderTil,
            settKjonn
        }
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const harSkjemafeil = validerSkjema(formState);
        settValideringsfeil(harSkjemafeil);
        if (!harSkjemafeil) {
            const request: PersonsokRequest = lagRequest(formState);
            dispatch(personsokResource.actions.post(request));
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
        <>
            <form onSubmit={submitHandler} onReset={resetHandler}>
                <PersonsokSkjemaElementer form={formState} />
            </form>
            <ValideringsfeilStyle aria-live={'polite'}>{valideringsfeil}</ValideringsfeilStyle>
        </>
    );
}

export default PersonsokSkjema;
