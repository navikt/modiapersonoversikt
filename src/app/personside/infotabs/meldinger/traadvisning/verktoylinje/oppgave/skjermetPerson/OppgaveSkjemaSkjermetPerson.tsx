import React, { FormEvent, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../../components/common-styled-components';
import styled from 'styled-components';
import { OppgaveProps, OppgaveSkjemaForm } from '../oppgaveInterfaces';

import { ValideringsResultat } from '../../../../../../../../utils/forms/FormValidator';
import { getValidOppgaveSkjemaState } from '../oppgaveSkjemaValidator';
import { post } from '../../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../../api/config';
import { Resultat } from '../../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { lagSkjermetOppgaveRequest } from '../byggRequest';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../redux/reducers';
import { useAppState } from '../../../../../../../../utils/customHooks';
import { required } from './oppgaveSkjemaValidatorSkjermetPerson';
import useFormstate from '@nutgaard/use-formstate';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from '../SkjemaElementOptions';
import { Select, Textarea } from 'nav-frontend-skjema';

const SkjemaStyle = styled.div`
    padding-top: 1rem;
    label {
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

const AlertStyling = styled.div`
    > * {
        margin-top: 1rem;
    }
`;
const validator = useFormstate({
    tema: required('Du må velge tema'),
    oppgavetype: required('Du må velge oppgavetype'),
    prioritet: required('Du må velge prioritet'),
    beskrivelse: required('Du må skrive beskrivelse'),
    underkategori: required('Du må velge underkategori')
});

function OppgaveSkjemaSkjermetPerson(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const [submitting, setSubmitting] = useState(false);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);
    const [valideringsResultat, settValideringsresultat] = useState<ValideringsResultat<OppgaveSkjemaForm>>(
        getValidOppgaveSkjemaState()
    );

    const initalValues = {
        tema: '',
        underkategori: '',
        oppgavetype: '',
        prioritet: '',
        beskrivelse: ''
    };

    const state = validator(initalValues);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (submitting) {
            return;
        }

        if (!state.errors) {
            setSubmitting(true);
            settValideringsresultat(getValidOppgaveSkjemaState());

            const request = lagSkjermetOppgaveRequest(props, state.fields, valgtBrukersFnr, saksbehandlersEnhet || '');
            post(`${apiBaseUri}/dialogoppgave/opprettskjermetoppgave`, request, 'OpprettOppgaveSkjermetPerson')
                .then(() => {
                    settResultat(Resultat.VELLYKKET);
                    setSubmitting(false);
                    props.onSuccessCallback && props.onSuccessCallback();
                })
                .catch(() => {
                    settResultat(Resultat.FEIL);
                    setSubmitting(false);
                });
        } else {
            settValideringsresultat(valideringsResultat);
        }
    };

    if (resultat) {
        const alert =
            resultat === Resultat.VELLYKKET ? (
                <AlertStripeSuksess>Oppgave opprettet</AlertStripeSuksess>
            ) : (
                <AlertStripeFeil>Klarte ikke å opprette oppgave</AlertStripeFeil>
            );
        return <AlertStyling>{alert}</AlertStyling>;
    }

    return (
        <SkjemaStyle>
            <form onSubmit={submitHandler}>
                <Select autoFocus={true} label={'Tema'} {...state.fields.tema}>
                    <TemaOptions gsakTema={props.gsakTema} />
                </Select>
                <Select label={'Gjelder'} {...state.fields.underkategori}>
                    <UnderkategoriOptions valgtGsakTema={state.fields.tema.input} />
                </Select>
                <Select label={'Type oppgave'} {...state.fields.oppgavetype}>
                    <OppgavetypeOptions valgtGsakTema={state.fields.tema.input} />
                </Select>
                <Select label={'Velg prioritet'} {...state.fields.prioritet}>
                    <Prioriteter valgtGsakTeam={state.fields.tema.input} />
                </Select>
                <Textarea maxLength={0} label={'Beskrivelse'} {...state.fields.beskrivelse.input} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={submitting}>
                        Opprett Oppgave
                    </Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjemaSkjermetPerson;
