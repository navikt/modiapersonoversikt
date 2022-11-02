import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useForm } from 'react-hook-form';
import { apiBaseUri } from '../../../../../../../api/config';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { FeilmeldingOppsummering } from '../../../../../../../components/FeilmeldingOppsummering';
import { useValgtenhet } from '../../../../../../../context/valgtenhet-state';
import { AppState } from '../../../../../../../redux/reducers';
import { erBehandlet } from '../../../utils/meldingerUtils';
import { Resultat } from '../utils/VisPostResultat';
import AvsluttGosysOppgaveSkjema from './AvsluttGosysOppgaveSkjema';
import { lagOppgaveRequest } from './byggRequest';
import { useNormalPrioritet } from './useNormalPrioritet';
import { OppgaveProps, OppgaveSkjemaForm } from './oppgaveInterfaces';
import OppgaveSkjemaErBehandlet from './OppgaveSkjemaDeler/OppgaveSkjemaErBehandlet';
import OppgaveSkjemaResultat from './OppgaveSkjemaDeler/OppgaveSkjemaResultat';
import { resolverOppgaveSkjema } from './oppgaveSkjemaUtils';
import { post } from '../../../../../../../api/api';
import { Element } from 'nav-frontend-typografi';
import OppgaveSkjemaTemaGjelderTypeOppgave from './OppgaveSkjemaDeler/OppgaveSkjemaTemaGjelderTypeOppgave';
import OppgaveSkjemaPrioritetBeskrivelse from './OppgaveSkjemaDeler/OppgaveSkjemaPrioritetBeskrivelse';
import OppgaveSkjemaEnhetAnsatt from './OppgaveSkjemaDeler/OppgaveSkjemaEnhetAnsatt';
import { GsakTemaPrioritet } from '../../../../../../../models/meldinger/oppgave';

export const AlertStyling = styled.div`
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

function OppgaveSkjema(props: OppgaveProps) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const saksbehandlersEnhet = useValgtenhet().enhetId;
    const [resultat, settResultat] = useState<Resultat>();
    const { formState, register, watch, setValue, handleSubmit } = useForm<OppgaveSkjemaForm>({
        resolver: resolverOppgaveSkjema,
        mode: 'onChange'
    });

    const oppdaterPrioritet = useCallback(
        (valgtPrioritet: GsakTemaPrioritet['kode']) => {
            setValue('valgtPrioritet', valgtPrioritet);
        },
        [setValue]
    );

    const valgtTema = useNormalPrioritet(props.gsakTema, watch, oppdaterPrioritet);

    function submitHandler(values: OppgaveSkjemaForm): Promise<any> {
        const request = lagOppgaveRequest(
            values,
            valgtBrukersFnr,
            saksbehandlersEnhet || '',
            props.gsakTema,
            props.valgtTraad
        );
        return post(`${apiBaseUri}/dialogoppgave/v2/opprett`, request, 'OpprettOppgave')
            .then(() => {
                settResultat(Resultat.VELLYKKET);
                props.onSuccessCallback && props.onSuccessCallback();
            })
            .catch((error: Error) => {
                settResultat(Resultat.FEIL);
            });
    }

    if (props.valgtTraad && !erBehandlet(props.valgtTraad)) {
        <OppgaveSkjemaErBehandlet lukkPanel={props.lukkPanel} />;
    }

    if (resultat) {
        <OppgaveSkjemaResultat resultat={resultat} lukkPanel={props.lukkPanel} />;
    }

    const knappetekst = props.onSuccessCallback ? 'Merk som kontorsperret' : 'Opprett oppgave';
    return (
        <SkjemaStyle>
            <AvsluttGosysOppgaveSkjema valgtTraad={props.valgtTraad} />
            <form onSubmit={state.onSubmit(submitHandler)}>
                <FormErrorSummary tittel={'For å kunne søke må du rett opp i følgende:'} />
                <Element>Opprett oppgave</Element>
                <OppgaveSkjemaTemaGjelderTypeOppgave
                    formState={formState}
                    gsakTema={props.gsakTema}
                    register={register}
                    valgtTema={valgtTema}
                />
                <OppgaveSkjemaEnhetAnsatt
                    formState={formState}
                    saksbehandlersEnhet={saksbehandlersEnhet}
                    setValue={setValue}
                    watch={watch}
                />
                <OppgaveSkjemaPrioritetBeskrivelse
                    formState={formState}
                    register={register}
                    valgtTema={valgtTema}
                    watch={watch}
                />
                <KnappStyle>
                    <Hovedknapp htmlType="submit" spinner={formState.isSubmitting} autoDisableVedSpinner>
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
