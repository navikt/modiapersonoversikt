import React, { FormEvent, useState } from 'react';
import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori
} from '../../../../../../../models/meldinger/oppgave';
import { OppgaveSkjemaElementer } from './OppgaveSkjemaElementer';
import { lagOppgaveRequest } from './byggRequest';
import { OppgaveProps, OppgaveSkjemaForm, OppgaveSkjemaProps } from './oppgaveInterfaces';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../redux/reducers';
import { cache, createCacheKey } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../../../../api/config';
import { post } from '../../../../../../../api/api';
import { Resultat } from '../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { erBehandlet } from '../../../utils/meldingerUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getValidOppgaveSkjemaState, validerOppgaveSkjema } from './oppgaveSkjemaValidator';
import { ValideringsResultat } from '../../../../../../../utils/forms/FormValidator';
import { useAppState } from '../../../../../../../utils/customHooks';
import AvsluttGosysOppgaveSkjema from './AvsluttGosysOppgaveSkjema';
import { Element } from 'nav-frontend-typografi';
import useFormstate, { Values } from '@nutgaard/use-formstate';
import { required } from './skjermetPerson/oppgaveSkjemaValidatorSkjermetPerson';
import { Select, Textarea } from 'nav-frontend-skjema';
import { hentValgtOppgavetype, hentValgtTema, hentValgtUnderkategori } from './oppgaveUtils';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from './SkjemaElementOptions';
import AutoComplete from './AutoComplete';
import { hasData, isPending } from '@nutgaard/use-async';
import useAnsattePaaEnhet from './useAnsattePaaEnhet';

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
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);

    populerCacheMedTomAnsattliste();

    const initialValues = {
        valgtTema: '',
        valgtOppgavetype: '',
        beskrivelse: '',
        valgtPrioritet: '',
        valgtUnderkategori: '',
        valgtEnhet: '',
        valgtAnsatt: ''
    };

    const state = validator(initialValues);

    function submitHandler<S>(values: Values<OppgaveSkjemaForm>): Promise<any> {
        const request = lagOppgaveRequest(props, values, valgtBrukersFnr, saksbehandlersEnhet || '', props.valgtTraad);
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
    const ansattliste = useAnsattePaaEnhet(state.fields.valgtEnhet?.input.value);
    const valgtTema = props.gsakTema.find(gsakTema => gsakTema.kode === state.fields.tema?.input.value);

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
                <AutoComplete<Enhet>
                    itemToString={enhet => `${enhet.enhetId} ${enhet.enhetNavn}`}
                    label={'Velg enhet'}
                    suggestions={hasData(enhetliste) ? enhetliste.data : []}
                    topSuggestions={foreslatteEnheter.foreslatteEnheter}
                    topSuggestionsLabel="Foreslåtte enheter"
                    otherSuggestionsLabel="Andre enheter"
                    spinner={isPending(enhetliste) || foreslatteEnheter.pending}
                />
                <AutoComplete<Ansatt>
                    itemToString={ansatt => `${ansatt.fornavn} ${ansatt.etternavn} (${ansatt.ident})`}
                    label={'Velg ansatt'}
                    suggestions={ansattliste.ansatte}
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
