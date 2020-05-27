import React, { useState } from 'react';
import { Enhet } from '../../../../../../../models/meldinger/oppgave';
import { lagOppgaveRequest } from './byggRequest';
import { OppgaveProps, OppgaveSkjemaForm } from './oppgaveInterfaces';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { cache, createCacheKey, FetchResult } from '@nutgaard/use-fetch';
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
import useFormstate from '@nutgaard/use-formstate';
import { required } from './validering';
import { Select, Textarea } from 'nav-frontend-skjema';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from './SkjemaElementOptions';
import AutoComplete from './AutoComplete';
import { hasData } from '@nutgaard/use-async';
import useAnsattePaaEnhet from './useAnsattePaaEnhet';
import { useFetchWithLog } from '../../../../../../../utils/hooks/useFetchWithLog';
import useForeslatteEnheter from './useForeslåtteEnheter';

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

function populerCacheMedTomAnsattliste() {
    cache.put(createCacheKey(`${apiBaseUri}/enheter/_/ansatte`), Promise.resolve(new Response('[]')));
}

const validator = useFormstate<OppgaveSkjemaForm>({
    valgtTema: required('Du må velge tema'),
    valgtOppgavetype: required('Du må velge oppgavetype'),
    beskrivelse: required('Du må skrive beskrivelse'),
    valgtPrioritet: required('Du må velge prioritet'),
    valgtUnderkategori: required('Du må velge underkategori'),
    valgtEnhet: required('Du må velge enhet'),
    valgtAnsatt: required('Du må velge ansatt')
});

function OppgaveSkjema(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const initialValues = {
        valgtTema: '',
        valgtOppgavetype: '',
        beskrivelse: '',
        valgtPrioritet: '',
        valgtUnderkategori: '',
        valgtEnhet: '',
        valgtAnsatt: ''
    };
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const state = validator(initialValues);
    const valgtTema = props.gsakTema.find(gsakTema => gsakTema.kode === state.fields.valgtTema?.input.value);

    const ansattliste = useAnsattePaaEnhet(state.fields.valgtEnhet?.input.value);
    const enhetliste: FetchResult<Array<Enhet>> = useFetchWithLog<Array<Enhet>>(
        `${apiBaseUri}/enheter/oppgavebehandlere/alle`,
        'LagOppgave-Enheter',
        includeCredentials
    );
    const foreslatteEnheter = useForeslatteEnheter(
        state.fields.valgtTema?.input.value,
        state.fields.valgtOppgavetype?.input.value,
        state.fields.valgtUnderkategori?.input.value
    );
    populerCacheMedTomAnsattliste();

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
                <Select autoFocus={true} label={'Tema'} {...state.fields.valgtTema?.input}>
                    <TemaOptions gsakTema={props.gsakTema} />
                </Select>
                <Select label={'Gjelder'} {...state.fields.valgtUnderkategori?.input}>
                    <UnderkategoriOptions valgtGsakTema={valgtTema} />
                </Select>
                <Select label={'Type oppgave'} {...state.fields.valgtOppgavetype?.input}>
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
                    {...state.fields.valgtEnhet.input}
                />
                <AutoComplete
                    label={'Velg ansatt'}
                    suggestions={ansattliste.ansatte.map(
                        ansatt => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`
                    )}
                    {...state.fields.valgtAnsatt?.input}
                />
                <Select label={'Velg prioritet'} {...state.fields.valgtPrioritet?.input}>
                    <Prioriteter valgtGsakTeam={valgtTema} />
                </Select>
                <Textarea maxLength={0} label={'Beskrivelse'} {...state.fields.beskrivelse.input} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit">{knappetekst}</Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjema;
