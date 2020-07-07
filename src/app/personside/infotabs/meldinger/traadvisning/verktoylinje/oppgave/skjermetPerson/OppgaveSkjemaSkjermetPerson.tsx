import React, { useState } from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { OppgaveProps, SkjermetOppgaveSkjemaForm } from '../oppgaveInterfaces';
import { post } from '../../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../../api/config';
import { Resultat } from '../../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { lagSkjermetOppgaveRequest } from '../byggRequest';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../redux/reducers';
import { useAppState } from '../../../../../../../../utils/customHooks';
import { feilmelding } from '../validering';
import useFormstate, { Values } from '@nutgaard/use-formstate';
import { OppgavetypeOptions, Prioriteter, TemaOptions, UnderkategoriOptions } from '../SkjemaElementOptions';
import { Select, Textarea } from 'nav-frontend-skjema';
import { useNormalPrioritet } from '../oppgaveUtils';

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
interface FormProps {
    validate: boolean;
}

const validator = useFormstate<SkjermetOppgaveSkjemaForm, FormProps>((values, props) => {
    const valgtTema = props.validate && values.valgtTema.length === 0 ? 'Du må velge tema' : undefined;
    const valgtUnderkategori = undefined;
    const valgtOppgavetype =
        props.validate && values.valgtOppgavetype.length === 0 ? 'Du må velge oppgavetype' : undefined;
    const valgtPrioritet = props.validate && values.valgtPrioritet.length === 0 ? 'Du må velge prioritet' : undefined;
    const beskrivelse = props.validate && values.beskrivelse.length === 0 ? 'Du må skrive beskrivelse' : undefined;

    return { valgtTema, valgtOppgavetype, valgtPrioritet, valgtUnderkategori, beskrivelse };
});

function OppgaveSkjemaSkjermetPerson(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);

    const initialValues: SkjermetOppgaveSkjemaForm = {
        valgtTema: '',
        valgtUnderkategori: '',
        valgtOppgavetype: '',
        valgtPrioritet: '',
        beskrivelse: ''
    };

    const state = validator(initialValues);

    const valgtTema = props.gsakTema.find(gsakTema => gsakTema.kode === state.fields.valgtTema?.input.value);
    useNormalPrioritet(state, valgtTema);

    function submitHandler<S>(values: Values<SkjermetOppgaveSkjemaForm>): Promise<any> {
        const request = lagSkjermetOppgaveRequest(props, values, valgtBrukersFnr, saksbehandlersEnhet || '');
        return post(`${apiBaseUri}/dialogoppgave/opprettskjermetoppgave`, request, 'OpprettOppgaveSkjermetPerson')
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                props.onSuccessCallback && props.onSuccessCallback();
            })
            .catch(() => {
                settResultat(Resultat.FEIL);
            });
    }

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
            <form
                onSubmit={state.onSubmit(submitHandler)}
                onReset={() => {
                    state.reinitialize(initialValues);
                }}
            >
                <Select
                    autoFocus={true}
                    label={'Tema'}
                    {...state.fields.valgtTema.input}
                    feil={feilmelding(state.fields.valgtTema)}
                >
                    <TemaOptions gsakTema={props.gsakTema} />
                </Select>
                <Select label={'Gjelder'} {...state.fields.valgtUnderkategori?.input}>
                    <UnderkategoriOptions valgtGsakTema={valgtTema} />
                </Select>
                <Select
                    label={'Type oppgave'}
                    {...state.fields.valgtOppgavetype.input}
                    feil={feilmelding(state.fields.valgtOppgavetype)}
                >
                    <OppgavetypeOptions valgtGsakTema={valgtTema} />
                </Select>
                <Select
                    label={'Velg prioritet'}
                    {...state.fields.valgtPrioritet.input}
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
                    <Hovedknapp htmlType="submit">Opprett Oppgave</Hovedknapp>
                    <Flatknapp htmlType="reset">Nullstill</Flatknapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjemaSkjermetPerson;
