import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../../components/common-styled-components';
import styled from 'styled-components';
import { OppgaveProps, SkjermetOppgaveSkjemaRequest } from '../oppgaveInterfaces';
import { post } from '../../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../../api/config';
import { Resultat } from '../../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { lagSkjermetOppgaveRequest } from '../byggRequest';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../redux/reducers';
import { useAppState } from '../../../../../../../../utils/customHooks';
import { required } from '../validering';
import useFormstate, { Values } from '@nutgaard/use-formstate';
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
const validator = useFormstate<SkjermetOppgaveSkjemaRequest>({
    tema: required('Du må velge tema'),
    oppgavetype: required('Du må velge oppgavetype'),
    prioritet: required('Du må velge prioritet'),
    beskrivelse: required('Du må skrive beskrivelse'),
    underkategori: required('Du må velge underkategori')
});

function OppgaveSkjemaSkjermetPerson(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useAppState(state => state.session.valgtEnhetId);
    const [resultat, settResultat] = useState<Resultat | undefined>(undefined);

    const initialValues = {
        tema: '',
        underkategori: '',
        oppgavetype: '',
        prioritet: '',
        beskrivelse: ''
    };

    const state = validator(initialValues);

    function submitHandler<S>(values: Values<SkjermetOppgaveSkjemaRequest>): Promise<any> {
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

    const valgtTema = props.gsakTema.find(gsakTema => gsakTema.kode === state.fields.tema?.input.value);
    return (
        <SkjemaStyle>
            <form onSubmit={state.onSubmit(submitHandler)}>
                <Select autoFocus={true} label={'Tema'} {...state.fields.tema?.input}>
                    <TemaOptions gsakTema={props.gsakTema} />
                </Select>
                <Select label={'Gjelder'} {...state.fields.underkategori?.input}>
                    <UnderkategoriOptions valgtGsakTema={valgtTema} />
                </Select>
                <Select label={'Type oppgave'} {...state.fields.oppgavetype?.input}>
                    <OppgavetypeOptions valgtGsakTema={valgtTema} />
                </Select>
                <Select label={'Velg prioritet'} {...state.fields.prioritet?.input}>
                    <Prioriteter valgtGsakTeam={valgtTema} />
                </Select>
                <Textarea maxLength={0} label={'Beskrivelse'} {...state.fields.beskrivelse.input} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Opprett Oppgave</Hovedknapp>
                    <LenkeKnapp type="button" onClick={props.lukkPanel}>
                        Avbryt
                    </LenkeKnapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjemaSkjermetPerson;
