import React, { useCallback, useState } from 'react';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import { SkjermetOppgaveProps, OppgaveSkjemaBegrensetTilgangForm } from '../oppgaveInterfaces';
import { post } from '../../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../../api/config';
import { Resultat } from '../../utils/VisPostResultat';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { lagSkjermetOppgaveRequest } from '../byggRequest';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../../redux/reducers';
import { useValgtenhet } from '../../../../../../../../context/valgtenhet-state';
import { useForm } from 'react-hook-form';
import { resolverOppgaveSkjemaBegrensetTilgang } from '../oppgaveSkjemaUtils';
import { useNormalPrioritet } from '../useNormalPrioritet';
import OppgaveSkjemaTemaGjelderTypeOppgave from '../OppgaveSkjemaDeler/OppgaveSkjemaTemaGjelderTypeOppgave';
import OppgaveSkjemaPrioritetBeskrivelse from '../OppgaveSkjemaDeler/OppgaveSkjemaPrioritetBeskrivelse';
import { GsakTemaPrioritet } from '../../../../../../../../models/meldinger/oppgave';

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

function OppgaveSkjemaBegrensetTilgang(props: SkjermetOppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useValgtenhet().enhetId;
    const [resultat, settResultat] = useState<Resultat>();

    const { formState, register, watch, setValue, handleSubmit, reset } = useForm<OppgaveSkjemaBegrensetTilgangForm>({
        resolver: resolverOppgaveSkjemaBegrensetTilgang,
        mode: 'onChange'
    });

    const oppdaterPrioritet = useCallback(
        (valgtPrioritet: GsakTemaPrioritet['kode']) => {
            setValue('valgtPrioritet', valgtPrioritet);
        },
        [setValue]
    );

    const valgtTema = useNormalPrioritet(props.gsakTema, watch, oppdaterPrioritet);

    function submitHandler(values: OppgaveSkjemaBegrensetTilgangForm): Promise<any> {
        const request = lagSkjermetOppgaveRequest(values, valgtBrukersFnr, saksbehandlersEnhet || '');
        return post(`${apiBaseUri}/dialogoppgave/v2/opprettskjermetoppgave`, request, 'OpprettOppgaveSkjermetPerson')
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
            <form onSubmit={handleSubmit(submitHandler)} onReset={() => reset()}>
                <OppgaveSkjemaTemaGjelderTypeOppgave
                    formState={formState}
                    gsakTema={props.gsakTema}
                    register={register}
                    valgtTema={valgtTema}
                />
                <OppgaveSkjemaPrioritetBeskrivelse formState={formState} register={register} watch={watch} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={formState.isSubmitting} autoDisableVedSpinner>
                        Opprett Oppgave
                    </Hovedknapp>
                    <Flatknapp htmlType="reset">Nullstill</Flatknapp>
                </KnappStyle>
            </form>
        </SkjemaStyle>
    );
}

export default OppgaveSkjemaBegrensetTilgang;
