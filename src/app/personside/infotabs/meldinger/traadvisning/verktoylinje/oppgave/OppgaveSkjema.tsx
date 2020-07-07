import React, { useState } from 'react';
import { Enhet } from '../../../../../../../models/meldinger/oppgave';
import { lagOppgaveRequest, matchEnhet } from './byggRequest';
import { OppgaveProps, OppgaveSkjemaForm } from './oppgaveInterfaces';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import useFetch, { cache, createCacheKey, FetchResult } from '@nutgaard/use-fetch';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { Resultat } from '../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { erBehandlet } from '../../../utils/meldingerUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useAppState } from '../../../../../../../utils/customHooks';
import AvsluttGosysOppgaveSkjema from './AvsluttGosysOppgaveSkjema';
import { Element } from 'nav-frontend-typografi';
import useFormstate, { Formstate } from '@nutgaard/use-formstate';
import { feilmelding } from './validering';
import { Select, Textarea } from 'nav-frontend-skjema';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from './SkjemaElementOptions';
import AutoComplete from './AutoComplete';
import { hasData } from '@nutgaard/use-async';
import useAnsattePaaEnhet from './useAnsattePaaEnhet';
import useForeslatteEnheter from './useForeslåtteEnheter';
import { useNormalPrioritet } from './oppgaveUtils';

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;

const SkjemaStyle = styled.div`
    padding-top: 1rem;
    .inputPanelGruppe__inner {
        display: flex;
        > * {
            flex-grow: 1;
        }
    }
    label {
        font-weight: 600;
        margin-bottom: 0.1rem;
    }
    .skjemaelement {
        margin-bottom: 0.7rem;
    }
`;

const KnappStyle = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        margin: 0;
    }
`;

interface FormProps {
    validate: boolean;
}

function populerCacheMedTomAnsattliste() {
    cache.put(createCacheKey(`${apiBaseUri}/enheter/_/ansatte`), Promise.resolve(new Response('[]')));
}

const validator = useFormstate<OppgaveSkjemaForm, FormProps>((values, props) => {
    const valgtTema = props.validate && values.valgtTema.length === 0 ? 'Du må velge tema' : undefined;
    const valgtOppgavetype =
        props.validate && values.valgtOppgavetype.length === 0 ? 'Du må velge oppgavetype' : undefined;
    const beskrivelse = props.validate && values.beskrivelse.length === 0 ? 'Du må skrive beskrivelse' : undefined;
    const valgtPrioritet = props.validate && values.valgtPrioritet.length === 0 ? 'Du må velge prioritet' : undefined;
    const valgtUnderkategori = undefined;
    const valgtEnhet = props.validate && values.valgtEnhet.length === 0 ? 'Du må velge enhet' : undefined;
    const valgtAnsatt = undefined;
    return { valgtTema, valgtOppgavetype, beskrivelse, valgtPrioritet, valgtUnderkategori, valgtEnhet, valgtAnsatt };
});

function OppgaveSkjema(props: OppgaveProps) {
    populerCacheMedTomAnsattliste();

    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const initialValues: OppgaveSkjemaForm = {
        valgtTema: '',
        valgtOppgavetype: '',
        beskrivelse: '',
        valgtPrioritet: '',
        valgtUnderkategori: '',
        valgtEnhet: '',
        valgtAnsatt: ''
    };
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const state: Formstate<OppgaveSkjemaForm> = validator(initialValues);

    const valgtTema = props.gsakTema.find(gsakTema => gsakTema.kode === state.fields.valgtTema?.input.value);
    useNormalPrioritet(state, valgtTema);

    const enhetliste: FetchResult<Array<Enhet>> = useFetch<Array<Enhet>>(
        `${apiBaseUri}/enheter/oppgavebehandlere/alle`,
        includeCredentials
    );
    const foreslatteEnheter = useForeslatteEnheter(
        state.fields.valgtTema?.input.value,
        state.fields.valgtOppgavetype?.input.value,
        state.fields.valgtUnderkategori?.input.value
    );
    const valgtEnhet = matchEnhet(state.fields.valgtEnhet?.input.value, 1);
    const ansattliste = useAnsattePaaEnhet(valgtEnhet);

    function submitHandler<S>(values: OppgaveSkjemaForm): Promise<any> {
        const request = lagOppgaveRequest(
            props,
            values,
            valgtBrukersFnr,
            saksbehandlersEnhet || '',
            props.gsakTema,
            props.valgtTraad
        );
        return post(`${apiBaseUri}/dialogoppgave/opprett`, request, 'OpprettOppgave')
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                props.onSuccessCallback && props.onSuccessCallback();
            })
            .catch((error: Error) => {
                settResultat(Resultat.FEIL);
            });
    }

    if (props.valgtTraad && !erBehandlet(props.valgtTraad)) {
        return (
            <AlertStyling>
                <AlertStripeInfo>Kan ikke opprette oppgave på denne tråden</AlertStripeInfo>
                <Hovedknapp autoFocus={true} onClick={props.lukkPanel}>
                    Lukk
                </Hovedknapp>
            </AlertStyling>
        );
    }

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess>Oppgave opprettet</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil>Klarte ikke å opprette oppgave</AlertStripeFeil>
            );
        return (
            <AlertStyling>
                {alert}
                <Hovedknapp autoFocus={true} onClick={props.lukkPanel}>
                    Lukk
                </Hovedknapp>
            </AlertStyling>
        );
    }

    const knappetekst = props.onSuccessCallback ? 'Merk som kontorsperret' : 'Opprett oppgave';
    return (
        <SkjemaStyle>
            <AvsluttGosysOppgaveSkjema />
            <form onSubmit={state.onSubmit(submitHandler)}>
                <Element>Opprett oppgave</Element>
                <Select
                    autoFocus={true}
                    label={'Tema'}
                    {...state.fields.valgtTema.input}
                    feil={feilmelding(state.fields.valgtTema)}
                >
                    <TemaOptions gsakTema={props.gsakTema} />
                </Select>
                <Select label={'Gjelder'} {...state.fields.valgtUnderkategori.input}>
                    <UnderkategoriOptions valgtGsakTema={valgtTema} />
                </Select>
                <Select
                    label={'Type oppgave'}
                    {...state.fields.valgtOppgavetype.input}
                    feil={feilmelding(state.fields.valgtOppgavetype)}
                >
                    <OppgavetypeOptions valgtGsakTema={valgtTema} />
                </Select>
                <AutoComplete
                    label={'Velg enhet'}
                    suggestions={
                        hasData(enhetliste) ? enhetliste.data.map(enhet => `${enhet.enhetId} ${enhet.enhetNavn}`) : []
                    }
                    topSuggestions={foreslatteEnheter.foreslatteEnheter.map(
                        enhet => `${enhet.enhetId} ${enhet.enhetNavn}`
                    )}
                    topSuggestionsLabel="Foreslåtte enheter"
                    otherSuggestionsLabel="Andre enheter"
                    input={state.fields.valgtEnhet.input}
                    feil={feilmelding(state.fields.valgtEnhet)}
                />
                <AutoComplete
                    label={'Velg ansatt'}
                    suggestions={ansattliste.ansatte.map(
                        ansatt => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`
                    )}
                    input={state.fields.valgtAnsatt.input}
                />
                <Select
                    label={'Velg prioritet'}
                    {...state.fields.valgtPrioritet?.input}
                    feil={feilmelding(state.fields.valgtPrioritet)}
                >
                    <Prioriteter valgtGsakTeam={valgtTema} />
                </Select>
                <Textarea
                    maxLength={0}
                    label={'Beskrivelse'}
                    {...state.fields.beskrivelse.input}
                    feil={feilmelding(state.fields.beskrivelse)}
                />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={state.submitting}>
                        {knappetekst}
                    </Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjema;
